import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';

const STORAGE_BUCKET = 'photos';

// Helper to convert photo database row to frontend product format
const mapRowToProduct = (row) => ({
  id: row.id,
  archiveCode: row.archive_code || row.archiveCode || 'PHOTO',
  title: row.title,
  place: row.place || row.location?.split(',')[0] || '',
  country: row.country || row.location?.split(',')[1]?.trim() || '',
  location: row.location || `${row.place || ''}, ${row.country || ''}`,
  year: row.year || '2025',
  film: row.film || 'Kodak Gold 200',
  camera: row.camera || 'Olympus mju I',
  orientation: row.orientation || 'horizontal',
  story: row.story || '',
  image: row.image,
  price: Number(row.price || 24000),
  priceUSD: Number(row.price_usd || row.priceUSD || 25),
  displayOrder: row.display_order ?? 0,
  isPublished: row.is_published ?? true,
  createdAt: row.created_at
});

// Fetch published photos for public store visitors
export async function getPublicPhotos() {
  if (!isSupabaseConfigured || !supabase) {
    return FALLBACK_PRODUCTS.map(p => ({ ...p, isPublished: true }));
  }

  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase getPublicPhotos falling back to local data:', error);
      return FALLBACK_PRODUCTS.map(p => ({ ...p, isPublished: true }));
    }

    return data.map(mapRowToProduct);
  } catch (err) {
    console.error('Error fetching public photos:', err);
    return FALLBACK_PRODUCTS.map(p => ({ ...p, isPublished: true }));
  }
}

// Fetch all photos (published + drafts) for Admin panel
export async function getAdminPhotos() {
  if (!isSupabaseConfigured || !supabase) {
    // Return local fallback with editable status
    return FALLBACK_PRODUCTS.map(p => ({ ...p, isPublished: true }));
  }

  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(mapRowToProduct);
  } catch (err) {
    console.error('Error fetching admin photos:', err);
    return FALLBACK_PRODUCTS.map(p => ({ ...p, isPublished: true }));
  }
}

// Upload photo file to Supabase Storage
export async function uploadPhotoFile(file) {
  if (!file) return null;

  // If Supabase is configured, attempt storage upload
  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (error) {
        console.warn('Storage upload error, converting file to Data URL:', error.message);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(filePath);
        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch (e) {
      console.warn('Storage upload exception, converting to Data URL fallback:', e);
    }
  }

  // Fallback to base64 Data URL for local/offline testing
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Save or Update a photo
export async function savePhoto(photoData) {
  const isNew = !photoData.id;
  const id = photoData.id || `photo-${Date.now()}`;

  const row = {
    id,
    archive_code: photoData.archiveCode || `PHOTO ${(photoData.displayOrder || 1).toString().padStart(3, '0')}`,
    title: photoData.title,
    place: photoData.place,
    country: photoData.country,
    location: `${photoData.place || ''}, ${photoData.country || ''}`,
    year: photoData.year || '2025',
    film: photoData.film || 'Kodak Gold 200',
    camera: photoData.camera || 'Olympus mju I',
    orientation: photoData.orientation || 'horizontal',
    story: photoData.story || '',
    image: photoData.image,
    price: Number(photoData.price || 24000),
    price_usd: Number(photoData.priceUSD || 25),
    display_order: Number(photoData.displayOrder || 0),
    is_published: photoData.isPublished !== undefined ? photoData.isPublished : true
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('photos')
      .upsert([row])
      .select();

    if (error) {
      console.error('Supabase savePhoto error:', error);
      throw error;
    }
    return mapRowToProduct(data[0] || row);
  }

  return mapRowToProduct(row);
}

// Toggle published status
export async function togglePhotoVisibility(id, isPublished) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('photos')
      .update({ is_published: isPublished })
      .eq('id', id);

    if (error) throw error;
  }
  return true;
}

// Delete a photo
export async function deletePhoto(id) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('photos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
  return true;
}

// Update ordering of multiple photos
export async function updatePhotosOrder(orderedPhotos) {
  if (isSupabaseConfigured && supabase) {
    const updates = orderedPhotos.map((photo, index) => ({
      id: photo.id,
      display_order: index
    }));

    for (const item of updates) {
      await supabase
        .from('photos')
        .update({ display_order: item.display_order })
        .eq('id', item.id);
    }
  }
  return true;
}

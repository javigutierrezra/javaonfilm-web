import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import {
  getAdminPhotos,
  savePhoto,
  togglePhotoVisibility,
  deletePhoto,
  updatePhotosOrder,
  uploadPhotoFile
} from '../../services/productService';
import {
  Lock,
  Plus,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  MoveUp,
  MoveDown,
  Upload,
  Film,
  CheckCircle2,
  LogOut,
  X,
  Sparkles,
  AlertCircle,
  Maximize2,
  Store
} from 'lucide-react';

export default function AdminPanel() {
  // Authentication State
  const [session, setSession] = useState(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Photos & Admin State
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  
  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [savingPhoto, setSavingPhoto] = useState(false);

  // Preview Modal State
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // Form Fields State
  const [formImage, setFormImage] = useState(null);
  const [formImagePreview, setFormImagePreview] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formArchiveCode, setFormArchiveCode] = useState('');
  const [formPlace, setFormPlace] = useState('');
  const [formCountry, setFormCountry] = useState('');
  const [formYear, setFormYear] = useState('2025');
  const [formFilm, setFormFilm] = useState('Kodak Gold 200');
  const [formCamera, setFormCamera] = useState('Olympus mju I');
  const [formOrientation, setFormOrientation] = useState('horizontal');
  const [formStory, setFormStory] = useState('');
  const [formPrice, setFormPrice] = useState(24000);
  const [formPriceUSD, setFormPriceUSD] = useState(25);
  const [formIsPublished, setFormIsPublished] = useState(true);

  // Check existing Supabase session on mount
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  // Load photos when authenticated or in local dev mode
  useEffect(() => {
    loadPhotosList();
  }, [session]);

  const loadPhotosList = async () => {
    setLoadingPhotos(true);
    try {
      const list = await getAdminPhotos();
      setPhotos(list);
    } catch (err) {
      console.error('Error loading photos:', err);
    } finally {
      setLoadingPhotos(false);
    }
  };

  // Handle Auth Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword
        });

        if (error) {
          setAuthError(error.message || 'Error de autenticación. Verifica tus credenciales.');
        }
      } catch (err) {
        setAuthError('Error conectando con Supabase.');
      } finally {
        setAuthLoading(false);
      }
    } else {
      // Local fallback session demo login
      if (authPassword === 'admin123' || authPassword === 'javaonfilm') {
        setSession({ user: { email: authEmail || 'admin@javaonfilm.com' } });
      } else {
        setAuthError('Contraseña incorrecta (Usa "admin123" para demo local).');
      }
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
  };

  // Open Modal for New Photo
  const handleOpenNewModal = () => {
    const nextNum = photos.length + 1;
    const nextCode = `PHOTO ${nextNum.toString().padStart(3, '0')}`;

    setEditingPhoto(null);
    setFormImage(null);
    setFormImagePreview('');
    setFormTitle('');
    setFormArchiveCode(nextCode);
    setFormPlace('');
    setFormCountry('');
    setFormYear('2025');
    setFormFilm('Kodak Gold 200');
    setFormCamera('Olympus mju I');
    setFormOrientation('horizontal');
    setFormStory('');
    setFormPrice(24000);
    setFormPriceUSD(25);
    setFormIsPublished(true);
    setIsModalOpen(true);
  };

  // Open Modal for Editing Photo
  const handleOpenEditModal = (photo) => {
    setEditingPhoto(photo);
    setFormImage(null);
    setFormImagePreview(photo.image);
    setFormTitle(photo.title);
    setFormArchiveCode(photo.archiveCode || 'PHOTO');
    setFormPlace(photo.place || '');
    setFormCountry(photo.country || '');
    setFormYear(photo.year || '2025');
    setFormFilm(photo.film || 'Kodak Gold 200');
    setFormCamera(photo.camera || 'Olympus mju I');
    setFormOrientation(photo.orientation || 'horizontal');
    setFormStory(photo.story || '');
    setFormPrice(photo.price || 24000);
    setFormPriceUSD(photo.priceUSD || 25);
    setFormIsPublished(photo.isPublished ?? true);
    setIsModalOpen(true);
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormImage(file);
      setFormImagePreview(URL.createObjectURL(file));
    }
  };

  // Save Photo Submission
  const handleSavePhotoSubmit = async (e) => {
    e.preventDefault();
    if (!formImagePreview && !formImage) {
      alert('Por favor selecciona una imagen para la fotografía.');
      return;
    }

    setSavingPhoto(true);
    try {
      let imageUrl = formImagePreview;

      // Upload file if new file selected
      if (formImage) {
        const uploadedUrl = await uploadPhotoFile(formImage);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const photoPayload = {
        id: editingPhoto?.id,
        archiveCode: formArchiveCode || 'PHOTO',
        title: formTitle,
        place: formPlace,
        country: formCountry,
        year: formYear,
        film: formFilm,
        camera: formCamera,
        orientation: formOrientation,
        story: formStory,
        image: imageUrl,
        price: Number(formPrice),
        priceUSD: Number(formPriceUSD),
        isPublished: formIsPublished,
        displayOrder: editingPhoto ? editingPhoto.displayOrder : photos.length
      };

      await savePhoto(photoPayload);
      await loadPhotosList();
      setIsModalOpen(false);
    } catch (err) {
      alert('Error guardando la fotografía: ' + (err.message || 'Inténtalo de nuevo.'));
    } finally {
      setSavingPhoto(false);
    }
  };

  // Toggle Visibility
  const handleToggleVisibility = async (photo) => {
    const updatedStatus = !photo.isPublished;
    setPhotos(prev => prev.map(p => p.id === photo.id ? { ...p, isPublished: updatedStatus } : p));
    try {
      await togglePhotoVisibility(photo.id, updatedStatus);
    } catch (err) {
      console.error('Error toggling visibility:', err);
    }
  };

  // Delete Photo
  const handleDeletePhoto = async (photo) => {
    if (window.confirm(`¿Seguro que deseas eliminar la fotografía "${photo.title}" (${photo.archiveCode})?`)) {
      setPhotos(prev => prev.filter(p => p.id !== photo.id));
      try {
        await deletePhoto(photo.id);
      } catch (err) {
        console.error('Error deleting photo:', err);
      }
    }
  };

  // Move Order Up / Down
  const handleMoveOrder = async (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= photos.length) return;

    const updated = [...photos];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);

    setPhotos(updated);
    try {
      await updatePhotosOrder(updated);
    } catch (err) {
      console.error('Error reordering photos:', err);
    }
  };

  // IF NOT LOGGED IN -> RENDER AUTH SCREEN
  if (!session) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-[#FDFBF7] p-8 rounded-2xl border border-[#E4DCD0] shadow-md space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-[#EFE5D5] text-[#C85A32] rounded-full">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#2A1E17]">Panel de Administración</h1>
            <p className="text-xs font-mono text-[#736B63]">
              Inicia sesión para gestionar el archivo de JavaOnFilm
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="bg-[#FFF4E5] border border-[#F7D3A6] p-3 rounded-lg text-xs font-mono text-[#8C4A00] space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Supabase no configurado aún</span>
              </div>
              <p className="text-[11px] leading-tight">
                Ingresa tus credenciales en el archivo <code>.env</code> o usa la contraseña demo <code>admin123</code> para acceder.
              </p>
            </div>
          )}

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-mono rounded-lg">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF6EE] border border-[#E4DCD0] rounded-lg text-sm text-[#2A1E17] focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                Contraseña Privada
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF6EE] border border-[#E4DCD0] rounded-lg text-sm text-[#2A1E17] focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-[#C85A32] hover:bg-[#B24B25] text-white text-sm font-bold rounded-lg shadow transition flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <span>Ingresando...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Entrar al Panel Admin</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs font-mono text-[#736B63] hover:text-[#C85A32]">
              ← Volver a la Tienda Pública
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // LOGGED IN ADMIN DASHBOARD
  const totalCount = photos.length;
  const publishedCount = photos.filter(p => p.isPublished).length;
  const draftCount = totalCount - publishedCount;

  return (
    <div className="min-h-screen bg-[#FAF6EE] pb-24">
      
      {/* ADMIN TOP BAR */}
      <header className="bg-[#FAF6EE] border-b border-[#E4DCD0] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#2A1E17] text-white rounded-lg font-serif font-bold text-sm">
              JOF
            </span>
            <div>
              <h1 className="text-lg font-serif font-bold text-[#2A1E17]">Panel de Gestión — JavaOnFilm</h1>
              <p className="text-xs font-mono text-[#736B63]">
                {session?.user?.email || 'Administrador'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/prints"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EFE5D5] hover:bg-[#E4DCD0] text-[#2A1E17] text-xs font-mono font-semibold rounded-lg transition"
            >
              <Store className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Ver Tienda en Vivo</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDFBF7] border border-[#E4DCD0] hover:border-red-300 text-xs font-mono font-semibold text-[#736B63] hover:text-red-600 rounded-lg transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* STATS & QUICK ACTIONS BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          
          <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#E4DCD0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#736B63] uppercase">Total Fotografías</span>
              <div className="text-3xl font-bold font-serif text-[#2A1E17]">{totalCount}</div>
            </div>
            <Film className="w-8 h-8 text-[#C85A32] opacity-30" />
          </div>

          <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#E4DCD0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#736B63] uppercase">Publicadas en Tienda</span>
              <div className="text-3xl font-bold font-serif text-emerald-700">{publishedCount}</div>
            </div>
            <Eye className="w-8 h-8 text-emerald-600 opacity-30" />
          </div>

          <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#E4DCD0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#736B63] uppercase">Ocultas / Borradores</span>
              <div className="text-3xl font-bold font-serif text-amber-700">{draftCount}</div>
            </div>
            <EyeOff className="w-8 h-8 text-amber-600 opacity-30" />
          </div>

          {/* PRIMARY ADD PHOTO ACTION BUTTON */}
          <button
            onClick={handleOpenNewModal}
            className="bg-[#C85A32] hover:bg-[#B24B25] text-white p-5 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2.5 sm:col-span-1 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Agregar Nueva Fotografía</span>
          </button>
        </div>

        {/* CATALOG MANAGEMENT TABLE / CARD LIST */}
        <div className="bg-[#FDFBF7] rounded-2xl border border-[#E4DCD0] shadow-sm overflow-hidden space-y-4">
          
          <div className="p-5 border-b border-[#E4DCD0] flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2A1E17]">Catálogo de Archivo</h2>
              <p className="text-xs font-mono text-[#736B63]">
                Administra el orden, edición y visibilidad de las obras
              </p>
            </div>
          </div>

          {loadingPhotos ? (
            <div className="p-12 text-center text-xs font-mono text-[#736B63]">
              Cargando fotografías del archivo...
            </div>
          ) : photos.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <p className="text-sm text-[#5A4C40] font-serif">No hay fotografías registradas aún.</p>
              <button
                onClick={handleOpenNewModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#C85A32] text-white text-xs font-mono font-bold rounded-lg shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar la primera fotografía</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#E4DCD0]">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    !photo.isPublished ? 'bg-[#F4EFE6]/60' : 'hover:bg-[#FAF6EE]'
                  }`}
                >
                  
                  {/* Photo Thumbnail & Basic Info */}
                  <div className="flex items-center gap-4">
                    
                    {/* Thumbnail */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FAF6EE] rounded-lg border border-[#E4DCD0] overflow-hidden shrink-0 relative flex items-center justify-center">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#C85A32]">
                          {photo.archiveCode || 'PHOTO'}
                        </span>
                        
                        {/* Status Badge */}
                        {photo.isPublished ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded">
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Publicada</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-mono font-bold rounded">
                            <EyeOff className="w-3 h-3 text-amber-600" />
                            <span>Oculta / Borrador</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-serif font-bold text-[#2A1E17]">
                        {photo.title}
                      </h3>

                      <p className="text-xs font-mono text-[#736B63]">
                        {photo.place}, {photo.country} ({photo.year}) · {photo.orientation === 'horizontal' ? 'Horizontal' : 'Vertical'} · ${photo.price?.toLocaleString('es-CL')} CLP
                      </p>
                    </div>

                  </div>

                  {/* Actions & Reordering Controls */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    
                    {/* Order Controls */}
                    <div className="flex items-center border border-[#E4DCD0] rounded-lg bg-[#FAF6EE] overflow-hidden">
                      <button
                        onClick={() => handleMoveOrder(index, 'up')}
                        disabled={index === 0}
                        className="p-2 text-[#736B63] hover:text-[#2A1E17] disabled:opacity-30 disabled:hover:text-[#736B63]"
                        title="Mover Arriba"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(index, 'down')}
                        disabled={index === photos.length - 1}
                        className="p-2 text-[#736B63] hover:text-[#2A1E17] disabled:opacity-30 disabled:hover:text-[#736B63]"
                        title="Mover Abajo"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Store Preview */}
                    <button
                      onClick={() => setPreviewPhoto(photo)}
                      className="p-2 bg-[#EFE5D5] hover:bg-[#E4DCD0] text-[#2A1E17] rounded-lg transition"
                      title="Ver vista previa de tienda"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    {/* Visibility Switch */}
                    <button
                      onClick={() => handleToggleVisibility(photo)}
                      className={`px-3 py-2 text-xs font-mono font-bold rounded-lg border flex items-center gap-1.5 transition ${
                        photo.isPublished
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                          : 'border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      {photo.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{photo.isPublished ? 'Ocultar' : 'Publicar'}</span>
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleOpenEditModal(photo)}
                      className="p-2 bg-[#FAF6EE] border border-[#E4DCD0] hover:border-[#C85A32] text-[#2A1E17] hover:text-[#C85A32] rounded-lg transition"
                      title="Editar fotografía"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeletePhoto(photo)}
                      className="p-2 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 rounded-lg transition"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </main>

      {/* MODAL: ADD / EDIT PHOTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#181411]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF6EE] w-full max-w-2xl rounded-2xl border border-[#E4DCD0] shadow-2xl overflow-hidden my-8 space-y-6">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#FAF6EE] border-b border-[#E4DCD0] flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#2A1E17]">
                  {editingPhoto ? 'Editar Fotografía' : 'Agregar Nueva Fotografía'}
                </h3>
                <p className="text-xs font-mono text-[#736B63]">
                  {editingPhoto ? `Modificando ${editingPhoto.archiveCode}` : 'Sube la imagen y define los detalles de la obra'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#736B63] hover:text-[#2A1E17] rounded-full hover:bg-[#EFE5D5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSavePhotoSubmit} className="p-6 space-y-6">
              
              {/* IMAGE UPLOAD FILE PICKER */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase">
                  Imagen de la Fotografía (Alta Resolución)
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {formImagePreview ? (
                    <div className="w-32 h-32 bg-[#EFE5D5] rounded-xl border border-[#E4DCD0] overflow-hidden shrink-0 relative">
                      <img src={formImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-[#EFE5D5] rounded-xl border border-dashed border-[#C85A32] flex flex-col items-center justify-center text-[#C85A32] shrink-0">
                      <Upload className="w-8 h-8 opacity-60" />
                      <span className="text-[10px] font-mono font-bold mt-1">Subir Foto</span>
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-xs text-[#736B63] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-mono file:font-bold file:bg-[#C85A32] file:text-white hover:file:bg-[#B24B25] cursor-pointer"
                    />
                    <p className="text-[11px] text-[#736B63] leading-tight font-mono">
                      Formatos recomendados: JPG, PNG, WEBP. Puedes tomar la foto desde la cámara de tu celular o elegir un archivo.
                    </p>
                  </div>
                </div>
              </div>

              {/* ARCHIVE CODE & TITLE */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                    Código de Archivo
                  </label>
                  <input
                    type="text"
                    required
                    value={formArchiveCode}
                    onChange={(e) => setFormArchiveCode(e.target.value)}
                    placeholder="PHOTO 004"
                    className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-xs font-mono font-bold text-[#C85A32]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                    Título de la Obra (Lugar Protagonista)
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ej: Arraial do Cabo"
                    className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-sm text-[#2A1E17] focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              {/* PLACE, COUNTRY, YEAR */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                    Lugar / Ciudad
                  </label>
                  <input
                    type="text"
                    required
                    value={formPlace}
                    onChange={(e) => setFormPlace(e.target.value)}
                    placeholder="Ej: Rio de Janeiro"
                    className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-sm text-[#2A1E17]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                    País
                  </label>
                  <input
                    type="text"
                    required
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    placeholder="Ej: Brasil"
                    className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-sm text-[#2A1E17]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                    Año
                  </label>
                  <input
                    type="text"
                    required
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-sm font-mono text-[#2A1E17]"
                  />
                </div>
              </div>

              {/* CAMERA, FILM & ORIENTATION */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                    Cámara
                  </label>
                  <input
                    type="text"
                    value={formCamera}
                    onChange={(e) => setFormCamera(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-xs font-mono text-[#2A1E17]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                    Película
                  </label>
                  <input
                    type="text"
                    value={formFilm}
                    onChange={(e) => setFormFilm(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-xs font-mono text-[#2A1E17]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                    Orientación Original
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-0.5">
                    <button
                      type="button"
                      onClick={() => setFormOrientation('horizontal')}
                      className={`py-2 rounded-lg text-xs font-mono font-bold border transition ${
                        formOrientation === 'horizontal'
                          ? 'bg-[#C85A32] text-white border-[#C85A32]'
                          : 'bg-[#FDFBF7] text-[#2A1E17] border-[#E4DCD0]'
                      }`}
                    >
                      Horizontal
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormOrientation('vertical')}
                      className={`py-2 rounded-lg text-xs font-mono font-bold border transition ${
                        formOrientation === 'vertical'
                          ? 'bg-[#C85A32] text-white border-[#C85A32]'
                          : 'bg-[#FDFBF7] text-[#2A1E17] border-[#E4DCD0]'
                      }`}
                    >
                      Vertical
                    </button>
                  </div>
                </div>
              </div>

              {/* STORY / DESCRIPTION */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                  Historia / Relato de la Fotografía (2-4 líneas)
                </label>
                <textarea
                  rows={3}
                  value={formStory}
                  onChange={(e) => setFormStory(e.target.value)}
                  placeholder="Escribe brevemente la historia detrás de esta imagen..."
                  className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-xs text-[#2A1E17] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              {/* BASE PRICE & PUBLICATION STATUS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E4DCD0]">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                    Precio Base (CLP)
                  </label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-xs font-mono font-bold text-[#2A1E17]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                    Precio Aprox. (USD)
                  </label>
                  <input
                    type="number"
                    value={formPriceUSD}
                    onChange={(e) => setFormPriceUSD(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#E4DCD0] rounded-lg text-xs font-mono text-[#2A1E17]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#2A1E17] uppercase mb-1">
                    Estado de Publicación
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormIsPublished(!formIsPublished)}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-mono font-bold border flex items-center justify-center gap-2 transition ${
                      formIsPublished
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-amber-600 text-white border-amber-600'
                    }`}
                  >
                    {formIsPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span>{formIsPublished ? 'Publicada en Tienda' : 'Oculta / Borrador'}</span>
                  </button>
                </div>
              </div>

              {/* MODAL ACTION BUTTONS */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E4DCD0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 bg-[#EFE5D5] hover:bg-[#E4DCD0] text-[#2A1E17] text-xs font-mono font-bold rounded-lg transition"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={savingPhoto}
                  className="px-6 py-3 bg-[#C85A32] hover:bg-[#B24B25] text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-2"
                >
                  {savingPhoto ? (
                    <span>Guardando...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{editingPhoto ? 'Guardar Cambios' : 'Publicar Fotografía'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* STORE PREVIEW MODAL */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 bg-[#181411]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF6EE] w-full max-w-xl rounded-2xl border border-[#E4DCD0] p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-4 right-4 p-2 text-[#736B63] hover:text-[#2A1E17] rounded-full hover:bg-[#EFE5D5]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="text-xs font-mono text-[#C85A32] font-bold">
                VISTA PREVIA — {previewPhoto.archiveCode}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#2A1E17]">
                {previewPhoto.title}
              </h3>
            </div>

            <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#E4DCD0] flex justify-center items-center h-72">
              <img
                src={previewPhoto.image}
                alt={previewPhoto.title}
                className="max-h-full max-w-full object-contain shadow-lg rounded"
              />
            </div>

            <p className="text-xs text-[#5A4C40] leading-relaxed italic text-center">
              "{previewPhoto.story}"
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#E4DCD0] text-xs font-mono text-[#736B63]">
              <span>{previewPhoto.place}, {previewPhoto.country} ({previewPhoto.year})</span>
              <span className="font-bold text-[#2A1E17]">${previewPhoto.price?.toLocaleString('es-CL')} CLP</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

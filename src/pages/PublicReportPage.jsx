import React, { useState, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { MapPin, Building, Layers, Home, Tag, Box, FileText, Camera, Send, CheckCircle, X, AlertCircle } from 'lucide-react';

// Dummy data (same as MasterDataPage for consistency)
const BUILDINGS = [
  { id: 1, code: 'GDA', name: 'Gedung A' },
  { id: 2, code: 'GDB', name: 'Gedung B' },
  { id: 3, code: 'GDC', name: 'Gedung C' },
  { id: 4, code: 'GDD', name: 'Gedung D' },
  { id: 5, code: 'GDE', name: 'Gedung E' },
];

const FLOORS = [
  { id: 1, building_id: 1, floor: 1 },
  { id: 2, building_id: 1, floor: 2 },
  { id: 3, building_id: 1, floor: 3 },
  { id: 4, building_id: 2, floor: 1 },
  { id: 5, building_id: 2, floor: 2 },
  { id: 6, building_id: 3, floor: 1 },
  { id: 7, building_id: 3, floor: 2 },
  { id: 8, building_id: 3, floor: 3 },
  { id: 9, building_id: 4, floor: 1 },
  { id: 10, building_id: 4, floor: 2 },
  { id: 11, building_id: 5, floor: 1 },
  { id: 12, building_id: 5, floor: 2 },
  { id: 13, building_id: 5, floor: 3 },
];

const ROOMS = [
  { id: 1, building_id: 1, floor: 1, name: 'Ruang 101', room_number: '101' },
  { id: 2, building_id: 1, floor: 1, name: 'Ruang 102', room_number: '102' },
  { id: 3, building_id: 1, floor: 2, name: 'Ruang 201', room_number: '201' },
  { id: 4, building_id: 1, floor: 2, name: 'Lab Komputer', room_number: '202' },
  { id: 5, building_id: 2, floor: 1, name: 'Ruang Kelas 1A', room_number: '101' },
  { id: 6, building_id: 2, floor: 1, name: 'Ruang Kelas 1B', room_number: '102' },
  { id: 7, building_id: 2, floor: 2, name: 'Ruang Rapat', room_number: '201' },
  { id: 8, building_id: 3, floor: 1, name: 'Aula', room_number: '101' },
  { id: 9, building_id: 3, floor: 2, name: 'Perpustakaan', room_number: '201' },
  { id: 10, building_id: 4, floor: 1, name: 'Kantor Admin', room_number: '101' },
  { id: 11, building_id: 5, floor: 1, name: 'Lab Fisika', room_number: '101' },
  { id: 12, building_id: 5, floor: 2, name: 'Lab Kimia', room_number: '201' },
];

const CATEGORIES = [
  { id: 1, name: 'Elektronik', description: 'Peralatan elektronik' },
  { id: 2, name: 'IT', description: 'Peralatan teknologi informasi' },
  { id: 3, name: 'Furniture', description: 'Perabotan dan furnitur' },
  { id: 4, name: 'Pendidikan', description: 'Peralatan pendidikan' },
  { id: 5, name: 'Keamanan', description: 'Peralatan keamanan' },
  { id: 6, name: 'Kebersihan', description: 'Peralatan kebersihan' },
];

const EQUIPMENT = [
  { id: 1, name: 'AC', category_id: 1 },
  { id: 2, name: 'Kipas Angin', category_id: 1 },
  { id: 3, name: 'Lampu', category_id: 1 },
  { id: 4, name: 'Stop Kontak', category_id: 1 },
  { id: 5, name: 'Komputer', category_id: 2 },
  { id: 6, name: 'Proyektor', category_id: 2 },
  { id: 7, name: 'Printer', category_id: 2 },
  { id: 8, name: 'Router WiFi', category_id: 2 },
  { id: 9, name: 'Meja', category_id: 3 },
  { id: 10, name: 'Kursi', category_id: 3 },
  { id: 11, name: 'Lemari', category_id: 3 },
  { id: 12, name: 'Papan Tulis', category_id: 4 },
  { id: 13, name: 'LCD Screen', category_id: 4 },
  { id: 14, name: 'CCTV', category_id: 5 },
  { id: 15, name: 'Alarm', category_id: 5 },
  { id: 16, name: 'Vacuum Cleaner', category_id: 6 },
];

const PublicReportPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  // Form state
  const [formData, setFormData] = useState({
    description: '',
    building_id: '',
    floor: '',
    room_id: '',
    category_id: '',
    equipment_id: '',
    detail: '',
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filtered options based on selections
  const filteredFloors = useMemo(() => {
    if (!formData.building_id) return [];
    return FLOORS.filter(f => f.building_id === parseInt(formData.building_id));
  }, [formData.building_id]);

  const filteredRooms = useMemo(() => {
    if (!formData.building_id || !formData.floor) return [];
    return ROOMS.filter(r => 
      r.building_id === parseInt(formData.building_id) && 
      r.floor === parseInt(formData.floor)
    );
  }, [formData.building_id, formData.floor]);

  const filteredEquipment = useMemo(() => {
    if (!formData.category_id) return [];
    return EQUIPMENT.filter(e => e.category_id === parseInt(formData.category_id));
  }, [formData.category_id]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Reset dependent fields when parent changes
      if (name === 'building_id') {
        newData.floor = '';
        newData.room_id = '';
      } else if (name === 'floor') {
        newData.room_id = '';
      } else if (name === 'category_id') {
        newData.equipment_id = '';
      }
      
      return newData;
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      enqueueSnackbar('Maksimal 5 gambar yang dapat diupload', { variant: 'warning' });
      return;
    }

    setImages(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi wajib diisi';
    }
    if (!formData.building_id) {
      newErrors.building_id = 'Pilih gedung';
    }
    if (!formData.floor) {
      newErrors.floor = 'Pilih lantai';
    }
    if (!formData.room_id) {
      newErrors.room_id = 'Pilih ruangan';
    }
    if (!formData.category_id) {
      newErrors.category_id = 'Pilih kategori';
    }
    if (!formData.equipment_id) {
      newErrors.equipment_id = 'Pilih jenis peralatan';
    }
    if (!formData.detail.trim()) {
      newErrors.detail = 'Keterangan detail wajib diisi';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleNewReport = () => {
    setFormData({
      description: '',
      building_id: '',
      floor: '',
      room_id: '',
      category_id: '',
      equipment_id: '',
      detail: '',
    });
    setImages([]);
    setImagePreviews([]);
    setErrors({});
    setIsSubmitted(false);
  };

  // Success screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Laporan Terkirim!</h2>
          <p className="text-gray-600 mb-6">
            Terima kasih atas laporan Anda. Tim kami akan segera menindaklanjuti.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Nomor Tiket Anda</p>
            <p className="text-2xl font-bold text-blue-600">TKT-{String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</p>
          </div>
          <button
            onClick={handleNewReport}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Buat Laporan Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Laporkan Kerusakan</h1>
              <p className="text-blue-200 text-sm">Sistem Pelaporan Kerusakan Fasilitas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Form Pelaporan</h2>
            <p className="text-blue-100 text-sm">Lengkapi informasi di bawah ini</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Deskripsi */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText size={16} className="text-blue-500" />
                Deskripsi Kerusakan
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Contoh: AC tidak dingin, Proyektor mati, dll"
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                  errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.description}
                </p>
              )}
            </div>

            {/* Lokasi Section */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                <MapPin size={16} className="text-blue-500" />
                Lokasi
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Gedung */}
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                    <Building size={14} /> Gedung
                  </label>
                  <select
                    name="building_id"
                    value={formData.building_id}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                      errors.building_id ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Gedung</option>
                    {BUILDINGS.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                  {errors.building_id && (
                    <p className="mt-1 text-xs text-red-500">{errors.building_id}</p>
                  )}
                </div>

                {/* Lantai */}
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                    <Layers size={14} /> Lantai
                  </label>
                  <select
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    disabled={!formData.building_id}
                    className={`w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.floor ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Lantai</option>
                    {filteredFloors.map(f => (
                      <option key={f.id} value={f.floor}>Lantai {f.floor}</option>
                    ))}
                  </select>
                  {errors.floor && (
                    <p className="mt-1 text-xs text-red-500">{errors.floor}</p>
                  )}
                </div>

                {/* Ruangan */}
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                    <Home size={14} /> Ruangan
                  </label>
                  <select
                    name="room_id"
                    value={formData.room_id}
                    onChange={handleChange}
                    disabled={!formData.floor}
                    className={`w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.room_id ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Ruangan</option>
                    {filteredRooms.map(r => (
                      <option key={r.id} value={r.id}>{r.name} ({r.room_number})</option>
                    ))}
                  </select>
                  {errors.room_id && (
                    <p className="mt-1 text-xs text-red-500">{errors.room_id}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Peralatan Section */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                <Box size={16} className="text-blue-500" />
                Peralatan
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kategori */}
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                    <Tag size={14} /> Kategori
                  </label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                      errors.category_id ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Kategori</option>
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="mt-1 text-xs text-red-500">{errors.category_id}</p>
                  )}
                </div>

                {/* Jenis Peralatan */}
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                    <Box size={14} /> Jenis Peralatan
                  </label>
                  <select
                    name="equipment_id"
                    value={formData.equipment_id}
                    onChange={handleChange}
                    disabled={!formData.category_id}
                    className={`w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.equipment_id ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Jenis Peralatan</option>
                    {filteredEquipment.map(e => (
                      <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                  </select>
                  {errors.equipment_id && (
                    <p className="mt-1 text-xs text-red-500">{errors.equipment_id}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Keterangan Detail */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText size={16} className="text-blue-500" />
                Keterangan Detail
              </label>
              <textarea
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                rows={4}
                placeholder="Jelaskan secara detail kerusakan yang terjadi..."
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none ${
                  errors.detail ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.detail && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.detail}
                </p>
              )}
            </div>

            {/* Upload Gambar */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Camera size={16} className="text-blue-500" />
                Foto Kerusakan (Opsional, maks. 5 foto)
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Klik untuk upload foto</p>
                  <p className="text-gray-400 text-sm">atau drag & drop file di sini</p>
                </label>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 flex gap-3 flex-wrap">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Mengirim...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Kirim Laporan
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-200 text-sm mt-6">
          © 2025 Sistem Pelaporan Kerusakan Fasilitas
        </p>
      </div>
    </div>
  );
};

export default PublicReportPage;

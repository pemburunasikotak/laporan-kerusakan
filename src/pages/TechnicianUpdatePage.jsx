import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Wrench,
  Send,
  ArrowLeft,
  FileText,
  AlertCircle,
  Package,
  Phone
} from 'lucide-react';

// Dummy report data (in production, fetch from API)
const DUMMY_REPORTS = {
  'TKT-001': {
    id: 1,
    ticket_id: 'TKT-001',
    description: 'AC tidak dingin di Ruang Kelas 101',
    location: 'Gedung A - Lt 1 - Ruang 101',
    equipment: 'AC',
    category: 'Elektronik',
    detail: 'AC sudah dinyalakan tapi tidak keluar angin dingin, hanya angin biasa',
    reporter_name: 'Budi Santoso',
    reporter_phone: '081234567890',
    technician: {
      name: 'Ahmad Teknisi',
      phone: '081298765432',
      specialist: 'Elektronik & AC'
    },
    status: 'IN_PROGRESS',
    created_at: '2025-12-10 08:30',
    assigned_at: '2025-12-10 09:15',
  },
  'TKT-002': {
    id: 2,
    ticket_id: 'TKT-002',
    description: 'Proyektor tidak menyala',
    location: 'Gedung B - Lt 2 - Ruang 201',
    equipment: 'Proyektor',
    category: 'IT',
    detail: 'Proyektor sudah dinyalakan tapi tidak ada tampilan sama sekali',
    reporter_name: 'Siti Aminah',
    reporter_phone: '081234567891',
    technician: {
      name: 'Budi Teknisi',
      phone: '081287654321',
      specialist: 'IT & Multimedia'
    },
    status: 'ASSIGNED',
    created_at: '2025-12-11 10:00',
    assigned_at: '2025-12-11 10:30',
  },
  'TKT-310': {
    id: 310,
    ticket_id: 'TKT-310',
    description: 'Lampu ruangan mati',
    location: 'Gedung C - Lt 3 - Ruang 303',
    equipment: 'Lampu',
    category: 'Elektronik',
    detail: 'Semua lampu di ruangan tidak menyala, sudah dicoba ganti saklar tetap tidak bisa',
    reporter_name: 'Dewi Lestari',
    reporter_phone: '081234567892',
    technician: {
      name: 'Ahmad Teknisi',
      phone: '081298765432',
      specialist: 'Elektronik & AC'
    },
    status: 'IN_PROGRESS',
    created_at: '2025-12-12 07:45',
    assigned_at: '2025-12-12 08:00',
  },
};

const STATUS_OPTIONS = [
  { value: 'IN_PROGRESS', label: 'Sedang Dikerjakan', icon: Wrench, color: 'bg-blue-500', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
  { value: 'WAITING_PART', label: 'Menunggu Sparepart', icon: Package, color: 'bg-yellow-500', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' },
  { value: 'COMPLETED', label: 'Selesai', icon: CheckCircle, color: 'bg-green-500', bgColor: 'bg-green-100', textColor: 'text-green-600' },
];

const TechnicianUpdatePage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  const [selectedStatus, setSelectedStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Fetch report data
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const reportData = DUMMY_REPORTS[ticketId];
      if (reportData) {
        setReport(reportData);
        setSelectedStatus(reportData.status);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    fetchReport();
  }, [ticketId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedStatus) {
      setError('Pilih status pengerjaan');
      return;
    }
    
    if (selectedStatus === 'WAITING_PART' && !notes.trim()) {
      setError('Keterangan wajib diisi jika menunggu sparepart');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white font-medium">Memuat data laporan...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Laporan Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">
            Tiket dengan ID <strong>{ticketId}</strong> tidak ditemukan dalam sistem.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Update Berhasil!</h2>
          <p className="text-gray-600 mb-6">
            Status pengerjaan laporan <strong>{ticketId}</strong> telah diperbarui.
          </p>
          <div className="bg-emerald-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Status Baru</p>
            <p className="text-xl font-bold text-emerald-600">
              {STATUS_OPTIONS.find(s => s.value === selectedStatus)?.label}
            </p>
          </div>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            Kembali ke Detail
          </button>
        </div>
      </div>
    );
  }

  const currentStatus = STATUS_OPTIONS.find(s => s.value === report.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Update Pengerjaan</h1>
              <p className="text-emerald-200 text-sm">Tiket #{ticketId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Report Info Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Nomor Tiket</p>
                <p className="text-2xl font-bold text-white">{report.ticket_id}</p>
              </div>
              <div className={`px-3 py-1 rounded-full ${currentStatus.bgColor} ${currentStatus.textColor} text-sm font-semibold flex items-center gap-1`}>
                <currentStatus.icon size={16} />
                {currentStatus.label}
              </div>
            </div>
          </div>

          {/* Report Details */}
          <div className="p-6 border-b">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ClipboardList size={18} className="text-emerald-500" />
              Detail Laporan
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FileText size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Deskripsi</p>
                  <p className="font-medium text-gray-800">{report.description}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Lokasi</p>
                  <p className="font-medium text-gray-800">{report.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Package size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Peralatan</p>
                    <p className="font-medium text-gray-800">{report.equipment}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Tanggal Laporan</p>
                    <p className="font-medium text-gray-800">{report.created_at}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 mt-3">
                <p className="text-sm text-gray-500 mb-1">Keterangan Detail</p>
                <p className="text-gray-700">{report.detail}</p>
              </div>

              {/* Technician Details */}
              <div className="bg-emerald-50 rounded-lg p-4 mt-4 border border-emerald-200">
                <h4 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                  <User size={16} />
                  Teknisi yang Mengerjakan
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                      <User size={20} className="text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nama Teknisi</p>
                      <p className="font-semibold text-gray-800">{report.technician.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                      <Phone size={20} className="text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">No. Telepon</p>
                      <p className="font-semibold text-gray-800">{report.technician.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                      <Wrench size={20} className="text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Spesialisasi</p>
                      <p className="font-semibold text-gray-800">{report.technician.specialist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                      <Calendar size={20} className="text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ditugaskan</p>
                      <p className="font-semibold text-gray-800">{report.assigned_at}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Wrench size={18} className="text-emerald-500" />
              Update Status Pengerjaan
            </h3>

            {/* Status Selection */}
            <div className="space-y-3 mb-6">
              {STATUS_OPTIONS.map((status) => {
                const Icon = status.icon;
                const isSelected = selectedStatus === status.value;
                return (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(status.value);
                      setError('');
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition flex items-center gap-4 ${
                      isSelected 
                        ? `border-emerald-500 ${status.bgColor}`
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full ${status.color} flex items-center justify-center`}>
                      <Icon className="text-white" size={20} />
                    </div>
                    <div className="text-left flex-1">
                      <p className={`font-semibold ${isSelected ? 'text-gray-800' : 'text-gray-700'}`}>
                        {status.label}
                      </p>
                      {status.value === 'WAITING_PART' && (
                        <p className="text-sm text-gray-500">Membutuhkan sparepart atau bahan</p>
                      )}
                      {status.value === 'COMPLETED' && (
                        <p className="text-sm text-gray-500">Pekerjaan sudah selesai</p>
                      )}
                      {status.value === 'IN_PROGRESS' && (
                        <p className="text-sm text-gray-500">Masih dalam proses pengerjaan</p>
                      )}
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="text-white" size={16} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Notes/Keterangan */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText size={16} className="text-emerald-500" />
                Keterangan / Catatan
                {selectedStatus === 'WAITING_PART' && (
                  <span className="text-red-500 text-xs">(Wajib diisi)</span>
                )}
              </label>
              <textarea
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  setError('');
                }}
                rows={4}
                placeholder={
                  selectedStatus === 'WAITING_PART' 
                    ? 'Jelaskan sparepart/bahan apa yang dibutuhkan...'
                    : selectedStatus === 'COMPLETED'
                    ? 'Catatan tambahan tentang pekerjaan yang sudah selesai (opsional)...'
                    : 'Catatan progress pengerjaan (opsional)...'
                }
                className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition resize-none ${
                  error && selectedStatus === 'WAITING_PART' ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> {error}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Simpan Update
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-emerald-200 text-sm mt-6">
          © 2025 Sistem Pelaporan Kerusakan Fasilitas
        </p>
      </div>
    </div>
  );
};

export default TechnicianUpdatePage;

import React, { useState, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { Search, Filter, Eye, UserPlus, RefreshCcw, MapPin, Phone, Calendar, User, Image as ImageIcon } from 'lucide-react';
import { SummaryCardSkeleton, TableSkeleton } from '../components/SkeletonLoader';
import { 
  StatusBadge, 
  StatFilterButton, 
  Pagination, 
  Modal, 
  ImageGallery, 
  PageHeader, 
  ActionButton, 
  InfoRow 
} from '../components/ui';

// Constants
const STATUS_CONFIG = {
  'PENDING': { label: 'Pending', color: 'bg-red-100 text-red-600', filterColor: 'red' },
  'ASSIGNED': { label: 'Assigned', color: 'bg-blue-100 text-blue-600', filterColor: 'blue' },
  'IN_PROGRESS': { label: 'In Progress', color: 'bg-yellow-100 text-yellow-600', filterColor: 'yellow' },
  'WAITING_PART': { label: 'Waiting Part', color: 'bg-purple-100 text-purple-600', filterColor: 'purple' },
  'COMPLETED': { label: 'Completed', color: 'bg-green-100 text-green-600', filterColor: 'green' },
};

const PRIORITY_CONFIG = {
  'HIGH': 'bg-red-100 text-red-600',
  'MEDIUM': 'bg-yellow-100 text-yellow-600',
  'LOW': 'bg-gray-100 text-gray-600',
};

const ITEMS_PER_PAGE = 10;

// Dummy Data (in production, this would come from API)
const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',
];

const TECHNICIANS = [
  { id: 1, name: 'Ahmad Teknisi', specialist: 'Elektronik & AC', phone: '081234567890' },
  { id: 2, name: 'Budi Hartono', specialist: 'Jaringan & IT', phone: '081234567891' },
  { id: 3, name: 'Candra Wijaya', specialist: 'Furniture & Sipil', phone: '081234567892' },
  { id: 4, name: 'Dedi Supriyanto', specialist: 'Plumbing & Sanitasi', phone: '081234567893' },
  { id: 5, name: 'Eko Prasetyo', specialist: 'Listrik & Panel', phone: '081234567894' },
];

// Generate dummy reports
const generateReports = () => {
  const statuses = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'WAITING_PART', 'COMPLETED'];
  const priorities = ['HIGH', 'MEDIUM', 'LOW'];
  const descriptions = [
    'AC tidak dingin', 'Proyektor tidak menyala', 'Lampu mati', 'Kursi rusak', 
    'Papan tulis rusak', 'Kran bocor', 'WiFi tidak stabil', 'Pintu macet',
    'Stop kontak mati', 'Printer error', 'Jendela retak', 'Meja goyang'
  ];
  
  return Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    ticket_id: `TKT-${String(i + 1).padStart(3, '0')}`,
    description: descriptions[i % descriptions.length] + ` di Ruang ${101 + i}`,
    location: `Gedung ${['A', 'B', 'C'][i % 3]} - Lt ${(i % 4) + 1} - Ruang ${100 + i}`,
    reporter_phone: `0812345678${String(i).padStart(2, '0')}`,
    reporter_name: `Pelapor ${i + 1}`,
    status: statuses[i % statuses.length],
    technician: i % 2 === 0 ? TECHNICIANS[i % TECHNICIANS.length].name : null,
    created_at: `2025-12-${String(11 - (i % 3)).padStart(2, '0')} ${8 + (i % 10)}:${String((i * 15) % 60).padStart(2, '0')}`,
    priority: priorities[i % priorities.length],
    images: i % 4 === 0 ? [] : DUMMY_IMAGES.slice(0, (i % 3) + 1),
  }));
};

const DUMMY_REPORTS = generateReports();

// Sub-components
const ReportTableRow = ({ report, onView, onAssign, onImageClick }) => (
  <tr className="border-b hover:bg-gray-50 transition">
    <td className="px-4 py-3 font-mono text-sm font-semibold text-blue-600">{report.ticket_id}</td>
    <td className="px-4 py-3 text-sm">{report.description}</td>
    <td className="px-4 py-3 text-sm text-gray-600">{report.location}</td>
    <td className="px-4 py-3">
      <StatusBadge status={report.status} config={STATUS_CONFIG} />
    </td>
    <td className="px-4 py-3">
      <ImageThumbnails images={report.images} ticketId={report.ticket_id} onClick={onImageClick} />
    </td>
    <td className="px-4 py-3 text-sm">{report.technician || '-'}</td>
    <td className="px-4 py-3 text-sm text-gray-600">{report.created_at}</td>
    <td className="px-4 py-3">
      <div className="flex justify-center gap-2">
        {report.status === 'PENDING' && (
          <button 
            onClick={() => onAssign(report)}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition"
            title="Assign Teknisi"
          >
            <UserPlus size={18} />
          </button>
        )}
        <button 
          onClick={() => onView(report)}
          className="p-1 text-gray-600 hover:bg-gray-100 rounded transition"
          title="Lihat Detail"
        >
          <Eye size={18} />
        </button>
      </div>
    </td>
  </tr>
);

const ImageThumbnails = ({ images, ticketId, onClick }) => {
  if (!images || images.length === 0) {
    return (
      <span className="text-gray-400 text-sm flex items-center gap-1">
        <ImageIcon size={16} /> No images
      </span>
    );
  }

  return (
    <div className="flex gap-1">
      {images.slice(0, 3).map((img, idx) => (
        <div
          key={idx}
          onClick={() => onClick(images, idx)}
          className="w-12 h-12 rounded border border-gray-300 overflow-hidden cursor-pointer hover:border-blue-500 transition"
        >
          <img src={img} alt={`Report ${ticketId}`} className="w-full h-full object-cover" />
        </div>
      ))}
      {images.length > 3 && (
        <div className="w-12 h-12 rounded border border-gray-300 bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
          +{images.length - 3}
        </div>
      )}
    </div>
  );
};

const ReportDetailModal = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <Modal 
      isOpen={!!report} 
      onClose={onClose} 
      title="Detail Laporan" 
      maxWidth="max-w-2xl"
      footer={
        <button 
          onClick={onClose}
          className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
        >
          Tutup
        </button>
      }
    >
      <div className="space-y-4">
        {/* Ticket ID */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-600">Ticket ID</p>
          <p className="text-xl font-bold font-mono text-blue-600">{report.ticket_id}</p>
        </div>

        {/* Status */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Status</p>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${STATUS_CONFIG[report.status].color}`}>
            {STATUS_CONFIG[report.status].label}
          </span>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Deskripsi Masalah</p>
          <p className="text-base font-semibold">{report.description}</p>
        </div>

        <InfoRow icon={MapPin} label="Lokasi" value={report.location} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow icon={User} label="Pelapor" value={report.reporter_name} />
          <InfoRow icon={Phone} label="Kontak" value={report.reporter_phone} />
        </div>

        {report.technician && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm text-gray-600">Ditangani oleh</p>
            <p className="text-base font-semibold text-green-700">{report.technician}</p>
          </div>
        )}

        <InfoRow icon={Calendar} label="Tanggal Laporan" value={report.created_at} />

        {/* Priority */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Prioritas</p>
          <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${PRIORITY_CONFIG[report.priority]}`}>
            {report.priority}
          </span>
        </div>
      </div>
    </Modal>
  );
};

const AssignTechnicianModal = ({ report, onClose, onAssign }) => {
  if (!report) return null;

  return (
    <Modal isOpen={!!report} onClose={onClose} title="Pilih Teknisi">
      <div className="mb-4 bg-blue-50 p-3 rounded">
        <p className="text-sm text-gray-600">Laporan</p>
        <p className="font-semibold">{report.ticket_id} - {report.description}</p>
      </div>

      <div className="space-y-2">
        {TECHNICIANS.map(tech => (
          <button
            key={tech.id}
            onClick={() => onAssign(report.id, tech)}
            className="w-full text-left p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {tech.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{tech.name}</p>
                <p className="text-sm text-gray-600">{tech.specialist}</p>
                <p className="text-xs text-gray-500">{tech.phone}</p>
              </div>
              <UserPlus className="text-blue-600" size={20} />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <button 
          onClick={onClose}
          className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
        >
          Batal
        </button>
      </div>
    </Modal>
  );
};

// Main Component
const ReportsList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(null);
  const [imageGallery, setImageGallery] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Memoized filtered reports
  const filteredReports = useMemo(() => {
    return DUMMY_REPORTS.filter(report => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = report.description.toLowerCase().includes(searchLower) ||
                            report.ticket_id.toLowerCase().includes(searchLower) ||
                            report.location.toLowerCase().includes(searchLower);
      const matchesStatus = statusFilter === 'ALL' || report.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Memoized status counts
  const statusCounts = useMemo(() => ({
    ALL: DUMMY_REPORTS.length,
    PENDING: DUMMY_REPORTS.filter(r => r.status === 'PENDING').length,
    IN_PROGRESS: DUMMY_REPORTS.filter(r => r.status === 'IN_PROGRESS').length,
    WAITING_PART: DUMMY_REPORTS.filter(r => r.status === 'WAITING_PART').length,
    COMPLETED: DUMMY_REPORTS.filter(r => r.status === 'COMPLETED').length,
  }), []);

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedReports = filteredReports.slice(startIndex, endIndex);

  // Handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssignTechnician = (reportId, technician) => {
    enqueueSnackbar(`Teknisi ${technician.name} berhasil ditugaskan!`, { variant: 'success' });
    setShowAssignModal(null);
  };

  const handleImageClick = (images, index) => {
    setImageGallery(images);
    setCurrentImageIndex(index);
  };

  // Status filter buttons config
  const filterButtons = [
    { status: 'ALL', label: 'Total', color: 'gray' },
    { status: 'PENDING', label: 'Pending', color: 'red' },
    { status: 'IN_PROGRESS', label: 'In Progress', color: 'yellow' },
    { status: 'WAITING_PART', label: 'Waiting Part', color: 'purple' },
    { status: 'COMPLETED', label: 'Completed', color: 'green' },
  ];

  return (
    <div>
      <PageHeader title="Daftar Laporan">
        <ActionButton icon={RefreshCcw}>Refresh</ActionButton>
      </PageHeader>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari laporan (ticket, deskripsi, lokasi)..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Semua Status</option>
              {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Status Filter Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <SummaryCardSkeleton key={i} />)
        ) : (
          filterButtons.map(({ status, label, color }) => (
            <StatFilterButton
              key={status}
              label={label}
              count={statusCounts[status]}
              isActive={statusFilter === status}
              onClick={() => setStatusFilter(status)}
              activeColor={color}
            />
          ))
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <TableSkeleton rows={10} columns={8} />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {['Ticket ID', 'Deskripsi', 'Lokasi', 'Status', 'Gambar', 'Teknisi', 'Waktu', 'Aksi'].map(header => (
                  <th key={header} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedReports.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                    Tidak ada laporan ditemukan.
                  </td>
                </tr>
              ) : (
                paginatedReports.map(report => (
                  <ReportTableRow
                    key={report.id}
                    report={report}
                    onView={setSelectedReport}
                    onAssign={setShowAssignModal}
                    onImageClick={handleImageClick}
                  />
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={filteredReports.length}
        itemLabel="laporan"
      />

      {/* Modals */}
      <ReportDetailModal report={selectedReport} onClose={() => setSelectedReport(null)} />
      <AssignTechnicianModal 
        report={showAssignModal} 
        onClose={() => setShowAssignModal(null)} 
        onAssign={handleAssignTechnician} 
      />
      <ImageGallery
        images={imageGallery}
        currentIndex={currentImageIndex}
        onClose={() => setImageGallery(null)}
        onIndexChange={setCurrentImageIndex}
      />
    </div>
  );
};

export default ReportsList;

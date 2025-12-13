import React, { useState, useEffect } from 'react';
import { Building, Home, Layers, Plus, Edit, Trash2, Box, X, Tag } from 'lucide-react';
import { TableSkeleton } from '../components/SkeletonLoader';

const MasterDataPage = () => {
  const [activeTab, setActiveTab] = useState('buildings');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // Simulate loading on initial load and tab change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Generate 21 dummy buildings
  const generateBuildings = () => {
    const buildings = [];
    const letters = 'ABCDEFGHIJKLMNOPQRSTU';
    for (let i = 0; i < 21; i++) {
      buildings.push({
        id: i + 1,
        code: `GD${letters[i]}`,
        name: `Gedung ${letters[i]}`,
        floors: Math.floor(Math.random() * 5) + 2,
        description: `Gedung untuk ${['Fakultas Teknik', 'Fakultas Ekonomi', 'Fakultas MIPA', 'Administrasi', 'Lab & Penelitian'][i % 5]}`
      });
    }
    return buildings;
  };

  // Generate 21 dummy floors
  const generateFloors = () => {
    const floors = [];
    const gedungs = ['Gedung A', 'Gedung B', 'Gedung C', 'Gedung D', 'Gedung E'];
    for (let i = 0; i < 21; i++) {
      floors.push({
        id: i + 1,
        building: gedungs[i % gedungs.length],
        floor: (i % 5) + 1,
        rooms: Math.floor(Math.random() * 15) + 8
      });
    }
    return floors;
  };

  // Generate 21 dummy rooms
  const generateRooms = () => {
    const rooms = [];
    const gedungs = ['Gedung A', 'Gedung B', 'Gedung C', 'Gedung D', 'Gedung E'];
    const types = ['Kelas', 'Lab', 'Kantor', 'Rapat', 'Aula'];
    for (let i = 0; i < 21; i++) {
      const floor = (i % 5) + 1;
      const roomNum = String(floor) + String(i % 10).padStart(2, '0');
      rooms.push({
        id: i + 1,
        building: gedungs[i % gedungs.length],
        floor: floor,
        room_number: roomNum,
        name: `Ruang ${types[i % types.length]} ${i + 1}`,
        capacity: [20, 30, 40, 50, 60][i % 5],
        type: types[i % types.length]
      });
    }
    return rooms;
  };

  // Generate 21 dummy equipment types
  const generateEquipment = () => {
    const equipment = [];
    const categories = ['Elektronik', 'IT', 'Furniture', 'Pendidikan'];
    const names = ['AC', 'Proyektor', 'Komputer', 'Kursi', 'Meja', 'Papan Tulis', 'Printer', 'Scanner', 'CCTV', 'Speaker', 'Microphone', 'Whiteboard', 'Lemari', 'Kipas Angin', 'Lampu', 'Stop Kontak', 'Kabel', 'Switch', 'Router', 'UPS', 'Stabilizer'];
    for (let i = 0; i < 21; i++) {
      const total = Math.floor(Math.random() * 100) + 20;
      const broken = Math.floor(Math.random() * 15);
      equipment.push({
        id: i + 1,
        name: names[i],
        category: categories[i % categories.length],
        total: total,
        broken: broken
      });
    }
    return equipment;
  };

// Generate 21 dummy categories
const generateCategories = () => {
  const categoriesData = [
    { name: 'Elektronik', description: 'Peralatan elektronik seperti AC, kipas angin, dll' },
    { name: 'IT', description: 'Peralatan teknologi informasi dan komputer' },
    { name: 'Furniture', description: 'Perabotan dan furnitur kantor' },
    { name: 'Pendidikan', description: 'Peralatan pendukung kegiatan belajar mengajar' },
    { name: 'Keamanan', description: 'Peralatan keamanan gedung' },
    { name: 'Kebersihan', description: 'Peralatan kebersihan dan sanitasi' },
    { name: 'Laboratorium', description: 'Peralatan laboratorium dan penelitian' },
    { name: 'Audio Visual', description: 'Peralatan audio visual dan multimedia' },
    { name: 'Jaringan', description: 'Peralatan jaringan dan telekomunikasi' },
    { name: 'Listrik', description: 'Peralatan instalasi listrik' },
    { name: 'Pendingin', description: 'Sistem pendingin dan HVAC' },
    { name: 'Pencahayaan', description: 'Sistem dan peralatan pencahayaan' },
    { name: 'Transportasi', description: 'Peralatan transportasi internal' },
    { name: 'Medis', description: 'Peralatan kesehatan dan medis' },
    { name: 'Olahraga', description: 'Peralatan olahraga dan kebugaran' },
    { name: 'Dapur', description: 'Peralatan dapur dan kantin' },
    { name: 'Cetak', description: 'Mesin cetak dan fotokopi' },
    { name: 'Arsip', description: 'Peralatan penyimpanan dan arsip' },
    { name: 'Presentasi', description: 'Peralatan presentasi dan meeting' },
    { name: 'Taman', description: 'Peralatan pertamanan dan landscape' },
    { name: 'Parkir', description: 'Sistem dan peralatan parkir' },
  ];
  
  return categoriesData.map((cat, i) => ({
    id: i + 1,
    name: cat.name,
    description: cat.description,
    totalEquipment: Math.floor(Math.random() * 50) + 5
  }));
};

  const buildings = generateBuildings();
  const floors = generateFloors();
  const rooms = generateRooms();
  const equipmentTypes = generateEquipment();
  const categories = generateCategories();

  const tabs = [
    { id: 'buildings', name: 'Gedung', icon: Building },
    { id: 'floors', name: 'Lantai', icon: Layers },
    { id: 'rooms', name: 'Ruangan', icon: Home },
    { id: 'equipment', name: 'Jenis Peralatan', icon: Box },
    { id: 'categories', name: 'Kategori', icon: Tag },
  ];

  // Pagination logic
  const getCurrentData = () => {
    let data = [];
    switch (activeTab) {
      case 'buildings': data = buildings; break;
      case 'floors': data = floors; break;
      case 'rooms': data = rooms; break;
      case 'equipment': data = equipmentTypes; break;
      case 'categories': data = categories; break;
      default: data = [];
    }
    return data;
  };

  const currentData = getCurrentData();
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = currentData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdd = (type) => {
    setModalType('add');
    setModalData({});
    setShowModal(true);
  };

  const handleEdit = (type, data) => {
    setModalType('edit');
    setModalData(data);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Data berhasil ${modalType === 'add' ? 'ditambahkan' : 'diupdate'}!`);
    setShowModal(false);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1); // Reset to page 1 when changing tabs
  };

  const renderPagination = () => (
    <div className="mt-4 px-4 py-3 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-sm text-gray-600">
        Menampilkan {startIndex + 1}-{Math.min(endIndex, currentData.length)} dari {currentData.length} data
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded transition ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded transition ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return <span key={page} className="px-2 py-2">...</span>;
          }
          return null;
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded transition ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;

    let modalTitle = '';
    let modalFields = [];

    switch (activeTab) {
      case 'buildings':
        modalTitle = modalType === 'add' ? 'Tambah Gedung' : 'Edit Gedung';
        modalFields = (
          <>
            <div>
              <label className="block text-sm font-semibold mb-2">Kode Gedung</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="Contoh: GDA" defaultValue={modalData.code} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Nama Gedung</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="Contoh: Gedung A" defaultValue={modalData.name} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Jumlah Lantai</label>
              <input type="number" className="w-full border rounded px-3 py-2" placeholder="Contoh: 4" defaultValue={modalData.floors} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Deskripsi</label>
              <textarea className="w-full border rounded px-3 py-2" rows="3" placeholder="Deskripsi gedung..." defaultValue={modalData.description}></textarea>
            </div>
          </>
        );
        break;

      case 'floors':
        modalTitle = modalType === 'add' ? 'Tambah Lantai' : 'Edit Lantai';
        modalFields = (
          <>
            <div>
              <label className="block text-sm font-semibold mb-2">Gedung</label>
              <select className="w-full border rounded px-3 py-2" defaultValue={modalData.building} required>
                <option value="">Pilih Gedung</option>
                {buildings.slice(0, 5).map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Lantai</label>
              <input type="number" className="w-full border rounded px-3 py-2" placeholder="Contoh: 1" defaultValue={modalData.floor} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Jumlah Ruangan</label>
              <input type="number" className="w-full border rounded px-3 py-2" placeholder="Contoh: 12" defaultValue={modalData.rooms} required />
            </div>
          </>
        );
        break;

      case 'rooms':
        modalTitle = modalType === 'add' ? 'Tambah Ruangan' : 'Edit Ruangan';
        modalFields = (
          <>
            <div>
              <label className="block text-sm font-semibold mb-2">Gedung</label>
              <select className="w-full border rounded px-3 py-2" defaultValue={modalData.building} required>
                <option value="">Pilih Gedung</option>
                {buildings.slice(0, 5).map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Lantai</label>
              <input type="number" className="w-full border rounded px-3 py-2" placeholder="Contoh: 1" defaultValue={modalData.floor} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Nomor Ruangan</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="Contoh: 101" defaultValue={modalData.room_number} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Nama Ruangan</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="Contoh: Ruang Kelas 1A" defaultValue={modalData.name} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Kapasitas</label>
              <input type="number" className="w-full border rounded px-3 py-2" placeholder="Contoh: 40" defaultValue={modalData.capacity} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Tipe Ruangan</label>
              <select className="w-full border rounded px-3 py-2" defaultValue={modalData.type} required>
                <option value="">Pilih Tipe</option>
                <option value="Kelas">Kelas</option>
                <option value="Lab">Lab</option>
                <option value="Kantor">Kantor</option>
                <option value="Rapat">Rapat</option>
                <option value="Aula">Aula</option>
              </select>
            </div>
          </>
        );
        break;

      case 'equipment':
        modalTitle = modalType === 'add' ? 'Tambah Jenis Peralatan' : 'Edit Jenis Peralatan';
        modalFields = (
          <>
            <div>
              <label className="block text-sm font-semibold mb-2">Nama Peralatan</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="Contoh: AC" defaultValue={modalData.name} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Kategori</label>
              <select className="w-full border rounded px-3 py-2" defaultValue={modalData.category} required>
                <option value="">Pilih Kategori</option>
                <option value="Elektronik">Elektronik</option>
                <option value="IT">IT</option>
                <option value="Furniture">Furniture</option>
                <option value="Pendidikan">Pendidikan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Total Unit</label>
              <input type="number" className="w-full border rounded px-3 py-2" placeholder="Contoh: 85" defaultValue={modalData.total} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Unit Rusak</label>
              <input type="number" className="w-full border rounded px-3 py-2" placeholder="Contoh: 5" defaultValue={modalData.broken} required />
            </div>
          </>
        );
        break;

      case 'categories':
        modalTitle = modalType === 'add' ? 'Tambah Kategori' : 'Edit Kategori';
        modalFields = (
          <>
            <div>
              <label className="block text-sm font-semibold mb-2">Nama Kategori</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="Contoh: Elektronik" defaultValue={modalData.name} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Deskripsi</label>
              <textarea className="w-full border rounded px-3 py-2" rows="3" placeholder="Deskripsi kategori..." defaultValue={modalData.description}></textarea>
            </div>
          </>
        );
        break;

      default:
        return null;
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">{modalTitle}</h2>
            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {modalFields}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {modalType === 'add' ? 'Tambah' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    // Show skeleton when loading
    if (loading) {
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-9 w-36 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <TableSkeleton rows={10} columns={5} />
        </div>
      );
    }

    switch (activeTab) {
      case 'buildings':
        return (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Daftar Gedung</h2>
              <button 
                onClick={() => handleAdd('building')}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
              >
                <Plus size={16} /> Tambah Gedung
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Kode</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nama Gedung</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Jumlah Lantai</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Deskripsi</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(building => (
                  <tr key={building.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono font-bold text-blue-600">{building.code}</td>
                    <td className="px-4 py-3 font-semibold">{building.name}</td>
                    <td className="px-4 py-3">{building.floors} Lantai</td>
                    <td className="px-4 py-3 text-gray-600">{building.description}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit('building', building)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {renderPagination()}
          </div>
        );

      case 'floors':
        return (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Daftar Lantai</h2>
              <button 
                onClick={() => handleAdd('floor')}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
              >
                <Plus size={16} /> Tambah Lantai
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Gedung</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Lantai</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Jumlah Ruangan</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(floor => (
                  <tr key={floor.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">{floor.building}</td>
                    <td className="px-4 py-3">Lantai {floor.floor}</td>
                    <td className="px-4 py-3">{floor.rooms} Ruangan</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit('floor', floor)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {renderPagination()}
          </div>
        );

      case 'rooms':
        return (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Daftar Ruangan</h2>
              <button 
                onClick={() => handleAdd('room')}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
              >
                <Plus size={16} /> Tambah Ruangan
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Lokasi</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">No. Ruang</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nama</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Kapasitas</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Tipe</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(room => (
                  <tr key={room.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{room.building} - Lt {room.floor}</td>
                    <td className="px-4 py-3 font-mono font-bold text-blue-600">{room.room_number}</td>
                    <td className="px-4 py-3 font-semibold">{room.name}</td>
                    <td className="px-4 py-3">{room.capacity} orang</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        room.type === 'Lab' ? 'bg-purple-100 text-purple-600' :
                        room.type === 'Kelas' ? 'bg-blue-100 text-blue-600' :
                        room.type === 'Kantor' ? 'bg-gray-100 text-gray-600' :
                        room.type === 'Rapat' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {room.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit('room', room)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {renderPagination()}
          </div>
        );

      case 'equipment':
        return (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Jenis Peralatan</h2>
              <button 
                onClick={() => handleAdd('equipment')}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
              >
                <Plus size={16} /> Tambah Jenis
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nama Peralatan</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Kategori</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Total Unit</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Rusak</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(equipment => {
                  const percentage = ((equipment.broken / equipment.total) * 100).toFixed(1);
                  return (
                    <tr key={equipment.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">{equipment.name}</td>
                      <td className="px-4 py-3 text-gray-600">{equipment.category}</td>
                      <td className="px-4 py-3 text-center font-semibold">{equipment.total}</td>
                      <td className="px-4 py-3 text-center text-red-600 font-semibold">{equipment.broken}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                percentage < 5 ? 'bg-green-500' : 
                                percentage < 15 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold">{percentage}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleEdit('equipment', equipment)}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                          >
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {renderPagination()}
          </div>
        );

      case 'categories':
        return (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Daftar Kategori</h2>
              <button 
                onClick={() => handleAdd('category')}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
              >
                <Plus size={16} /> Tambah Kategori
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nama Kategori</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Deskripsi</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Total Peralatan</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(category => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="font-semibold">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{category.description}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm font-semibold">
                        {category.totalEquipment} item
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit('category', category)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {renderPagination()}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Data Master</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={20} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {renderContent()}

      {/* Modal */}
      {renderModal()}
    </div>
  );
};

export default MasterDataPage;


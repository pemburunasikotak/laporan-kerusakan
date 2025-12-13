import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Edit, Trash2, Phone, Mail, Award } from 'lucide-react';
import { CardSkeleton, SummaryCardSkeleton } from '../components/SkeletonLoader';

const TechniciansPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Dummy technicians data
  const dummyTechnicians = [
    { 
      id: 1, 
      name: 'Ahmad Teknisi', 
      phone: '081234567890', 
      email: 'ahmad@example.com',
      specialist: 'Elektronik & AC',
      totalJobs: 45,
      completedJobs: 38,
      activeJobs: 7,
      rating: 4.8,
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Budi Hartono', 
      phone: '081234567891', 
      email: 'budi@example.com',
      specialist: 'Jaringan & IT',
      totalJobs: 52,
      completedJobs: 48,
      activeJobs: 4,
      rating: 4.9,
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Candra Wijaya', 
      phone: '081234567892', 
      email: 'candra@example.com',
      specialist: 'Furniture & Sipil',
      totalJobs: 38,
      completedJobs: 35,
      activeJobs: 3,
      rating: 4.6,
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Dedi Supriyanto', 
      phone: '081234567893', 
      email: 'dedi@example.com',
      specialist: 'Plumbing & Sanitasi',
      totalJobs: 41,
      completedJobs: 39,
      activeJobs: 2,
      rating: 4.7,
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Eko Prasetyo', 
      phone: '081234567894', 
      email: 'eko@example.com',
      specialist: 'Listrik & Panel',
      totalJobs: 35,
      completedJobs: 30,
      activeJobs: 5,
      rating: 4.5,
      status: 'active'
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Data Teknisi</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <UserPlus size={18} /> Tambah Teknisi
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {loading ? (
          <>
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Teknisi</p>
                  <p className="text-3xl font-bold">{dummyTechnicians.length}</p>
                </div>
                <Users className="text-blue-500" size={40} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Aktif Hari Ini</p>
                  <p className="text-3xl font-bold">{dummyTechnicians.filter(t => t.activeJobs > 0).length}</p>
                </div>
                <Award className="text-green-500" size={40} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Pekerjaan</p>
                  <p className="text-3xl font-bold">{dummyTechnicians.reduce((sum, t) => sum + t.totalJobs, 0)}</p>
                </div>
                <Users className="text-yellow-500" size={40} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Rata-rata Rating</p>
                  <p className="text-3xl font-bold">{(dummyTechnicians.reduce((sum, t) => sum + t.rating, 0) / dummyTechnicians.length).toFixed(1)}</p>
                </div>
                <Award className="text-purple-500" size={40} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          dummyTechnicians.map((tech) => (
            <div key={tech.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {tech.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{tech.name}</h3>
                    <p className="text-sm text-gray-500">{tech.specialist}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-red-600 hover:bg-red-100 rounded transition" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span>{tech.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  <span>{tech.email}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="font-bold text-lg">{tech.totalJobs}</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <p className="text-xs text-gray-500">Selesai</p>
                  <p className="font-bold text-lg text-green-600">{tech.completedJobs}</p>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded">
                  <p className="text-xs text-gray-500">Aktif</p>
                  <p className="font-bold text-lg text-yellow-600">{tech.activeJobs}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className={`text-xl ${idx < Math.floor(tech.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm font-semibold">{tech.rating.toFixed(1)}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  tech.activeJobs > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tech.activeJobs > 0 ? 'Sedang Bekerja' : 'Tersedia'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal (Simple placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Tambah Teknisi Baru</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Nama lengkap" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">No. Telepon</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="08xxxxxxxxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full border rounded px-3 py-2" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Spesialisasi</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Contoh: Elektronik & AC" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border rounded hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  alert('Fitur simpan akan terintegrasi dengan backend');
                  setShowAddModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechniciansPage;

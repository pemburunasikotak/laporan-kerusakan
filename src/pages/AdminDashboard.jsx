import React, { useEffect, useState } from 'react';
import useReportStore from '../store/reportStore';
import { RefreshCcw, UserPlus } from 'lucide-react';

const AdminDashboard = () => {
  const { reports, technicians, fetchReports, fetchTechnicians, assignTechnician, loading } = useReportStore();
  const [selectedTech, setSelectedTech] = useState({});

  // useEffect(() => {
  //   fetchReports();
  //   fetchTechnicians();
  // }, []);

  const handleAssign = async (reportId) => {
    const techId = selectedTech[reportId];
    if (!techId) return alert('Pilih teknisi dulu');
    await assignTechnician(reportId, techId);
    alert('Berhasil assign teknisi');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={fetchReports} className="flex items-center gap-2 bg-slate-200 p-2 rounded hover:bg-slate-300">
          <RefreshCcw size={18} /> Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
          <div className="text-gray-500">Laporan Baru</div>
          <div className="text-2xl font-bold">{reports.filter(r => r.status === 'PENDING').length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-500">
          <div className="text-gray-500">Sedang Proses</div>
          <div className="text-2xl font-bold">{reports.filter(r => ['ASSIGNED', 'IN_PROGRESS', 'WAITING_PART'].includes(r.status)).length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
          <div className="text-gray-500">Selesai</div>
          <div className="text-2xl font-bold">{reports.filter(r => r.status === 'COMPLETED').length}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="p-4">Ticket ID</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4">Lokasi</th>
              <th className="p-4">Pelapor</th>
              <th className="p-4">Status</th>
              <th className="p-4">Teknisi</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="7" className="p-4 text-center">Loading...</td></tr> : reports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-mono text-sm">{report.ticket_id || `#${report.id}`}</td>
                <td className="p-4">{report.description}</td>
                <td className="p-4">{report.location}</td>
                <td className="p-4">{report.reporter_phone}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold 
                    ${report.status === 'PENDING' ? 'bg-red-100 text-red-600' : 
                      report.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {report.status}
                  </span>
                </td>
                <td className="p-4">
                  {report.Technician ? report.Technician.name : '-'}
                </td>
                <td className="p-4">
                  {report.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <select 
                        className="border rounded p-1 text-sm"
                        onChange={(e) => setSelectedTech({...selectedTech, [report.id]: e.target.value})}
                      >
                        <option value="">Pilih Teknisi</option>
                        {technicians.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => handleAssign(report.id)}
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                        title="Assign"
                      >
                        <UserPlus size={18} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {reports.length === 0 && !loading && (
              <tr><td colSpan="7" className="p-4 text-center text-gray-500">Tidak ada data laporan.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

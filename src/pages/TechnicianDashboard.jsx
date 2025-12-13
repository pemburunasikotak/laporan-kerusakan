import React, { useEffect } from 'react';
import useReportStore from '../store/reportStore';
import useAuthStore from '../store/authStore';

const TechnicianDashboard = () => {
  const { reports, fetchReports, updateStatus, loading } = useReportStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchReports();
  }, []);

  // Filter reports assigned to this technician
  const myReports = reports.filter(r => r.technician_id === user.id || (r.Technician && r.Technician.id === user.id));

  const handleStatusChange = async (id, newStatus) => {
    if (window.confirm(`Ubah status menjadi ${newStatus}?`)) {
      await updateStatus(id, newStatus);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tugas Saya</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myReports.map((report) => (
          <div key={report.id} className="bg-white rounded shadow p-6 border-t-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-gray-500">#{report.id}</span>
              <span className={`px-2 py-1 rounded text-xs font-bold 
                    ${report.status === 'PENDING' ? 'bg-red-100 text-red-600' : 
                      report.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                {report.status}
              </span>
            </div>
            
            <h3 className="font-bold text-lg mb-2">{report.description}</h3>
            
            <div className="text-sm text-gray-600 mb-4 space-y-1">
              <p>📍 {report.location}</p>
              <p>👤 {report.reporter_phone}</p>
            </div>

            <div className="pt-4 border-t flex flex-wrap gap-2">
              {report.status !== 'COMPLETED' && (
                <>
                  <button 
                    onClick={() => handleStatusChange(report.id, 'IN_PROGRESS')}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200"
                  >
                    Proses
                  </button>
                  <button 
                    onClick={() => handleStatusChange(report.id, 'WAITING_PART')}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm hover:bg-yellow-200"
                  >
                    Tunggu Part
                  </button>
                  <button 
                    onClick={() => handleStatusChange(report.id, 'COMPLETED')}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200"
                  >
                    Selesai
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        
        {myReports.length === 0 && !loading && (
          <div className="col-span-3 text-center py-10 text-gray-500">
            Tidak ada tugas aktif.
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianDashboard;

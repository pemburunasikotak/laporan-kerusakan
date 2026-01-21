import React from 'react';
import DataTable from '../shared/DataTable';

const EquipmentTable = ({ data, loading, onEdit, onDelete, onAdd }) => {
  const columns = [
    {
      key: 'name',
      label: 'Nama Peralatan',
      className: 'font-semibold'
    },
    {
      key: 'category',
      label: 'Kategori',
      className: 'text-gray-600'
    },
    {
      key: 'specification',
      label: 'Spesifikasi',
      className: 'font-semibold',
      align: 'center'
    },
    {
      key: 'procurement_year',
      label: 'Tahun Pengadaan ',
      className: 'text-red-600 font-semibold',
      align: 'center'
    },
    // {
    //   key: 'status',
    //   label: 'Status',
    //   align: 'center',
    //   render: (row) => {
    //     const percentage = ((row.broken / row.total) * 100).toFixed(1);
    //     return (
    //       <div className="flex items-center justify-center gap-2">
    //         <div className="w-24 bg-gray-200 rounded-full h-2">
    //           <div
    //             className={`h-2 rounded-full ${
    //               percentage < 5
    //                 ? 'bg-green-500'
    //                 : percentage < 15
    //                 ? 'bg-yellow-500'
    //                 : 'bg-red-500'
    //             }`}
    //             style={{ width: `${percentage}%` }}
    //           ></div>
    //         </div>
    //         <span className="text-xs font-semibold">{percentage}%</span>
    //       </div>
    //     );
    //   }
    // }
  ];

  return (
    <div>
      <div className="bg-white rounded-t-lg shadow-md p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Jenis Peralatan</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          <span>+</span> Tambah Jenis
        </button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default EquipmentTable;

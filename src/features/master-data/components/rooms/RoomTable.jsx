import React from 'react';
import DataTable from '../shared/DataTable';

const RoomTable = ({ data, loading, onEdit, onDelete, onAdd }) => {
  const columns = [
    {
      key: 'location',
      label: 'Lokasi',
      className: 'text-sm text-gray-600',
      render: (row) => `${row?.floor?.building?.name || '-'} - Lt ${row?.floor?.floor_number || '-'}`
    },
    {
      key: 'code',
      label: 'No. Ruang',
      className: 'font-mono font-bold text-blue-600',
      render: (row) => row?.code || '-'
    },
    {
      key: 'name',
      label: 'Nama Ruangan',
      className: 'font-semibold',
      render: (row) => row?.name || '-'
    }
  ];

  return (
    <div>
      <div className="bg-white rounded-t-lg shadow-md p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Daftar Ruangan</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          <span>+</span> Tambah Ruangan
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

export default RoomTable;

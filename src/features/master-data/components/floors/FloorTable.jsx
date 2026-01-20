import React from 'react';
import DataTable from '../shared/DataTable';

const FloorTable = ({ data, loading, onEdit, onDelete, onAdd }) => {
  const columns = [
    {
      key: 'building',
      label: 'Gedung',
      className: 'font-semibold',
      render: (row) => row.building?.name || row.building_id
    },
    {
      key: 'floor_number',
      label: 'Nomor Lantai',
      render: (row) => `Lantai ${row.floor_number}`
    },
    {
      key: 'name',
      label: 'Nama Lantai',
      render: (row) => row.name || '-'
    }
  ];

  return (
    <div>
      <div className="bg-white rounded-t-lg shadow-md p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Daftar Lantai</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          <span>+</span> Tambah Lantai
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

export default FloorTable;

import React from 'react';
import DataTable from '../shared/DataTable';

/**
 * Building-specific table component
 */
const BuildingTable = ({ data, loading, onEdit, onDelete, onAdd }) => {
  const columns = [
    {
      key: 'code',
      label: 'Kode',
      className: 'font-mono font-bold text-blue-600'
    },
    {
      key: 'name',
      label: 'Nama Gedung',
      className: 'font-semibold'
    },
    {
      key: 'location',
      label: 'Lokasi',
      className: 'text-gray-600'
    }
  ];

  return (
    <div>
      {/* Header with Add Button */}
      <div className="bg-white rounded-t-lg shadow-md p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Daftar Gedung</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          <span>+</span> Tambah Gedung
        </button>
      </div>

      {/* Data Table */}
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

export default BuildingTable;

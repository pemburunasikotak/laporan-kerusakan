import React from 'react';
import DataTable from '../shared/DataTable';
import { formatEpochTime } from '../../../../utils/timeUtils';

const CategoryTable = ({ data, loading, onEdit, onDelete, onAdd }) => {
  const columns = [
    {
      key: 'id',
      label: 'ID'
    },
    {
      key: 'code',
      label: 'Code'
    },
    {
      key: 'name',
      label: 'Nama Kategori',
      className: 'font-semibold',
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span>{row.name}</span>
        </div>
      )
    },
    {
      key: 'description',
      label: 'Deskripsi',
      className: 'text-gray-600'
    },
    {
      key: 'created_at',
      label: 'Created At',
      className: 'text-gray-600 text-sm',
      align: 'center',
      render: (row) => formatEpochTime(row.created_at)
    },
    {
      key: 'updated_at',
      label: 'Updated At',
      className: 'text-gray-600 text-sm',
      align: 'center',
      render: (row) => formatEpochTime(row.updated_at)
    }
  ];

  return (
    <div>
      <div className="bg-white rounded-t-lg shadow-md p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Daftar Kategori</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          <span>+</span> Tambah Kategori
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

export default CategoryTable;

import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

/**
 * Reusable DataTable component for displaying tabular data
 * @param {Object} props
 * @param {Array} props.columns - Array of column definitions [{key, label, render}]
 * @param {Array} props.data - Array of data objects
 * @param {Function} props.onEdit - Callback when edit button clicked
 * @param {Function} props.onDelete - Callback when delete button clicked
 * @param {Boolean} props.loading - Loading state
 */
const DataTable = ({ columns, data, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-sm font-semibold ${
                  column.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {column.label}
              </th>
            ))}
            <th className="px-4 py-3 text-center text-sm font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-3 ${column.className || ''} ${
                    column.align === 'center' ? 'text-center' : ''
                  }`}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded transition"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(row.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded transition"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

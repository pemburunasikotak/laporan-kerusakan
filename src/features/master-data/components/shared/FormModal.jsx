import React from 'react';
import { X } from 'lucide-react';

/**
 * Reusable FormModal component for dialogs
 * @param {Object} props
 * @param {Boolean} props.isOpen - Modal visibility state
 * @param {String} props.title - Modal title
 * @param {Function} props.onClose - Callback when modal closed
 * @param {Function} props.onSubmit - Callback when form submitted
 * @param {ReactNode} props.children - Form fields content
 * @param {Boolean} props.submitting - Submit loading state
 */
const FormModal = ({ isOpen, title, onClose, onSubmit, children, submitting }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            disabled={submitting}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {children}

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
              disabled={submitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Loading...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;

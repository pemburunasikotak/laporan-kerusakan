import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable Status Badge Component
 */
export const StatusBadge = ({ status, config }) => {
  const statusInfo = config[status] || { label: status, color: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusInfo.color}`}>
      {statusInfo.label}
    </span>
  );
};

/**
 * Reusable Stat Filter Button
 */
export const StatFilterButton = ({ 
  label, 
  count, 
  isActive, 
  onClick, 
  activeColor = 'gray',
  baseColor = 'gray'
}) => {
  const colorMap = {
    gray: { active: 'bg-gray-200 ring-2 ring-gray-500', base: 'bg-gray-100 hover:bg-gray-200' },
    red: { active: 'bg-red-200 ring-2 ring-red-500', base: 'bg-red-100 hover:bg-red-200' },
    yellow: { active: 'bg-yellow-200 ring-2 ring-yellow-500', base: 'bg-yellow-100 hover:bg-yellow-200' },
    purple: { active: 'bg-purple-200 ring-2 ring-purple-500', base: 'bg-purple-100 hover:bg-purple-200' },
    green: { active: 'bg-green-200 ring-2 ring-green-500', base: 'bg-green-100 hover:bg-green-200' },
    blue: { active: 'bg-blue-200 ring-2 ring-blue-500', base: 'bg-blue-100 hover:bg-blue-200' },
  };

  const colors = colorMap[activeColor] || colorMap.gray;
  
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg text-center transition-all hover:shadow-lg ${
        isActive ? colors.active : colors.base
      }`}
    >
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </button>
  );
};

/**
 * Reusable Pagination Component
 */
export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  startIndex, 
  endIndex, 
  totalItems, 
  itemLabel = 'item' 
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-sm text-gray-600">
        Menampilkan {startIndex + 1}-{Math.min(endIndex, totalItems)} dari {totalItems} {itemLabel}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded transition ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded transition ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return <span key={page} className="px-2 py-2">...</span>;
          }
          return null;
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded transition ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

/**
 * Reusable Modal Component
 */
export const Modal = ({ isOpen, onClose, title, children, footer, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg ${maxWidth} w-full max-h-[90vh] overflow-y-auto`}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>

        {footer && (
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Reusable Image Gallery Modal
 */
export const ImageGallery = ({ images, currentIndex, onClose, onIndexChange }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/50 p-2 rounded-full"
      >
        <X size={32} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={() => onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
            className="absolute left-4 text-white hover:text-gray-300 bg-black/50 p-3 rounded-full"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={() => onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
            className="absolute right-4 text-white hover:text-gray-300 bg-black/50 p-3 rounded-full"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      <div className="max-w-4xl max-h-[80vh] flex flex-col items-center">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
        />
        
        <div className="mt-4 bg-black/50 text-white px-4 py-2 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto max-w-full">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => onIndexChange(idx)}
                className={`w-16 h-16 rounded border-2 overflow-hidden cursor-pointer transition ${
                  idx === currentIndex ? 'border-blue-500' : 'border-white/50 hover:border-white'
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Reusable Summary Card with Icon
 */
export const SummaryCard = ({ title, value, icon: Icon, borderColor = 'blue' }) => {
  const borderColors = {
    blue: 'border-blue-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    gray: 'border-gray-500',
  };

  const iconColors = {
    blue: 'text-blue-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    gray: 'text-gray-500',
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${borderColors[borderColor]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        {Icon && <Icon className={iconColors[borderColor]} size={40} />}
      </div>
    </div>
  );
};

/**
 * Reusable Page Header
 */
export const PageHeader = ({ title, children }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold">{title}</h1>
    {children}
  </div>
);

/**
 * Reusable Action Button
 */
export const ActionButton = ({ onClick, icon: Icon, children, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 hover:bg-gray-100',
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded transition ${variants[variant]}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

/**
 * Reusable Empty State
 */
export const EmptyState = ({ message = 'Tidak ada data ditemukan.' }) => (
  <div className="text-center py-8 text-gray-500">
    {message}
  </div>
);

/**
 * Reusable Info Row with Icon
 */
export const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2">
    {Icon && <Icon className="text-gray-500 mt-1" size={20} />}
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-base">{value}</p>
    </div>
  </div>
);

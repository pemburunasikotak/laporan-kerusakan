import React from 'react';

// Base skeleton with pulse animation
const SkeletonBase = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

// Card skeleton for technician cards
export const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    {/* Header with avatar and name */}
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <SkeletonBase className="w-12 h-12 rounded-full" />
        <div>
          <SkeletonBase className="h-5 w-32 mb-2" />
          <SkeletonBase className="h-4 w-24" />
        </div>
      </div>
      <div className="flex gap-1">
        <SkeletonBase className="w-6 h-6" />
        <SkeletonBase className="w-6 h-6" />
      </div>
    </div>

    {/* Contact info */}
    <div className="space-y-2 mb-4">
      <div className="flex items-center gap-2">
        <SkeletonBase className="w-4 h-4" />
        <SkeletonBase className="h-4 w-28" />
      </div>
      <div className="flex items-center gap-2">
        <SkeletonBase className="w-4 h-4" />
        <SkeletonBase className="h-4 w-36" />
      </div>
    </div>

    {/* Stats grid */}
    <div className="grid grid-cols-3 gap-3 mb-4">
      <div className="text-center p-2 bg-gray-50 rounded">
        <SkeletonBase className="h-3 w-10 mx-auto mb-1" />
        <SkeletonBase className="h-6 w-8 mx-auto" />
      </div>
      <div className="text-center p-2 bg-gray-50 rounded">
        <SkeletonBase className="h-3 w-10 mx-auto mb-1" />
        <SkeletonBase className="h-6 w-8 mx-auto" />
      </div>
      <div className="text-center p-2 bg-gray-50 rounded">
        <SkeletonBase className="h-3 w-10 mx-auto mb-1" />
        <SkeletonBase className="h-6 w-8 mx-auto" />
      </div>
    </div>

    {/* Rating */}
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <SkeletonBase key={i} className="w-5 h-5" />
        ))}
        <SkeletonBase className="h-4 w-8 ml-2" />
      </div>
      <SkeletonBase className="h-6 w-24 rounded" />
    </div>
  </div>
);

// Table skeleton
export const TableSkeleton = ({ rows = 5, columns = 5 }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-100 border-b">
        <tr>
          {[...Array(columns)].map((_, i) => (
            <th key={i} className="px-4 py-3">
              <SkeletonBase className="h-4 w-20" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, rowIdx) => (
          <tr key={rowIdx} className="border-b">
            {[...Array(columns)].map((_, colIdx) => (
              <td key={colIdx} className="px-4 py-3">
                <SkeletonBase className="h-4 w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Summary card skeleton
export const SummaryCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <SkeletonBase className="h-4 w-24 mb-2" />
        <SkeletonBase className="h-8 w-16" />
      </div>
      <SkeletonBase className="w-10 h-10 rounded" />
    </div>
  </div>
);

export default { CardSkeleton, TableSkeleton, SummaryCardSkeleton };

import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300" />
      <div className="p-5">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;

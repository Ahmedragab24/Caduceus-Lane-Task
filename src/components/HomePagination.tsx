import React from "react";

const HomePagination: React.FC = () => {
  // Placeholder pagination component
  return (
    <div className="flex justify-end mt-6 gap-2 text-sm font-medium">
      <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 cursor-pointer">
        Previous
      </button>
      <button className="px-3 py-1 bg-[#1e2b58] text-white rounded cursor-pointer">
        1
      </button>
      <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 cursor-pointer">
        2
      </button>
      <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 cursor-pointer">
        3
      </button>
      <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 cursor-pointer">
        &raquo;
      </button>
      <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 cursor-pointer">
        Next
      </button>
    </div>
  );
};

export default HomePagination;

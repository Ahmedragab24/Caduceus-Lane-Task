import React from "react";
import { FaEdit } from "react-icons/fa";

export interface SlideData {
  id: number;
  name: string;
  type: string;
  status: string;
}

interface HomeTableProps {
  slides: SlideData[];
  onSlideClick: (id: number) => void;
}

const SlidersTable: React.FC<HomeTableProps> = ({ slides, onSlideClick }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-white bg-[#1e2b58]">
            <th className="p-4 rounded-l-lg font-medium w-2/5">slide Name</th>
            <th className="p-4 font-medium w-1/5">type</th>
            <th className="p-4 font-medium w-1/5">Status</th>
            <th className="p-4 rounded-r-lg font-medium w-1/5 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {slides.map((slide) => (
            <tr
              key={slide.id}
              className="bg-[#f8f9fa] group cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSlideClick(slide.id)}
            >
              <td className="p-4 rounded-l-lg text-gray-700">{slide.name}</td>
              <td className="p-4 text-gray-500 capitalize">{slide.type}</td>
              <td className="p-4 text-gray-500">{slide.status}</td>
              <td className="p-4 rounded-r-lg text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent double navigation since row is clickable
                    onSlideClick(slide.id);
                  }}
                  className="text-gray-400 hover:text-[#d79d32] transition-colors p-2 cursor-pointer"
                  title="Edit"
                >
                  <FaEdit size={22} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SlidersTable;

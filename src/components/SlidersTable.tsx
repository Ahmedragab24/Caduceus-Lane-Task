import React from "react";
import CustomImage from "./ui/Image";

export interface SlideData {
  id: number;
  name: string;
  type: string;
  status: string;
}

interface SlidersTableProps {
  slides: SlideData[];
  onSlideClick: (id: number) => void;
}

const columns = [
  { key: "name", label: "slide Name", width: "w-2/5" },
  { key: "type", label: "type", width: "w-1/5" },
  { key: "status", label: "Status", width: "w-1/5" },
  { key: "actions", label: "Actions", width: "w-1/5" },
] as const;

const SlidersTable: React.FC<SlidersTableProps> = ({
  slides,
  onSlideClick,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-x-2 border-spacing-y-2">
        <thead>
          <tr className="text-left text-white">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-5 py-4 rounded-lg bg-primary text-white font-medium ${col.width}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slides.map((slide) => (
            <tr
              key={slide.id}
              className="group cursor-pointer transition-colors"
              onClick={() => onSlideClick(slide.id)}
            >
              {(["name", "type", "status"] as const).map((key) => (
                <td
                  key={key}
                  className={`px-5 py-4 rounded-lg bg-card group-hover:bg-muted text-foreground transition-colors ${
                    key === "name"
                      ? "font-medium"
                      : key === "type"
                        ? "capitalize"
                        : ""
                  }`}
                >
                  {slide[key]}
                </td>
              ))}
              <td className="px-5 py-2 rounded-lg bg-card group-hover:bg-muted transition-colors">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSlideClick(slide.id);
                  }}
                  className="text-foreground hover:text-secondary transition-colors p-2 cursor-pointer flex justify-center items-center w-full"
                  title="Edit"
                >
                  <CustomImage
                    src="/Icons/edit.svg"
                    alt="Edit"
                    width={16}
                    height={16}
                    className="w-6! h-6!"
                  />
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

import React from "react";

const SlidersPagination: React.FC = () => {
  // Placeholder pagination component
  return (
    <div className="flex justify-end mt-6 gap-2 text-sm font-medium">
      <button className="px-3 py-1 bg-muted text-foreground rounded hover:bg-border transition-colors cursor-pointer">
        Previous
      </button>
      <button className="px-3 py-1 bg-primary text-white rounded cursor-pointer">
        1
      </button>
      <button className="px-3 py-1 bg-muted text-foreground rounded hover:bg-border transition-colors cursor-pointer">
        2
      </button>
      <button className="px-3 py-1 bg-muted text-foreground rounded hover:bg-border transition-colors cursor-pointer">
        3
      </button>
      <button className="px-3 py-1 bg-muted text-foreground rounded hover:bg-border transition-colors cursor-pointer">
        &raquo;
      </button>
      <button className="px-3 py-1 bg-muted text-foreground rounded hover:bg-border transition-colors cursor-pointer">
        Next
      </button>
    </div>
  );
};

export default SlidersPagination;

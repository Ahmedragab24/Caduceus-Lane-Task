import React from "react";
import Button from "./ui/Button";
import CustomImage from "./ui/Image";

interface SlidersSearchProps {
  searchIconSrc: string;
}

const SlidersSearch: React.FC<SlidersSearchProps> = ({ searchIconSrc }) => {
  return (
    <div className="bg-card rounded-xl p-6 mb-12 flex flex-col md:flex-row gap-6 items-end">
      <div className="flex-1 w-full">
        <label className="block text-primary font-bold text-sm mb-2">
          Slide Name
        </label>
        <input
          type="text"
          placeholder="Brand Name"
          className="bg-background text-foreground w-full p-4 rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-secondary h-12"
        />
      </div>

      <Button
        type="button"
        variant="secondary"
        disabled={false}
        className="px-20 py-4 min-w-[200px] h-12 text-xl font-normal!"
      >
        <CustomImage src={searchIconSrc} className="mr-2" /> Search
      </Button>
    </div>
  );
};

export default SlidersSearch;

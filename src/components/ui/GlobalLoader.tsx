import React from "react";
import { useAppSelector } from "../../store/hooks";

const GlobalLoader: React.FC = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/20 backdrop-blur-[2px] animate-fade-in">
      <div className="bg-background border border-border p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-scale-in">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary font-bold text-sm tracking-widest animate-pulse">
          LOADING...
        </p>
      </div>
    </div>
  );
};

export default GlobalLoader;

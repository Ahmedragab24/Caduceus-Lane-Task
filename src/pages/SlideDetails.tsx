import { useEffect, useState } from "react";
import LeftPanel from "../components/Editor/LeftPanel";
import Canvas from "../components/Editor/Canvas";
import RightPanel from "../components/Editor/RightPanel";
import { useAppDispatch } from "../store/hooks";
import { setActiveSlide } from "../store/slices/editorSlice";
import { useParams } from "react-router-dom";

const SlideDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // Only set the active slide from the URL on initial mount.
  useEffect(() => {
    if (id) dispatch(setActiveSlide(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="absolute inset-0 flex flex-col bg-background overflow-hidden animate-fade-in-up">
      {/* ── Mobile Header Actions ── */}
      <div className="md:hidden flex items-center justify-between p-3 bg-background border-b border-border z-10 shrink-0">
        <button
          onClick={() => setShowLeft(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-border rounded-lg text-sm font-semibold transition-colors text-foreground"
        >
          Elements
        </button>
        <button
          onClick={() => setShowRight(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-border rounded-lg text-sm font-semibold transition-colors text-foreground"
        >
          Slides
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* ── Left Panel (Drawer on Mobile) ── */}
        <div
          className={`absolute md:relative top-0 left-0 h-full w-[85%] max-w-[320px] md:w-auto md:max-w-none transition-transform duration-300 z-40 bg-background shadow-2xl md:shadow-none animate-fade-in-up delay-100 flex md:shrink-0 ${
            showLeft ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <LeftPanel />
        </div>

        {/* Backdrop for Left Panel */}
        {showLeft && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setShowLeft(false)}
          />
        )}

        {/* ── Center Canvas ── */}
        <div className="animate-scale-in delay-200 flex-1 min-w-0 flex flex-col">
          <Canvas />
        </div>

        {/* Backdrop for Right Panel */}
        {showRight && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setShowRight(false)}
          />
        )}

        {/* ── Right Panel (Drawer on Mobile) ── */}
        <div
          className={`absolute md:relative top-0 right-0 h-full w-[85%] max-w-[300px] md:w-auto md:max-w-none transition-transform duration-300 z-40 bg-background shadow-2xl md:shadow-none animate-fade-in-up delay-300 flex md:shrink-0 ${
            showRight ? "translate-x-0" : "translate-x-full md:translate-x-0"
          }`}
        >
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default SlideDetails;

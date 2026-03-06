import React from "react";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateSlide as setSlideBackground } from "../../store/slices/slidesSlice";

interface SlidePreviewDialogProps {
  imageUrl: string;
  onClose: () => void;
}

const SlidePreviewDialog: React.FC<SlidePreviewDialogProps> = ({
  imageUrl,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const activeSlideId = useAppSelector((s) => s.editor.activeSlideId);

  const handleSetBackground = () => {
    if (activeSlideId) {
      dispatch(
        setSlideBackground({
          id: activeSlideId,
          updates: { backgroundUrl: imageUrl },
        }),
      );
    }
    onClose();
  };

  const dialogContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-card rounded-3xl shadow-2xl p-5 w-full max-w-2xl h-auto border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-primary font-extrabold text-xl text-center mb-4">
          Preview screenshot
        </h2>

        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={imageUrl}
            alt="Slide preview"
            className="w-full object-cover rounded-2xl"
            style={{ maxHeight: 300 }}
          />

          <button
            onClick={handleSetBackground}
            title="Set as Background"
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/40 flex items-center justify-center transition-colors shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white drop-shadow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

export default SlidePreviewDialog;

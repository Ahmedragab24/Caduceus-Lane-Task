import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setActiveSlide } from "../../store/slices/editorSlice";
import { updateSlide } from "../../store/slices/slidesSlice";
import SlidePreviewDialog from "./SlidePreviewDialog";

const RightPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: slides } = useAppSelector((state) => state.slides);
  const { activeSlideId } = useAppSelector((state) => state.editor);
  const [search, setSearch] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // The backgroundUrl currently applied to the active slide's canvas
  const activeSlide = slides.find((s) => s.id === activeSlideId);
  const currentBgUrl = activeSlide?.backgroundUrl ?? null;

  const filteredSlides = slides.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="w-full md:w-[260px] md:min-w-[260px] bg-background border-t md:border-t-0 md:border-l border-border flex flex-col md:h-full">
        {/* ── Header / Search ── */}
        <div className="px-4 pt-5 pb-3 shrink-0">
          <h3 className="text-primary font-bold text-base mb-3">Slide Name</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Slide name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-9 text-foreground! px-3 text-xs rounded-lg border border-border bg-muted focus:outline-none focus:ring-1 focus:ring-secondary/50"
            />
            <button className="w-9 h-9 flex items-center justify-center bg-secondary hover:bg-secondary-hover rounded-lg transition-colors shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Scrollable slide list ── */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 flex flex-col gap-4">
          {filteredSlides.map((slide, index) => {
            const isActive = activeSlideId === slide.id;
            const num = String(index + 1).padStart(2, "0");
            // Is this slide's thumbnail the current canvas background?
            const isCurrentBg =
              !!currentBgUrl && slide.thumbnailUrl === currentBgUrl;

            return (
              <div
                key={slide.id}
                className={`rounded-xl p-2 transition-colors ${
                  isCurrentBg
                    ? "bg-primary/20 shadow-inner"
                    : isActive
                      ? "bg-muted"
                      : "hover:bg-muted/40"
                }`}
              >
                {/* Slide name — editable */}
                <input
                  value={slide.name}
                  onChange={(e) =>
                    dispatch(
                      updateSlide({
                        id: slide.id,
                        updates: { name: e.target.value },
                      }),
                    )
                  }
                  className="block w-[100px]! text-xs font-semibold text-primary mb-1.5 bg-transparent outline-none truncate cursor-text"
                />

                {/* Thumbnail row: image + number badge to the RIGHT */}
                <div className="flex items-center gap-2">
                  {/* Thumbnail with hover overlay */}
                  <div
                    className={`relative flex-1 rounded-xl overflow-hidden border-2 transition-all duration-200 group cursor-pointer ${
                      isCurrentBg
                        ? "border-secondary shadow-lg"
                        : isActive
                          ? "border-primary/40 shadow-md"
                          : "border-transparent hover:border-border"
                    }`}
                    onClick={() => dispatch(setActiveSlide(slide.id))}
                  >
                    {slide.thumbnailUrl ? (
                      <img
                        src={slide.thumbnailUrl}
                        alt={slide.name}
                        className="w-full h-[88px] object-cover"
                      />
                    ) : (
                      <div className="w-full h-[88px] bg-muted flex items-center justify-center text-foreground/40 text-xs">
                        Empty
                      </div>
                    )}

                    {/* Gold "BG" badge — shows which image is the current canvas background */}
                    {isCurrentBg && (
                      <span className="absolute top-1.5 left-1.5 bg-secondary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow">
                        BG
                      </span>
                    )}

                    {/* Hover overlay — View Slide + Set as Background */}
                    {slide.thumbnailUrl && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                        {/* View Slide — opens preview dialog */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewUrl(slide.thumbnailUrl!);
                          }}
                          className="w-full text-white text-[9px] font-semibold bg-primary/80 hover:bg-primary rounded px-2 py-1 transition-colors"
                        >
                          View Slide
                        </button>

                        {/* Set as Background */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeSlideId && slide.thumbnailUrl) {
                              dispatch(
                                updateSlide({
                                  id: activeSlideId,
                                  updates: {
                                    backgroundUrl: slide.thumbnailUrl,
                                  },
                                }),
                              );
                            }
                          }}
                          className="w-full text-white text-[9px] font-semibold bg-secondary/90 hover:bg-secondary rounded px-2 py-1 transition-colors"
                        >
                          Set as Background
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Number badge — outside thumbnail to the RIGHT */}
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shadow-sm shrink-0 border border-border/10">
                    <span className="text-[10px] font-bold text-foreground/60">
                      {num}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Image Preview Dialog (separate component) ── */}
      {previewUrl && (
        <SlidePreviewDialog
          imageUrl={previewUrl}
          onClose={() => setPreviewUrl(null)}
        />
      )}
    </>
  );
};

export default RightPanel;

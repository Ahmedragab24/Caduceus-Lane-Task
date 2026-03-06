import React, { useRef, useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setLoading, addToast } from "../../store/slices/appSlice";
import { copyToClipboard } from "../../store/slices/clipboardSlice";
import { clearSelection, selectElement } from "../../store/slices/editorSlice";
import { updateSlide } from "../../store/slices/slidesSlice";
import {
  addElement,
  updateElement,
  deleteElement,
} from "../../store/slices/elementsSlice";
import { SlideElement } from "../../types/editor";
import { FaCopy, FaPaste, FaTrash } from "react-icons/fa";
import Button from "../ui/Button";
import CustomImage from "../ui/Image";

const Canvas: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: slides } = useAppSelector((state) => state.slides);
  const { activeSlideId: activeSlideIdFromState, selectedElementId } =
    useAppSelector((state) => state.editor);
  const { element: clipboardElement } = useAppSelector(
    (state) => state.clipboard,
  );
  const elementsById = useAppSelector((state) => state.elements.byId);
  const elementIds = useAppSelector((state) => state.elements.allIds);

  const activeSlide =
    slides.find((s) => s.id === activeSlideIdFromState) || slides[0];
  const activeElements = elementIds
    .map((id) => elementsById[id])
    .filter(Boolean);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const [contextMenu, setContextMenu] = React.useState<{
    x: number;
    y: number;
    elementId: string;
  } | null>(null);

  // Auto-scale the canvas to fit the container
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const scaleX = (width - 32) / 760;
      const scaleY = (height - 32) / 428;
      const newScale = Math.min(scaleX, scaleY);
      setScale(Math.max(0.2, newScale));
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Keyboard Shortcuts (Copy, Paste, Delete) ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedElementId) {
        if ((e.ctrlKey || e.metaKey) && e.key === "v" && clipboardElement) {
          dispatch(
            addElement({
              ...clipboardElement,
              x: (clipboardElement.x as number) + 20,
              y: (clipboardElement.y as number) + 20,
            }),
          );
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        const el = elementsById[selectedElementId];
        if (el) dispatch(copyToClipboard(el));
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "v" && clipboardElement) {
        dispatch(
          addElement({
            ...clipboardElement,
            x: (clipboardElement.x as number) + 20,
            y: (clipboardElement.y as number) + 20,
          }),
        );
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        dispatch(deleteElement(selectedElementId));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedElementId, clipboardElement, elementsById, dispatch]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || e.target === containerRef.current) {
      dispatch(clearSelection());
      setContextMenu(null);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(selectElement(elementId));

    const rect = containerRef.current?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : e.clientX;
    const y = rect ? e.clientY - rect.top : e.clientY;

    setContextMenu({ x, y, elementId });
  };

  const handleCopy = (elementId: string) => {
    const el = elementsById[elementId];
    if (el) {
      dispatch(copyToClipboard(el));
    }
    setContextMenu(null);
  };

  const handlePaste = () => {
    if (!clipboardElement) return;
    dispatch(
      addElement({
        ...clipboardElement,
        x: (clipboardElement.x as number) + 20,
        y: (clipboardElement.y as number) + 20,
      }),
    );
    setContextMenu(null);
  };

  const handleDelete = (elementId?: string) => {
    const id = elementId ?? contextMenu?.elementId ?? selectedElementId;
    if (id) {
      dispatch(deleteElement(id));
    }
    setContextMenu(null);
  };

  const handleSave = () => {
    dispatch(setLoading(true));

    // 1. Serialize the current working area's HTML content
    const canvasHtml =
      containerRef.current?.querySelector(".board-canvas")?.innerHTML;

    // 2. Prepare the data for "backend" (logging as per prompt)
    const currentState = {
      activeSlideId: activeSlideIdFromState,
      elements: elementsById,
      serializedHtml: canvasHtml,
    };

    // 3. Log everything to the console as requested
    console.log("=== SAVE LAYOUT ===");
    console.log("Redux State:", currentState);
    console.log("Serialized HTML:", canvasHtml);

    // 4. Update Redux store concurrently
    if (activeSlideIdFromState) {
      const allActiveElements: SlideElement[] = elementIds.map(
        (id) => elementsById[id],
      );
      dispatch(
        updateSlide({
          id: activeSlideIdFromState,
          updates: { elements: allActiveElements },
        }),
      );
    }

    // 5. Success feedback
    setTimeout(() => {
      dispatch(
        addToast({
          message: "Slide layout saved successfully!",
          type: "success",
        }),
      );
      dispatch(setLoading(false));
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-w-0 w-full">
      <div className="h-12 bg-background flex items-center justify-between mb-2 shrink-0 min-w-0">
        <h2 className="text-primary font-bold text-base md:text-xl px-4 md:px-6 truncate min-w-0 flex-1">
          {activeSlide.name}
        </h2>
        <Button
          variant="outline"
          onClick={handleSave}
          className="bg-muted! border-2 border-border! text-foreground! hover:bg-border! hover:text-foreground! gap-1 flex md:gap-2 px-3 md:px-6 h-8 md:h-10 mx-2 shrink-0 text-xs md:text-sm"
        >
          <CustomImage
            src="/Icons/tag.svg"
            width={4}
            height={4}
            className="w-3! h-5!"
          />
          Save
        </Button>
      </div>

      <div
        ref={containerRef}
        className="flex-1 bg-card relative overflow-hidden flex items-center justify-center p-4 md:p-8"
        onClick={handleCanvasClick}
      >
        <div
          className="board-canvas relative shadow-2xl overflow-hidden origin-center transition-transform duration-75"
          style={{
            width: 760,
            height: 428,
            backgroundImage: activeSlide.backgroundUrl
              ? `url(${activeSlide.backgroundUrl})`
              : undefined,
            backgroundColor: activeSlide.backgroundUrl
              ? undefined
              : "var(--color-background)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {activeElements.map((el) => (
            <Rnd
              key={el.id}
              size={{ width: el.width, height: el.height }}
              position={{ x: el.x, y: el.y }}
              bounds="parent"
              dragScale={scale}
              onDragStop={(_e, d) => {
                dispatch(
                  updateElement({ id: el.id, updates: { x: d.x, y: d.y } }),
                );
              }}
              onResizeStop={(_e, _dir, ref, _delta, position) => {
                dispatch(
                  updateElement({
                    id: el.id,
                    updates: {
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                      x: position.x,
                      y: position.y,
                    },
                  }),
                );
              }}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                dispatch(selectElement(el.id));
                setContextMenu(null);
              }}
              onContextMenu={(e: React.MouseEvent) =>
                handleContextMenu(e, el.id)
              }
              style={{ zIndex: el.z }}
              className={`border-2 transition-colors ${
                selectedElementId === el.id
                  ? "border-secondary"
                  : "border-transparent hover:border-primary/60"
              }`}
            >
              {el.type === "text" ? (
                <div
                  dangerouslySetInnerHTML={{ __html: el.content }}
                  className="w-full h-full p-2 text-white drop-shadow font-medium text-sm"
                />
              ) : (
                <img
                  src={el.content}
                  alt="element"
                  className="w-full h-full object-fill pointer-events-none"
                />
              )}
            </Rnd>
          ))}
        </div>

        {contextMenu && (
          <div
            className="absolute bg-background shadow-xl border border-border rounded-lg flex flex-col z-50 py-1 w-36 overflow-hidden"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleCopy(contextMenu.elementId)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-muted text-sm text-foreground transition-colors"
            >
              <FaCopy className="text-foreground/50" size={13} /> Copy
            </button>
            <button
              onClick={handlePaste}
              className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                clipboardElement
                  ? "hover:bg-muted text-foreground"
                  : "text-foreground/30 cursor-default"
              }`}
            >
              <FaPaste
                className={
                  clipboardElement ? "text-foreground/50" : "text-foreground/30"
                }
                size={13}
              />{" "}
              Paste
            </button>
            <div className="border-t border-border my-0.5" />
            <button
              onClick={() => handleDelete(contextMenu.elementId)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-sm text-red-500 transition-colors"
            >
              <FaTrash className="text-red-400" size={13} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;

import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { addElement, updateElement } from "../../store/slices/elementsSlice";
import { updateSlide as setSlideBackground } from "../../store/slices/slidesSlice";
import Button from "../ui/Button";
import CustomImage from "../ui/Image";
import RichTextEditor from "./RichTextEditor";
import ElementControls from "./ElementControls";
import { useNavigate } from "react-router-dom";

type Tab = "text" | "image";

const LeftPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navi = () => navigate("/");
  const { activeSlideId, selectedElementId } = useAppSelector(
    (state) => state.editor,
  );
  const elementsById = useAppSelector((state) => state.elements.byId);
  const elementIds = useAppSelector((state) => state.elements.allIds);

  const [activeTab, setActiveTab] = useState<Tab>("text");
  const [textContent, setTextContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedElement = selectedElementId
    ? elementsById[selectedElementId]
    : null;

  const imageElements = elementIds
    .map((id) => elementsById[id])
    .filter((el) => el.type === "image");

  const isTextSelected = selectedElement?.type === "text";
  const editorValue = isTextSelected ? selectedElement.content : textContent;

  const handleTextChange = (html: string) => {
    setTextContent(html);

    if (selectedElementId && isTextSelected) {
      dispatch(
        updateElement({ id: selectedElementId, updates: { content: html } }),
      );
    }
  };

  const handleAddElement = () => {
    if (activeTab === "text") {
      dispatch(
        addElement({ type: "text", content: textContent || "Type here" }),
      );
      setTextContent("");
    } else {
      // Trigger file picker for images instead of adding a placeholder
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    dispatch(
      addElement({ type: "image", content: url, width: 200, height: 150 }),
    );
  };

  const handleImageAction = (content: string, asBackground?: boolean) => {
    if (asBackground && activeSlideId) {
      // Set image as the canvas background of the current slide
      dispatch(
        setSlideBackground({
          id: activeSlideId,
          updates: { backgroundUrl: content },
        }),
      );
    } else {
      // Add as a positioned element on the canvas
      dispatch(addElement({ type: "image", content, width: 200, height: 150 }));
    }
  };

  return (
    <div className="w-full md:w-[320px] md:min-w-[320px] bg-background border-b md:border-b-0 md:border-r border-border flex flex-col md:h-full">
      {/* Back button */}
      <Button
        onClick={navi}
        variant="default"
        size="sm"
        className="w-fit mt-2 ml-2 flex gap-2"
      >
        <CustomImage src="/Icons/arrowLeft.svg" className="w-1! h-2!" />
        Back
      </Button>

      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-primary font-bold text-base text-center tracking-wide">
          ADD ELEMENT
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex mx-5 mb-4 rounded overflow-hidden border border-gray-200">
        <button
          onClick={() => setActiveTab("text")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            activeTab === "text"
              ? "bg-primary text-white"
              : "bg-muted text-foreground/70 hover:bg-border"
          }`}
        >
          Text
        </button>
        <button
          onClick={() => setActiveTab("image")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            activeTab === "image"
              ? "bg-primary text-white"
              : "bg-muted text-foreground/70 hover:bg-border"
          }`}
        >
          Image
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-4">
        {activeTab === "text" ? (
          /* TEXT TAB */
          <RichTextEditor value={editorValue} onChange={handleTextChange} />
        ) : (
          /* IMAGE TAB */
          <div>
            {/* Choose File button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-border rounded py-2 text-sm text-foreground hover:bg-muted mb-4 transition-colors"
            >
              Choose File
            </button>

            {/* Image Grid */}
            {imageElements.length === 0 ? (
              <p className="text-center text-foreground/50 text-xs mt-4">
                No images added yet. Use "Choose File" to add one.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {imageElements.map((el) => (
                  <div
                    key={el.id}
                    className="relative rounded overflow-hidden group h-24 bg-muted"
                  >
                    <img
                      src={el.content}
                      alt="slide image"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                      <button
                        onClick={() => handleImageAction(el.content)}
                        className="text-white text-[9px] bg-primary/80 rounded px-1.5 py-0.5 w-full"
                      >
                        Add to slide
                      </button>
                      <button
                        onClick={() => handleImageAction(el.content, true)}
                        className="text-white text-[9px] bg-gray-700/80 rounded px-1.5 py-0.5 w-full"
                      >
                        Use as background
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <ElementControls showSize={activeTab === "image"} />

      {/* ADD Button */}
      <div className="px-4 pb-4">
        <Button onClick={handleAddElement} className="w-full">
          ADD
        </Button>
      </div>
    </div>
  );
};

export default LeftPanel;

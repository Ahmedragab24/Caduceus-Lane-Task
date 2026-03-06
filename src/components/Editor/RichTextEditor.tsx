import React, { useEffect, useRef, useCallback } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
}

const FONTS = [
  { label: "Sans Serif", value: "Arial, sans-serif" },
  { label: "Serif", value: "Georgia, serif" },
  { label: "Mono", value: "Courier New, monospace" },
  { label: "Arial", value: "Arial" },
  { label: "Georgia", value: "Georgia" },
  { label: "Tahoma", value: "Tahoma" },
  { label: "Verdana", value: "Verdana" },
];

const SIZES = [
  { label: "tiny", value: "1" },
  { label: "small", value: "2" },
  { label: "Normal", value: "3" },
  { label: "medium", value: "4" },
  { label: "Large", value: "5" },
  { label: "x-large", value: "6" },
  { label: "Huge", value: "7" },
];

/**
 * A focusable button whose mousedown is suppressed (e.preventDefault)
 * so that clicking a toolbar button does NOT take focus away from the
 * contenteditable editor — this is critical for execCommand to work.
 */
const Btn: React.FC<{
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ title, onClick, children }) => (
  <button
    type="button"
    title={title}
    tabIndex={-1}
    onMouseDown={(e) => {
      e.preventDefault(); // ← keeps focus on the editor
      onClick();
    }}
    className="px-1.5 py-0.5 rounded text-xs hover:bg-muted text-foreground select-none transition-colors"
  >
    {children}
  </button>
);

const Sep = () => <span className="w-px h-4 bg-border mx-0.5 inline-block" />;

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  // Track whether this component is currently "owned" by the user (focused)
  const isFocused = useRef(false);

  // Only sync incoming `value` into the DOM when the editor is NOT focused.
  // When focused, the user is driving; we must not clobber their content.
  useEffect(() => {
    const el = editorRef.current;
    if (!el || isFocused.current) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value ?? "";
    }
  }, [value]);

  /**
   * Executes a rich-text command. We must call focus() first so the
   * browser knows which selection to operate on.
   */
  const exec = useCallback(
    (command: string, val?: string) => {
      const el = editorRef.current;
      if (!el) return;
      el.focus();
      document.execCommand(command, false, val ?? "");
      onChange(el.innerHTML);
    },
    [onChange],
  );

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  if (disabled) {
    return (
      <div className="border border-border rounded-md flex items-center justify-center h-32 text-foreground/50 text-xs bg-muted">
        Select a text element on the canvas to edit it
      </div>
    );
  }

  return (
    <div className="border border-primary/40 rounded-md overflow-hidden flex flex-col">
      {/* ── Toolbar row 1: font + headings + basic format ── */}
      <div className="flex items-center flex-wrap gap-1 px-2 py-1.5 border-b border-border bg-muted">
        {/* Font family */}
        <select
          tabIndex={-1}
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => exec("fontName", e.target.value)}
          defaultValue=""
          className="text-[10px] border border-border rounded px-1 py-0.5 bg-background text-foreground outline-none max-w-[92px]"
        >
          <option value="" disabled>
            Font
          </option>
          {FONTS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        {/* Font size */}
        <select
          tabIndex={-1}
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => exec("fontSize", e.target.value)}
          defaultValue=""
          className="text-[10px] border border-border rounded px-1 py-0.5 bg-background text-foreground outline-none max-w-[72px]"
        >
          <option value="" disabled>
            Size
          </option>
          {SIZES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <Sep />

        <Btn title="Heading 1 (Large)" onClick={() => exec("fontSize", "6")}>
          <b>H1</b>
        </Btn>
        <Btn title="Heading 2 (Medium)" onClick={() => exec("fontSize", "4")}>
          <b>H2</b>
        </Btn>
        <Btn title="Normal text" onClick={() => exec("fontSize", "3")}>
          ¶
        </Btn>

        <Sep />

        <Btn title="Bold" onClick={() => exec("bold")}>
          <b>B</b>
        </Btn>
        <Btn title="Italic" onClick={() => exec("italic")}>
          <i>I</i>
        </Btn>
        <Btn title="Underline" onClick={() => exec("underline")}>
          <u>U</u>
        </Btn>
        <Btn title="Strikethrough" onClick={() => exec("strikeThrough")}>
          <s>S</s>
        </Btn>
      </div>

      {/* ── Toolbar row 2: alignment + lists + color + clear ── */}
      <div className="flex items-center flex-wrap gap-1 px-2 py-1 border-b border-border bg-muted">
        <Btn title="Align Left" onClick={() => exec("justifyLeft")}>
          ≡
        </Btn>
        <Btn title="Align Center" onClick={() => exec("justifyCenter")}>
          ☰
        </Btn>
        <Btn title="Align Right" onClick={() => exec("justifyRight")}>
          ≡
        </Btn>
        <Btn title="Justify" onClick={() => exec("justifyFull")}>
          ≣
        </Btn>

        <Sep />

        <Btn title="Bullet List" onClick={() => exec("insertUnorderedList")}>
          •≡
        </Btn>
        <Btn title="Numbered List" onClick={() => exec("insertOrderedList")}>
          1≡
        </Btn>

        <Sep />

        {/* Text color */}
        <label
          title="Text Color"
          onMouseDown={(e) => e.preventDefault()}
          className="cursor-pointer px-1.5 py-0.5 rounded hover:bg-muted text-xs font-bold text-yellow-600"
        >
          A
          <input
            type="color"
            tabIndex={-1}
            className="sr-only"
            onChange={(e) => exec("foreColor", e.target.value)}
          />
        </label>

        {/* Highlight color */}
        <label
          title="Highlight Color"
          onMouseDown={(e) => e.preventDefault()}
          className="cursor-pointer px-1.5 py-0.5 rounded hover:bg-muted text-xs bg-yellow-200"
        >
          H
          <input
            type="color"
            tabIndex={-1}
            className="sr-only"
            onChange={(e) => exec("hiliteColor", e.target.value)}
          />
        </label>

        <Sep />

        <Btn title="Clear Formatting" onClick={() => exec("removeFormat")}>
          ✕
        </Btn>
      </div>

      {/* ── Editable area ── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => {
          isFocused.current = true;
        }}
        onBlur={() => {
          isFocused.current = false;
          // Sync on blur so Redux gets the final value
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        onInput={handleInput}
        data-placeholder="Type here..."
        className="min-h-[100px] max-h-[180px] overflow-y-auto p-3 text-sm text-foreground outline-none"
      />

      <style>{`
        [data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: var(--color-foreground);
          opacity: 0.5;
          pointer-events: none;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;

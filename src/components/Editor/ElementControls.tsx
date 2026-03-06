import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateElement } from "../../store/slices/elementsSlice";

interface ElementControlsProps {
  showSize?: boolean;
}

const Field: React.FC<{
  placeholder: string;
  value: number | string;
  onChange: (v: number) => void;
  disabled?: boolean;
}> = ({ placeholder, value, onChange, disabled }) => (
  <input
    type="number"
    placeholder={placeholder}
    disabled={disabled}
    value={value === "" ? "" : value}
    onChange={(e) => onChange(Number(e.target.value))}
    className="w-full bg-background rounded-md px-3 py-2 text-xs text-foreground
      placeholder:text-foreground/50 border-0 outline-none
      disabled:bg-muted disabled:text-foreground/40 disabled:cursor-not-allowed
      focus:ring-1 focus:ring-secondary/50"
  />
);

const ElementControls: React.FC<ElementControlsProps> = ({
  showSize = false,
}) => {
  const dispatch = useAppDispatch();
  const { selectedElementId } = useAppSelector((s) => s.editor);
  const elementsById = useAppSelector((s) => s.elements.byId);

  const el = selectedElementId ? elementsById[selectedElementId] : null;
  const disabled = !el;

  const upd = (field: string, v: number) => {
    if (!selectedElementId) return;
    dispatch(updateElement({ id: selectedElementId, updates: { [field]: v } }));
  };

  return (
    <div className="mx-3 mb-3 rounded-2xl overflow-hidden bg-card border border-border">
      <div className="px-4 pt-4 pb-3">
        <p className="text-foreground/60 text-[11px] font-semibold mb-3 tracking-wide">
          Element controls
        </p>

        {showSize && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Field
              placeholder="width"
              value={disabled ? "" : (el.width as number)}
              onChange={(v) => upd("width", v)}
              disabled={disabled}
            />
            <Field
              placeholder="height"
              value={disabled ? "" : (el.height as number)}
              onChange={(v) => upd("height", v)}
              disabled={disabled}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 mb-2">
          <Field
            placeholder="X position"
            value={disabled ? "" : (el.x as number)}
            onChange={(v) => upd("x", v)}
            disabled={disabled}
          />
          <Field
            placeholder="Y position"
            value={disabled ? "" : (el.y as number)}
            onChange={(v) => upd("y", v)}
            disabled={disabled}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Field
            placeholder="z-index"
            value={disabled ? "" : el.z}
            onChange={(v) => upd("z", v)}
            disabled={disabled}
          />
          <div />
        </div>
      </div>
    </div>
  );
};

export default ElementControls;

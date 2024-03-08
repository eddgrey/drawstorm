"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}

export default function ColorPicker({ onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <ColorButton color={{ r: 59, g: 130, b: 246 }} onClick={onChange} />
      <ColorButton color={{ r: 139, g: 92, b: 246 }} onClick={onChange} />
      <ColorButton color={{ r: 239, g: 68, b: 68 }} onClick={onChange} />
      <ColorButton color={{ r: 236, g: 72, b: 153 }} onClick={onChange} />
      <ColorButton color={{ r: 34, g: 197, b: 94 }} onClick={onChange} />
      <ColorButton color={{ r: 245, g: 158, b: 11 }} onClick={onChange} />
      <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
    </div>
  );
}

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

function ColorButton({ onClick, color }: ColorButtonProps) {
  return (
    <button
      onClick={() => onClick(color)}
      className="w-8 h-8 flex justify-center items-center hover:opacity-75 transition"
    >
      <div
        className="w-8 h-8 rounded-md border border-neutral-300"
        style={{ background: colorToCss(color) }}
      />
    </button>
  );
}

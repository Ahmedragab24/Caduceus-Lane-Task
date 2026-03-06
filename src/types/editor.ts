export type ElementType = "text" | "image";

export interface SlideElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  z: number;
  width: number | string;
  height: number | string;
  content: string;
}

export interface SlideData {
  id: string;
  name: string;
  thumbnailUrl?: string;
  backgroundUrl?: string;
  elements?: SlideElement[];
}

export interface ClipboardData {
  element: SlideElement | null;
}

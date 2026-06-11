"use client";

import { ReactNode } from "react";

interface ContentLayerProps {
  children: ReactNode;
  zIndex: number;
}

/**
 * Wraps children in a content-layer div. On desktop the CSS applies GPU
 * compositing + z-index stacking for the sticky-hero effect.
 * On mobile the CSS strips all compositing, transforms and z-index so
 * the page is a flat scroll surface — zero jerk.
 */
export function ContentLayer({ children, zIndex }: ContentLayerProps) {
  return (
    <div className="content-layer" style={{ zIndex }}>
      {children}
    </div>
  );
}

"use client";

import { useEffect } from "react";

const IMAGE_COUNT = 24;

export function PreloadImages() {
  useEffect(() => {
    for (let i = 1; i <= IMAGE_COUNT; i++) {
      const img = new Image();
      img.src = `/img_${i}.png`;
    }
  }, []);

  return null;
}

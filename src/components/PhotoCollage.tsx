"use client";

import React from "react";
import Image from "next/image";
interface CollageProps {
  /** Image filenames to show. Pass all to show everything, or a subset for progressive unlock. */
  unlockedImages: string[];
  /** Optional z-index class. Default: -z-10. Use z-0 when photos should appear above hearts. */
  zIndex?: string;
  /** When true, each photo animates in when it appears. */
  animateIn?: boolean;
}

// Total number of slots (5×5 grid minus the centre) – adjust GRID_SIZE if you change the layout
const GRID_SIZE = 5;
const TOTAL_SLOTS = GRID_SIZE * GRID_SIZE - 1;

// Pre-compute a 5×5 grid of slot positions (percentage based) except the very centre cell.
const slotPositions: { top: string; left: string }[] = [];
for (let row = 0; row < GRID_SIZE; row++) {
  for (let col = 0; col < GRID_SIZE; col++) {
    // Skip the exact center cell (row 2, col 2) so it never overlaps the prompt card
    if (row === Math.floor(GRID_SIZE / 2) && col === Math.floor(GRID_SIZE / 2)) {
      continue;
    }
    const top = ((row + 0.5) * (100 / GRID_SIZE)).toFixed(2) + "%"; // center of the cell
    const left = ((col + 0.5) * (100 / GRID_SIZE)).toFixed(2) + "%";
    slotPositions.push({ top, left });
  }
}

export const PhotoCollage: React.FC<CollageProps> = ({
  unlockedImages,
  zIndex = "-z-10",
  animateIn = false,
}) => {
  // Avoid hydration mismatch: only show images once mounted so we can read unlocked state
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);


  const visibleIndices = new Set(
    (mounted ? unlockedImages : [])
      .filter((name): name is string => typeof name === "string")
      .map((name) => {
        const match = name.match(/img_(\d+)/);
        return match ? parseInt(match[1]) : null;
      })
  );

  return (
    <div className={`pointer-events-none fixed inset-0 ${zIndex}`}>
      {Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1).map((slotIdx) => {
        const { top, left } = slotPositions[(slotIdx - 1) % slotPositions.length];
        const unlocked = visibleIndices.has(slotIdx);

        return (
          <div
            key={slotIdx}
            className="absolute"
            style={{
              top,
              left,
              transform: "translate(-50%, -50%) rotate(" + ((slotIdx % 6) * 15 - 45) + "deg)",
            }}
          >
            {unlocked ? (
              <div className="relative w-40 h-40 shrink-0">
                <Image
                  src={`/img_${slotIdx}.png`}
                  alt={`Image ${slotIdx}`}
                  width={160}
                  height={160}
                  className={`object-cover rounded-lg shadow-md w-full h-full ${animateIn ? "animate-photo-fade-in" : ""}`}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

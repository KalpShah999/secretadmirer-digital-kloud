"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { PhotoCollage } from "@/components/PhotoCollage";
import { HeartsBackground } from "@/components/HeartsBackground";
import { TypewriterText } from "@/components/TypewriterText";

const ALL_IMAGES = Array.from({ length: 24 }, (_, i) => `img_${i + 1}.png`);
const PHOTO_REVEAL_DELAY_MS = 100;

// Deterministic shuffle for hydration (seed-based)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const rand = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
    const j = Math.floor(rand * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
const DELAY_AFTER_TYPEWRITER_MS = 500;

export default function FinalPage() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [typewriterDone, setTypewriterDone] = useState(false);

  const handleTypewriterComplete = useCallback(() => {
    setTypewriterDone(true);
  }, []);

  useEffect(() => {
    if (!typewriterDone) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const photoRevealStartTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setRevealedCount((prev) => {
          if (prev >= ALL_IMAGES.length) {
            if (intervalId) clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, PHOTO_REVEAL_DELAY_MS);
    }, DELAY_AFTER_TYPEWRITER_MS);

    return () => {
      clearTimeout(photoRevealStartTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [typewriterDone]);

  const revealOrder = useMemo(() => shuffleArray(ALL_IMAGES), []);
  const displayedImages = revealOrder.slice(0, revealedCount);

  return (
    <>
      <HeartsBackground behindContent />
      <PhotoCollage
        unlockedImages={displayedImages}
        zIndex="z-0"
        animateIn
      />
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold">
            <TypewriterText onComplete={handleTypewriterComplete} />
          </h1>
        </Card>
      </div>
    </>
  );
}

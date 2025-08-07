import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "scavenger_progress";

export function useScavengerProgress() {
  const [progress, setProgress] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return parseInt(stored);
    }
    return 0;
  });

  const markStepCompleted = useCallback(
    (stepIndex: number) => {
      // We only advance progress, never decrement
      setProgress((prev) => {
        const next = Math.max(prev, stepIndex + 1);
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, next.toString());
        }
        return next;
      });
    },
    []
  );

  const resetProgress = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setProgress(0);
  }, []);

  return { progress, markStepCompleted, resetProgress };
}

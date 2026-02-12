import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "scavenger_progress";
const HOME_DATE_KEY = "scavenger_home_date";
const JOKE_KEY = "scavenger_joke";

function getStored(key: string, defaultValue: boolean): boolean {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(key);
  return stored === "1";
}

export function useScavengerProgress() {
  const [progress, setProgress] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return parseInt(stored);
    }
    return 0;
  });

  const [homeDateCompleted, setHomeDateCompleted] = useState<boolean | null>(null);
  const [jokeCompleted, setJokeCompleted] = useState<boolean | null>(null);

  const loadCompletionFlags = useCallback(() => {
    if (typeof window === "undefined") return;
    setHomeDateCompleted(getStored(HOME_DATE_KEY, false));
    setJokeCompleted(getStored(JOKE_KEY, false));
  }, []);

  const markHomeDateCompleted = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(HOME_DATE_KEY, "1");
    }
    setHomeDateCompleted(true);
  }, []);

  const markJokeCompleted = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(JOKE_KEY, "1");
    }
    setJokeCompleted(true);
  }, []);

  const markStepCompleted = useCallback(
    (stepIndex: number) => {
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
      localStorage.removeItem(HOME_DATE_KEY);
      localStorage.removeItem(JOKE_KEY);
    }
    setProgress(0);
    setHomeDateCompleted(false);
    setJokeCompleted(false);
  }, []);

  useEffect(() => {
    loadCompletionFlags();
  }, [loadCompletionFlags]);

  return {
    progress,
    homeDateCompleted,
    jokeCompleted,
    markHomeDateCompleted,
    markJokeCompleted,
    markStepCompleted,
    resetProgress,
  };
}

"use client";

import { useEffect, useState } from "react";

const INITIAL_DELAY = 2000;
const TYPE_DELAY = 80;
const BACKSPACE_DELAY = 60;
const PAUSE_AFTER_PHRASE = 1000;
const PAUSE_AFTER_BACKSPACE = 500;

interface TypewriterTextProps {
  onComplete?: () => void;
}

export function TypewriterText({ onComplete }: TypewriterTextProps) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"initialDelay" | "typing1" | "paused1" | "backspacing" | "paused2" | "typing2" | "done">("initialDelay");

  const phrase1 = "Will you be mine?";
  const phrase2 = "Will you be my valentine? 🙃💛";
  const backspaceTo = "Will you be m";

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "initialDelay") {
      timeoutId = setTimeout(() => setPhase("typing1"), INITIAL_DELAY);
    } else if (phase === "typing1") {
      if (text.length < phrase1.length) {
        timeoutId = setTimeout(() => {
          setText(phrase1.slice(0, text.length + 1));
        }, TYPE_DELAY);
      } else {
        timeoutId = setTimeout(() => setPhase("paused1"), PAUSE_AFTER_PHRASE);
      }
    } else if (phase === "paused1") {
      timeoutId = setTimeout(() => setPhase("backspacing"), PAUSE_AFTER_PHRASE);
    } else if (phase === "backspacing") {
      if (text.length > backspaceTo.length) {
        timeoutId = setTimeout(() => {
          setText(text.slice(0, -1));
        }, BACKSPACE_DELAY);
      } else {
        timeoutId = setTimeout(() => setPhase("paused2"), PAUSE_AFTER_BACKSPACE);
      }
    } else if (phase === "paused2") {
      timeoutId = setTimeout(() => setPhase("typing2"), PAUSE_AFTER_BACKSPACE);
    } else if (phase === "typing2") {
      if (text.length < phrase2.length) {
        timeoutId = setTimeout(() => {
          setText(phrase2.slice(0, text.length + 1));
        }, TYPE_DELAY);
      } else {
        setPhase("done");
        onComplete?.();
      }
    }

    return () => clearTimeout(timeoutId);
  }, [phase, text, onComplete]);

  return (
    <span>
      {text}
      {(phase === "initialDelay" || phase === "typing1" || phase === "typing2" || phase === "backspacing") && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

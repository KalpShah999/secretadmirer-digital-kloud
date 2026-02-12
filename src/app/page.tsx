"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HeartsBackground } from "@/components/HeartsBackground";
import { useScavengerProgress } from "@/hooks/useScavengerProgress";
import { defaultPlaceholderDate, homeDateAnswer } from "@/lib/scavengerConfig";

export default function Home() {
  const router = useRouter();
  const { markHomeDateCompleted } = useScavengerProgress();
  const [date, setDate] = useState(defaultPlaceholderDate);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!date.trim()) {
      setError("Please pick a date.");
      return;
    }
    if (date.trim() === homeDateAnswer) {
      markHomeDateCompleted();
      router.push("/q/joke");
    } else {
      setError("Try again!");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
      <HeartsBackground />
      <div className="relative z-10 flex max-w-lg flex-col items-center gap-8 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">
         🥰 Looks like someone has a secret admirer 🥰
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-xl font-medium">When did you meet him?</p>
          <Input
            type="date"
            className="max-w-xs"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (error) setError(null);
            }}
          />
          <Button type="submit">Submit</Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

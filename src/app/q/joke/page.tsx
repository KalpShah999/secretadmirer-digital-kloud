"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartsBackground } from "@/components/HeartsBackground";
import { useScavengerProgress } from "@/hooks/useScavengerProgress";
import { jokeQuestionAnswer } from "@/lib/scavengerConfig";

export default function JokePage() {
  const router = useRouter();
  const { homeDateCompleted, markJokeCompleted } = useScavengerProgress();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (homeDateCompleted === null) return;
    if (!homeDateCompleted) {
      router.replace("/");
    }
  }, [homeDateCompleted, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === jokeQuestionAnswer.trim().toLowerCase()) {
      markJokeCompleted();
      router.push("/q/0");
    } else {
      setError("Try again!");
    }
  };

  if (homeDateCompleted !== true) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <>
      <HeartsBackground />
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
        <Card className="w-full max-w-md space-y-4 text-center">
          <h1 className="text-xl font-semibold">
            WRONG! Just kidding, you know you&apos;re right, nothing&apos;s different tonight? What
            song is that? 🙃
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Your answer here"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PhotoCollage } from "@/components/PhotoCollage";
import { scavengerSteps } from "@/lib/scavengerConfig";
import { useScavengerProgress } from "@/hooks/useScavengerProgress";

interface PageProps {
  params?: Promise<{ index: string }>; // Next passes params as a Promise
}

export default function QuestionPage({ params }: PageProps) {
  // Unwrap params (Next.js passes them as a Promise in client components)
  const routeParams = React.use(params as any) as { index: string };
  const stepIndex = parseInt(routeParams.index, 10);
  const router = useRouter();
  const { progress, markStepCompleted } = useScavengerProgress();

  // Consolidated redirect logic
  React.useEffect(() => {
    console.log("Redirect check:", { stepIndex, progress, totalSteps: scavengerSteps.length });
    
    // Only redirect if we have valid progress data
    if (progress === undefined || progress === null) {
      console.log("Progress not ready yet");
      return;
    }
    
    const step = scavengerSteps[stepIndex];
    
    // If step doesn't exist, redirect to first question
    if (!step) {
      console.log("Step doesn't exist, redirecting to /q/0");
      router.replace("/q/0");
      return;
    }
    
    // If the hunt is completed, always show the completed page
    if (progress >= scavengerSteps.length) {
      console.log("Hunt completed, redirecting to /q/completed");
      router.replace("/q/completed");
      return;
    }
    
    // Prevent user from jumping ahead
    if (stepIndex > progress) {
      console.log("Jumping ahead, redirecting to /q/" + progress);
      router.replace(`/q/${progress}`);
    }
  }, [stepIndex, progress, router]);

  const step = scavengerSteps[stepIndex];

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === step.answer.trim().toLowerCase()) {
      markStepCompleted(stepIndex);
      const nextIndex = stepIndex + 1;
      if (nextIndex < scavengerSteps.length) {
        router.push(`/q/${nextIndex}`);
      } else {
        router.push(`/q/completed`);
      }
    } else {
      setError("Try again!");
    }
  };

  // Determine unlocked images so far
  const unlockedImages = scavengerSteps
    .slice(0, progress)
    .flatMap((s) => s.images);

  return (
    <>
      <PhotoCollage unlockedImages={unlockedImages} />

      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="w-full max-w-md space-y-4 text-center">
          <h1
            className="text-xl font-semibold"
            dangerouslySetInnerHTML={{ __html: step.prompt }}
          />

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

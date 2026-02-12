"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartsBackground } from "@/components/HeartsBackground";
import { defaultPlaceholderDate, scavengerSteps } from "@/lib/scavengerConfig";
import { useScavengerProgress } from "@/hooks/useScavengerProgress";

interface PageProps {
  params?: Promise<{ index: string }>; // Next passes params as a Promise
}

export default function QuestionPage({ params }: PageProps) {
  // Unwrap params (Next.js passes them as a Promise in client components)
  const routeParams = React.use(params as any) as { index: string };
  const stepIndex = parseInt(routeParams.index, 10);
  const router = useRouter();
  const { progress, jokeCompleted, markStepCompleted } = useScavengerProgress();

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

    // Step 0 requires joke to be completed first (only redirect when we've loaded the flag)
    if (stepIndex === 0 && jokeCompleted !== null && !jokeCompleted) {
      router.replace("/q/joke");
      return;
    }
    
    // If the hunt is completed, always show the final page
    if (progress >= scavengerSteps.length) {
      console.log("Hunt completed, redirecting to /final");
      router.replace("/final");
      return;
    }
    
    // Prevent user from jumping ahead
    if (stepIndex > progress) {
      console.log("Jumping ahead, redirecting to /q/" + progress);
      router.replace(`/q/${progress}`);
    }
  }, [stepIndex, progress, jokeCompleted, router]);

  const step = scavengerSteps[stepIndex];

  const isDateStep = stepIndex === 0 || stepIndex === 1 || stepIndex === 2;
  const isButtonOnlyStep = !step.answer.trim();
  const [answer, setAnswer] = useState(isDateStep ? defaultPlaceholderDate : "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonOnlyStep) {
      markStepCompleted(stepIndex);
      router.push("/final");
      return;
    }
    const isCorrect = isDateStep
      ? answer.trim() === step.answer.trim()
      : answer.trim().toLowerCase() === step.answer.trim().toLowerCase();
    if (isCorrect) {
      markStepCompleted(stepIndex);
      const nextIndex = stepIndex + 1;
      if (nextIndex < scavengerSteps.length) {
        router.push(`/q/${nextIndex}`);
      } else {
        router.push(`/final`);
      }
    } else {
      setError("Try again!");
    }
  };

  return (
    <>
      <HeartsBackground />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
        <Card className="w-full max-w-md space-y-4 text-center">
          <h1
            className="text-xl font-semibold"
            dangerouslySetInnerHTML={{ __html: step.prompt }}
          />

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isButtonOnlyStep && (
              <Input
                type={isDateStep ? "date" : "text"}
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={isDateStep ? undefined : "Your answer here"}
              />
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              {isButtonOnlyStep ? "Yes please 🙃" : "Submit"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

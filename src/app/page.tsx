"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useScavengerProgress } from "@/hooks/useScavengerProgress";
import { scavengerSteps } from "@/lib/scavengerConfig";

export default function Home() {
  const router = useRouter();
  const { progress } = useScavengerProgress();

  useEffect(() => {
    // Wait for progress to be loaded from localStorage
    if (progress === undefined || progress === null) return;

    // If completed, go to completed page
    if (progress >= scavengerSteps.length) {
      router.replace("/q/completed");
      return;
    }

    // Otherwise, go to the current progress
    router.replace(`/q/${progress}`);
  }, [progress, router]);

  // Show loading state while determining redirect
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}


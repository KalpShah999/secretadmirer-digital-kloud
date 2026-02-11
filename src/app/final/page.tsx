"use client";

import { Card } from "@/components/ui/card";
import { PhotoCollage } from "@/components/PhotoCollage";
import { scavengerSteps, finalPrompt } from "@/lib/scavengerConfig";

export default function FinalPage() {
  const allImages = scavengerSteps.flatMap((s) => s.images);

  return (
    <>
      <PhotoCollage unlockedImages={allImages} />
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <h1
            className="text-2xl font-bold"
            dangerouslySetInnerHTML={{ __html: finalPrompt }}
          />
        </Card>
      </div>
    </>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CompletedPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/final");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}

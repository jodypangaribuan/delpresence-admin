"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AssistantsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new assistants page (if it exists)
    // If it doesn't exist yet, you should replace this with the correct path
    router.replace("/dashboard/academic/assistants");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[60vh] w-full">
      <p className="text-lg">Redirecting to assistants page...</p>
    </div>
  );
}

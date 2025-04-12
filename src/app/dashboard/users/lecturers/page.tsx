"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LecturersRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new lecturers page
    router.replace("/dashboard/academic/lecturers");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[60vh] w-full">
      <p className="text-lg">Redirecting to lecturers page...</p>
    </div>
  );
}

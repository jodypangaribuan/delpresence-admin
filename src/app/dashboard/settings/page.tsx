"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AccountSettingsModal } from "@/components/modals/AccountSettingsModal";

export default function AccountSettingsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after initial render
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <AccountSettingsModal defaultOpen={true} />
    </div>
  );
}

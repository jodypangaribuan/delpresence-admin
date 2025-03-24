"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { isAuthenticated, isAdmin } from "@/lib/auth";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Protect route
  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      router.push("/login");
    }
  }, [router]);

  return <DashboardLayout>{children}</DashboardLayout>;
}

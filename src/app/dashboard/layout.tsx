"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { isAuthenticated, getUserRole } from "@/services/auth";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Protect route and handle role-based access
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    // Get current role
    const userRole = getUserRole();

    // Check if user has appropriate role to access the dashboard
    if (userRole) {
      setAuthorized(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  // Show nothing while checking authentication
  if (!authorized) {
    return null;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

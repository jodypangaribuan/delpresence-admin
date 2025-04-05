"use client";

import { useState, useEffect, Suspense } from "react";
import { getUserRole, UserRole, getUser } from "@/services/auth";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import components
const LecturerDashboard = dynamic(
  () => import("./components/lecturer-dashboard"),
  {
    loading: () => <Loader />,
  }
);
const AssistantDashboard = dynamic(
  () => import("./components/assistant-dashboard"),
  {
    loading: () => <Loader />,
  }
);
const AdminDashboard = dynamic(() => import("./components/admin-dashboard"), {
  loading: () => <Loader />,
});

// Loader component
function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#0687C9]" />
    </div>
  );
}

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user role from cookies
    const role = getUserRole();
    setUserRole(role);
    setLoading(false);

    // Log user info for debugging
    const user = getUser();
    console.log("User info:", user);
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Render dashboard based on user role
  return (
    <Suspense fallback={<Loader />}>
      {userRole === UserRole.LECTURER && <LecturerDashboard />}
      {userRole === UserRole.ASSISTANT && <AssistantDashboard />}
      {userRole === UserRole.ADMIN && <AdminDashboard />}
      {(!userRole || userRole === UserRole.UNKNOWN) && (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Akses Tidak Diizinkan
          </h1>
          <p className="mt-2 text-gray-500">
            Anda tidak memiliki izin untuk mengakses dashboard ini. Hanya Dosen,
            Asisten Dosen, dan Admin yang dapat mengakses.
          </p>
        </div>
      )}
    </Suspense>
  );
}

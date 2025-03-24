"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function DashboardOverview() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Format date in Indonesian
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header with welcome message in Indonesian */}
      <div className="flex flex-col bg-gradient-to-r from-[#002A5C] to-[#0687C9] p-6 rounded-lg shadow-sm text-white">
        <h2 className="text-2xl font-bold">
          Selamat Datang di BAAK Management System
        </h2>
        <div className="flex items-center mt-2 text-blue-100">
          <Clock className="h-4 w-4 mr-2" />
          <p>
            {formatDate(currentTime)} | {formatTime(currentTime)}
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div className="rounded-lg border border-neutral-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center py-8">
          <h3 className="text-xl font-medium text-[#002A5C]">
            Sistem Manajemen Akademik
          </h3>
          <p className="mt-2 text-neutral-500">
            Gunakan menu di samping untuk mengakses berbagai fitur
          </p>
        </div>
      </div>

      {/* Information section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-neutral-100 bg-white p-6 shadow-sm">
          <h3 className="font-medium text-lg text-[#002A5C] mb-4">
            Informasi Terbaru
          </h3>
          <p className="text-neutral-600">
            Akses berbagai fitur akademik seperti manajemen mata kuliah, jadwal,
            kehadiran, dan pengguna.
          </p>
        </div>

        <div className="rounded-lg border border-neutral-100 bg-white p-6 shadow-sm">
          <h3 className="font-medium text-lg text-[#002A5C] mb-4">Bantuan</h3>
          <p className="text-neutral-600">
            Untuk bantuan penggunaan sistem, silahkan hubungi administrator atau
            kunjungi halaman panduan.
          </p>
        </div>
      </div>
    </div>
  );
}

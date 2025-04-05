"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Users,
  ClipboardList,
  Settings,
  Shield,
  BarChart2,
  FileText,
  CheckSquare,
  UserCog,
  Building,
  QrCode,
  BookMarked,
  Timer,
  ListChecks,
  UserCheck,
  FileOutput,
  BellRing,
  School,
  BarChartHorizontal,
  FolderSync,
  PersonStanding,
} from "lucide-react";
import { getUserRole, UserRole } from "@/services/auth";
import { useEffect, useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string>("UNKNOWN");

  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  const isLinkActive = (path: string) => {
    if (
      path === "/dashboard" &&
      (pathname === "/" || pathname === "/dashboard")
    ) {
      return true;
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const isDashboardActive = () => {
    return pathname === "/dashboard";
  };

  return (
    <aside className="h-full w-[240px] bg-white border-r border-neutral-200 fixed left-0 top-0 z-20 overflow-y-auto">
      <div className="flex h-16 items-center justify-center bg-white">
        <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={90}
            height={10}
            className="object-contain"
          />
        </Link>
      </div>

      <nav className="px-3 py-4">
        <div className="mb-2">
          <p className="px-3 py-2 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
            Menu Utama
          </p>
        </div>
        <ul className="space-y-1 mb-6">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                isDashboardActive()
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <LayoutDashboard
                className={`mr-3 h-5 w-5 ${
                  isDashboardActive()
                    ? "text-primary"
                    : "text-neutral-600 group-hover:text-primary"
                }`}
              />
              Dashboard
            </Link>
          </li>

          {/* Common menu items for all roles */}
          <li>
            <Link
              href="/dashboard/courses"
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                isLinkActive("/dashboard/courses")
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <BookOpen
                className={`mr-3 h-5 w-5 ${
                  isLinkActive("/dashboard/courses")
                    ? "text-primary"
                    : "text-neutral-600 group-hover:text-primary"
                }`}
              />
              Mata Kuliah
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/schedules"
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                isLinkActive("/dashboard/schedules")
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Calendar
                className={`mr-3 h-5 w-5 ${
                  isLinkActive("/dashboard/schedules")
                    ? "text-primary"
                    : "text-neutral-600 group-hover:text-primary"
                }`}
              />
              Jadwal
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/attendance"
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                isLinkActive("/dashboard/attendance")
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <ClipboardList
                className={`mr-3 h-5 w-5 ${
                  isLinkActive("/dashboard/attendance")
                    ? "text-primary"
                    : "text-neutral-600 group-hover:text-primary"
                }`}
              />
              Kehadiran
            </Link>
          </li>
        </ul>

        {/* Admin-specific menu items */}
        {userRole === UserRole.ADMIN && (
          <>
            <div className="mb-2">
              <p className="px-3 py-2 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Manajemen Admin
              </p>
            </div>
            <ul className="space-y-1 mb-6">
              <li>
                <Link
                  href="/dashboard/users"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/users")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <UserCog
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/users")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Manajemen Pengguna
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/course-management"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/course-management")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <BookMarked
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/course-management")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Kelola Data Mata Kuliah
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/lecturer-assignment"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/lecturer-assignment")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <PersonStanding
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/lecturer-assignment")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Penugasan Dosen
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/program-faculty"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/program-faculty")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <School
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/program-faculty")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Program & Fakultas
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/campus-attendance"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/campus-attendance")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <BarChart2
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/campus-attendance")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Dashboard Kehadiran
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/attendance-export"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/attendance-export")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <FileOutput
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/attendance-export")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Ekspor Data Kehadiran
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/backup-restore"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/backup-restore")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <FolderSync
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/backup-restore")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Backup & Restore
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/attendance-analytics"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/attendance-analytics")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <BarChartHorizontal
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/attendance-analytics")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Analisis Statistik
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/campus"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/campus")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Building
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/campus")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Data Kampus
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/security"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/security")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Shield
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/security")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Keamanan Sistem
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/settings")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Settings
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/settings")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Pengaturan Sistem
                </Link>
              </li>
            </ul>
          </>
        )}

        {/* Shared menu items for Lecturer and Assistant */}
        {(userRole === UserRole.LECTURER ||
          userRole === UserRole.ASSISTANT) && (
          <>
            <div className="mb-2">
              <p className="px-3 py-2 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Menu Pengajar
              </p>
            </div>
            <ul className="space-y-1 mb-6">
              <li>
                <Link
                  href="/dashboard/qr-generate"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/qr-generate")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <QrCode
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/qr-generate")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Generate QR Kelas
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/attendance-periods"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/attendance-periods")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Timer
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/attendance-periods")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Kelola Periode Presensi
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/student-list"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/student-list")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Users
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/student-list")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Daftar Mahasiswa
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/attendance-stats"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/attendance-stats")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <BarChart2
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/attendance-stats")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Statistik Kehadiran
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/realtime-monitor"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/realtime-monitor")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <ClipboardList
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/realtime-monitor")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Monitor Kehadiran Real-time
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/leave-requests"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/leave-requests")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <CheckSquare
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/leave-requests")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Persetujuan Izin
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/student-permissions"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/student-permissions")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <UserCheck
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/student-permissions")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Tracking Perizinan
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/export-attendance"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/export-attendance")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <FileOutput
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/export-attendance")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Ekspor Data Kehadiran
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/attendance-summary"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/attendance-summary")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <ListChecks
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/attendance-summary")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Ringkasan Kehadiran Mata Kuliah
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/notifications"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/notifications")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <BellRing
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/notifications")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Notifikasi Perizinan
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/settings")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Settings
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/settings")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Pengaturan
                </Link>
              </li>
            </ul>
          </>
        )}

        {/* Lecturer-specific additional features */}
        {userRole === UserRole.LECTURER && (
          <>
            <div className="mb-2">
              <p className="px-3 py-2 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Khusus Dosen
              </p>
            </div>
            <ul className="space-y-1 mb-6">
              <li>
                <Link
                  href="/dashboard/materials"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/materials")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <BookMarked
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/materials")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Materi Kuliah
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/assignments"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/assignments")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <FileText
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/assignments")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Tugas & Ujian
                </Link>
              </li>
            </ul>
          </>
        )}

        {/* Assistant-specific additional features */}
        {userRole === UserRole.ASSISTANT && (
          <>
            <div className="mb-2">
              <p className="px-3 py-2 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Khusus Asisten
              </p>
            </div>
            <ul className="space-y-1 mb-6">
              <li>
                <Link
                  href="/dashboard/lab-materials"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/lab-materials")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <BookOpen
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/lab-materials")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Materi Praktikum
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/tasks"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/tasks")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <CheckSquare
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/tasks")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Pemeriksaan Tugas
                </Link>
              </li>
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
}

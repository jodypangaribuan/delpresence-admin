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
  BarChart2,
  UserCog,
  Building,
  FileOutput,
  FileSpreadsheet,
  AlertTriangle,
  GraduationCap,
  School,
  Layers,
  BookCopy,
  LibrarySquare,
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
        {/* Dashboard Menu */}
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
        </ul>

        {/* Academic Management */}
        <div className="mb-2">
          <p className="px-3 py-2 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
            Manajemen Akademik
          </p>
        </div>
        <ul className="space-y-1 mb-6">
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
            {/* Academic Administration */}
            <div className="mb-2">
              <p className="px-3 py-2 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Administrasi Akademik
              </p>
            </div>
            <ul className="space-y-1 mb-6">
              <li>
                <Link
                  href="/dashboard/academic/departments"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/academic/departments")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <School
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/academic/departments")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Program Studi
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/academic/buildings"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/academic/buildings")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Building
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/academic/buildings")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Gedung
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/academic/semesters"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/academic/semesters")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Calendar
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/academic/semesters")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Tahun Akademik
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/academic/curriculum"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/academic/curriculum")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <BookCopy
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/academic/curriculum")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Kurikulum
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/courses/groups"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/courses/groups")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Layers
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/courses/groups")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Kelompok Matakuliah
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/rooms"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/rooms")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <LibrarySquare
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/rooms")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Ruangan
                </Link>
              </li>
            </ul>

            {/* Schedule Management */}
            <div className="mb-2">
              <p className="px-3 py-2 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Manajemen Jadwal
              </p>
            </div>
            <ul className="space-y-1 mb-6">
              <li>
                <Link
                  href="/dashboard/schedules/manage"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/schedules/manage")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Calendar
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/schedules/manage")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Jadwal Perkuliahan
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/schedules/import"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/schedules/import")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <FileSpreadsheet
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/schedules/import")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Import Excel
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/schedules/rooms"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/schedules/rooms")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Building
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/schedules/rooms")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Penjadwalan Ruangan
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/schedules/conflicts"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/schedules/conflicts")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <AlertTriangle
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/schedules/conflicts")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Pengecekan Konflik
                </Link>
              </li>
            </ul>

            {/* Attendance Management */}
            <div className="mb-2">
              <p className="px-3 py-2 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Manajemen Kehadiran
              </p>
            </div>
            <ul className="space-y-1 mb-6">
              <li>
                <Link
                  href="/dashboard/attendance/summary"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/attendance/summary")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <BarChart2
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/attendance/summary")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Rekap Kehadiran
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/attendance/reports"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/attendance/reports")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <FileOutput
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/attendance/reports")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Laporan Kehadiran
                </Link>
              </li>
            </ul>

            {/* User Management */}
            <div className="mb-2">
              <p className="px-3 py-2 text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Manajemen Pengguna
              </p>
            </div>
            <ul className="space-y-1 mb-6">
              <li>
                <Link
                  href="/dashboard/academic/lecturers"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/academic/lecturers")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Users
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/academic/lecturers")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Daftar Dosen
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/academic/assistants"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/academic/assistants")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <UserCog
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/academic/assistants")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Daftar Asisten Dosen
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/academic/students"
                  className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                    isLinkActive("/dashboard/academic/students")
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-neutral-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <GraduationCap
                    className={`mr-3 h-5 w-5 ${
                      isLinkActive("/dashboard/academic/students")
                        ? "text-primary"
                        : "text-neutral-600 group-hover:text-primary"
                    }`}
                  />
                  Daftar Mahasiswa
                </Link>
              </li>
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
}

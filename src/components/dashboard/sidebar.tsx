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
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

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
    <aside className="h-full w-[240px] bg-white border-r border-neutral-200 fixed left-0 top-0 z-20">
      <div className="flex h-16 items-center justify-center bg-white">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={90}
          height={10}
          className="object-contain"
        />
      </div>

      <nav className="px-2 py-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                isDashboardActive()
                  ? "bg-[#E6F3FB] text-[#0687C9] font-medium"
                  : "text-neutral-600 hover:bg-[#E6F3FB] hover:text-[#0687C9]"
              }`}
            >
              <LayoutDashboard
                className={`mr-3 h-5 w-5 ${
                  isDashboardActive()
                    ? "text-[#0687C9]"
                    : "text-neutral-600 group-hover:text-[#0687C9]"
                }`}
              />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/courses"
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                isLinkActive("/dashboard/courses")
                  ? "bg-[#E6F3FB] text-[#0687C9] font-medium"
                  : "text-neutral-600 hover:bg-[#E6F3FB] hover:text-[#0687C9]"
              }`}
            >
              <BookOpen
                className={`mr-3 h-5 w-5 ${
                  isLinkActive("/dashboard/courses")
                    ? "text-[#0687C9]"
                    : "text-neutral-600 group-hover:text-[#0687C9]"
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
                  ? "bg-[#E6F3FB] text-[#0687C9] font-medium"
                  : "text-neutral-600 hover:bg-[#E6F3FB] hover:text-[#0687C9]"
              }`}
            >
              <Calendar
                className={`mr-3 h-5 w-5 ${
                  isLinkActive("/dashboard/schedules")
                    ? "text-[#0687C9]"
                    : "text-neutral-600 group-hover:text-[#0687C9]"
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
                  ? "bg-[#E6F3FB] text-[#0687C9] font-medium"
                  : "text-neutral-600 hover:bg-[#E6F3FB] hover:text-[#0687C9]"
              }`}
            >
              <ClipboardList
                className={`mr-3 h-5 w-5 ${
                  isLinkActive("/dashboard/attendance")
                    ? "text-[#0687C9]"
                    : "text-neutral-600 group-hover:text-[#0687C9]"
                }`}
              />
              Kehadiran
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/lecturers"
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all group ${
                isLinkActive("/dashboard/lecturers")
                  ? "bg-[#E6F3FB] text-[#0687C9] font-medium"
                  : "text-neutral-600 hover:bg-[#E6F3FB] hover:text-[#0687C9]"
              }`}
            >
              <Users
                className={`mr-3 h-5 w-5 ${
                  isLinkActive("/dashboard/lecturers")
                    ? "text-[#0687C9]"
                    : "text-neutral-600 group-hover:text-[#0687C9]"
                }`}
              />
              Dosen
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

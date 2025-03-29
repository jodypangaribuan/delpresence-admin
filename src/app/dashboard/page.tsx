"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Users,
  Book,
  GraduationCap,
  ClipboardCheck,
  CalendarDays,
  AlertTriangle,
  Clock,
  Building2,
  UserCheck,
  FileBarChart,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [stats] = useState({
    students: 1615,
    lecturers: 98,
    courses: 76,
    attendanceToday: 243,
    pendingApprovals: 12,
  });

  return (
    <div className="space-y-8">
      {/* Main Stats Cards */}
      <div>
        <h2 className="text-xl font-bold text-[#1E293B] mb-4">
          Statistik Utama
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Mahasiswa"
            value={stats.students.toLocaleString()}
            icon={<Users className="h-5 w-5 text-white" />}
            iconBg="bg-[#0687C9]"
            trend="+5% dari bulan lalu"
            href="/dashboard/students"
          />
          <StatCard
            title="Total Dosen"
            value={stats.lecturers.toLocaleString()}
            icon={<GraduationCap className="h-5 w-5 text-white" />}
            iconBg="bg-[#0EA5E9]"
            trend="Stabil"
            href="/dashboard/lecturers"
          />
          <StatCard
            title="Mata Kuliah Aktif"
            value={stats.courses.toLocaleString()}
            icon={<Book className="h-5 w-5 text-white" />}
            iconBg="bg-[#14B8A6]"
            trend="+2 mata kuliah baru"
            href="/dashboard/courses"
          />
          <StatCard
            title="Presensi Hari Ini"
            value={stats.attendanceToday.toLocaleString()}
            icon={<ClipboardCheck className="h-5 w-5 text-white" />}
            iconBg="bg-[#8B5CF6]"
            trend="86% tingkat kehadiran"
            href="/dashboard/attendance"
          />
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-xl font-bold text-[#1E293B] mb-4">Akses Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <QuickAccessCard
            title="Kelola Kelas"
            description="Atur kelas dan jadwal kuliah"
            icon={<Building2 className="h-6 w-6 text-[#0687C9]" />}
            href="/dashboard/classes"
          />
          <QuickAccessCard
            title="Verifikasi Izin"
            description={`${stats.pendingApprovals} permintaan menunggu`}
            icon={<AlertTriangle className="h-6 w-6 text-[#F59E0B]" />}
            href="/dashboard/approvals"
            badge={stats.pendingApprovals > 0}
          />
          <QuickAccessCard
            title="Laporan Presensi"
            description="Statistik & analitik presensi"
            icon={<FileBarChart className="h-6 w-6 text-[#10B981]" />}
            href="/dashboard/reports"
          />
          <QuickAccessCard
            title="Jadwal Akademik"
            description="Kelola kalender akademik"
            icon={<CalendarDays className="h-6 w-6 text-[#8B5CF6]" />}
            href="/dashboard/schedules"
          />
        </div>
      </div>

      {/* Recent Activity and Upcoming Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-[#1E293B] mb-4">
            Aktivitas Terbaru
          </h2>
          <Card className="p-6 bg-white border-[#E2E8F0]">
            <div className="space-y-4">
              <ActivityItem
                title="Permintaan Izin Baru"
                description="Mahasiswa Andi Saputra mengajukan izin sakit untuk mata kuliah Algoritma"
                time="10 menit yang lalu"
                type="approval"
              />
              <ActivityItem
                title="Kelas Algoritma Dimulai"
                description="35 dari 40 mahasiswa telah melakukan presensi"
                time="45 menit yang lalu"
                type="class"
              />
              <ActivityItem
                title="Perubahan Jadwal"
                description="Jadwal Kalkulus dipindahkan dari Selasa ke Kamis"
                time="2 jam yang lalu"
                type="schedule"
              />
              <ActivityItem
                title="Mahasiswa Baru Terdaftar"
                description="5 mahasiswa baru ditambahkan ke sistem"
                time="3 jam yang lalu"
                type="user"
              />
            </div>
            <Link
              href="/dashboard/activities"
              className="inline-block mt-6 text-sm text-[#0687C9] hover:text-[#0466a2] font-medium transition-colors"
            >
              Lihat semua aktivitas
            </Link>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#1E293B] mb-4">
            Kelas Hari Ini
          </h2>
          <Card className="p-6 bg-white border-[#E2E8F0]">
            <div className="space-y-4">
              <ClassItem
                course="Algoritma dan Pemrograman"
                lecturer="Dr. Budi Santoso"
                time="08:00 - 09:40"
                room="Lab Komputer 1"
                attendance="35/40"
                status="ongoing"
              />
              <ClassItem
                course="Basis Data"
                lecturer="Dr. Siti Aminah"
                time="10:00 - 11:40"
                room="Lab Komputer 2"
                attendance="42/45"
                status="completed"
              />
              <ClassItem
                course="Kalkulus II"
                lecturer="Prof. Joko Widodo"
                time="13:00 - 14:40"
                room="Ruang 3.2"
                attendance="38/38"
                status="upcoming"
              />
              <ClassItem
                course="Sistem Digital"
                lecturer="Dr. Ahmad Dahlan"
                time="15:00 - 16:40"
                room="Lab Digital"
                attendance="28/30"
                status="upcoming"
              />
            </div>
            <Link
              href="/dashboard/schedule/today"
              className="inline-block mt-6 text-sm text-[#0687C9] hover:text-[#0466a2] font-medium transition-colors"
            >
              Lihat semua kelas
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  icon,
  iconBg,
  trend,
  href,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  trend: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="p-6 bg-white border-[#E2E8F0] hover:shadow-md transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-lg ${iconBg}`}>{icon}</div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#1E293B]">{value}</p>
            <p className="text-sm font-medium text-[#64748B] mt-1">{title}</p>
            <p className="text-xs text-[#94A3B8] mt-2">{trend}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

// Quick Access Card Component
function QuickAccessCard({
  title,
  description,
  icon,
  href,
  badge = false,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: boolean;
}) {
  return (
    <Link href={href}>
      <div className="p-6 rounded-lg bg-white border border-[#E2E8F0] hover:shadow-md transition-all h-full relative">
        {badge && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            !
          </span>
        )}
        <div className="flex flex-col space-y-3">
          <div className="p-2.5 rounded-lg bg-[#F8FAFC] inline-block self-start">
            {icon}
          </div>
          <h3 className="font-semibold text-[#1E293B]">{title}</h3>
          <p className="text-sm text-[#64748B]">{description}</p>
        </div>
      </div>
    </Link>
  );
}

// Activity Item Component
function ActivityItem({
  title,
  description,
  time,
  type,
}: {
  title: string;
  description: string;
  time: string;
  type: "approval" | "class" | "schedule" | "user";
}) {
  const getIcon = () => {
    switch (type) {
      case "approval":
        return <AlertTriangle className="h-5 w-5 text-[#F59E0B]" />;
      case "class":
        return <ClipboardCheck className="h-5 w-5 text-[#10B981]" />;
      case "schedule":
        return <CalendarDays className="h-5 w-5 text-[#8B5CF6]" />;
      case "user":
        return <Users className="h-5 w-5 text-[#0687C9]" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-[#94A3B8]" />;
    }
  };

  return (
    <div className="p-4 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
      <div className="flex gap-3">
        <div className="p-2 bg-[#F1F5F9] rounded-lg self-start">
          {getIcon()}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#1E293B]">{title}</h3>
          <p className="text-sm text-[#64748B] mt-1">{description}</p>
          <p className="text-xs text-[#94A3B8] mt-2">{time}</p>
        </div>
      </div>
    </div>
  );
}

// Class Item Component
function ClassItem({
  course,
  lecturer,
  time,
  room,
  attendance,
  status,
}: {
  course: string;
  lecturer: string;
  time: string;
  room: string;
  attendance: string;
  status: "upcoming" | "ongoing" | "completed";
}) {
  const getStatusColor = () => {
    switch (status) {
      case "upcoming":
        return "bg-[#E0F2FE] text-[#0C4A6E]";
      case "ongoing":
        return "bg-[#DCFCE7] text-[#14532D]";
      case "completed":
        return "bg-[#F1F5F9] text-[#475569]";
      default:
        return "bg-[#F1F5F9] text-[#475569]";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "upcoming":
        return "Akan Datang";
      case "ongoing":
        return "Sedang Berlangsung";
      case "completed":
        return "Selesai";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="p-4 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold text-[#1E293B]">{course}</h3>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor()}`}
        >
          {getStatusText()}
        </span>
      </div>
      <p className="text-sm text-[#64748B] mt-1">Pengajar: {lecturer}</p>
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="flex items-center text-xs text-[#64748B]">
          <Clock className="h-3.5 w-3.5 mr-1.5 text-[#94A3B8]" /> {time}
        </div>
        <div className="flex items-center text-xs text-[#64748B]">
          <Building2 className="h-3.5 w-3.5 mr-1.5 text-[#94A3B8]" /> {room}
        </div>
        <div className="flex items-center text-xs text-[#64748B]">
          <UserCheck className="h-3.5 w-3.5 mr-1.5 text-[#94A3B8]" />{" "}
          {attendance}
        </div>
      </div>
    </div>
  );
}

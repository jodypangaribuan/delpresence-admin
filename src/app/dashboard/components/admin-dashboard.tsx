"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Users,
  UserCog,
  School,
  Building,
  BookOpen,
  BarChart2,
  ArrowUpRight,
  Server,
  Shield,
  CheckCircle,
  FileOutput,
  BarChart,
  FolderSync,
  Globe,
  PersonStanding,
  Lock,
  GanttChart,
  Settings,
  CalendarDays,
  FileSpreadsheet,
  ClipboardCheck,
  BellRing,
  AlertTriangle,
  Clock,
  PieChart,
  UserPlus,
  KeyRound,
  History,
  DoorOpen,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats] = useState({
    totalLecturers: 56,
    totalAssistants: 18,
    totalStudents: 1240,
    activeCourses: 42,
    departments: 6,
    avgAttendance: 87,
    pendingApprovals: 3,
    activeClasses: 178,
    missedClasses: 12,
    conflictingSchedules: 0,
  });

  return (
    <div className="space-y-8">
      {/* Stats cards */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Statistik Kampus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Dosen"
            value={stats.totalLecturers.toString()}
            icon={<PersonStanding className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Aktif mengajar"
          />
          <StatCard
            title="Total Asisten Dosen"
            value={stats.totalAssistants.toString()}
            icon={<UserCog className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Membantu dosen"
          />
          <StatCard
            title="Total Mahasiswa"
            value={stats.totalStudents.toString()}
            icon={<Users className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Aktif studi"
          />
          <StatCard
            title="Rata-rata Kehadiran"
            value={`${stats.avgAttendance}%`}
            icon={<BarChart className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Seluruh kampus"
          />
        </div>
      </div>

      {/* Schedule Stats */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Statistik Jadwal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Kelas Aktif"
            value={stats.activeClasses.toString()}
            icon={<Clock className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Semester ini"
          />
          <StatCard
            title="Kelas Hilang/Kosong"
            value={stats.missedClasses.toString()}
            icon={<AlertTriangle className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Perlu penggantian"
          />
          <StatCard
            title="Konflik Jadwal"
            value={stats.conflictingSchedules.toString()}
            icon={<BellRing className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Perlu penyelesaian"
          />
        </div>
      </div>

      {/* Schedule & Course Management */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Manajemen Jadwal & Matakuliah
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Kelola Jadwal Perkuliahan"
            description="Tambah, edit, hapus jadwal (otomatis/manual)"
            icon={<CalendarDays className="h-5 w-5 text-primary" />}
            href="/dashboard/schedules/manage"
            textColor="text-primary"
          />
          <FeatureCard
            title="Import Jadwal (Excel)"
            description="Upload & impor jadwal kuliah dari Excel"
            icon={<FileSpreadsheet className="h-5 w-5 text-primary" />}
            href="/dashboard/schedules/import"
            textColor="text-primary"
          />
          <FeatureCard
            title="Penjadwalan Ruangan & Sesi"
            description="Atur jadwal berdasarkan ruang dan waktu"
            icon={<Building className="h-5 w-5 text-primary" />}
            href="/dashboard/schedules/rooms"
            textColor="text-primary"
          />
          <FeatureCard
            title="Pengecekan Konflik Jadwal"
            description="Deteksi bentrok jadwal dosen/ruang/kelas"
            icon={<AlertTriangle className="h-5 w-5 text-primary" />}
            href="/dashboard/schedules/conflicts"
            textColor="text-primary"
          />
          <FeatureCard
            title="Kelompok Matakuliah"
            description="Kelola matakuliah berdasarkan prodi & semester"
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            href="/dashboard/courses/groups"
            textColor="text-primary"
          />
          <FeatureCard
            title="Jadwal Pengganti"
            description="Kelola kelas pengganti dan jadwal alternatif"
            icon={<Clock className="h-5 w-5 text-primary" />}
            href="/dashboard/schedules/replacement"
            textColor="text-primary"
          />
        </div>
      </div>

      {/* Academic Management */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Manajemen Akademik
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Kelola Dosen"
            description="Tambah, edit, hapus data dosen"
            icon={<PersonStanding className="h-5 w-5 text-primary" />}
            href="/dashboard/academic/lecturers"
            textColor="text-primary"
          />
          <FeatureCard
            title="Kelola Asisten Dosen"
            description="Tambah, edit, hapus data asisten dosen"
            icon={<UserCog className="h-5 w-5 text-primary" />}
            href="/dashboard/academic/assistants"
            textColor="text-primary"
          />
          <FeatureCard
            title="Kelola Mahasiswa"
            description="Tambah, edit, hapus data mahasiswa"
            icon={<Users className="h-5 w-5 text-primary" />}
            href="/dashboard/academic/students"
            textColor="text-primary"
          />
          <FeatureCard
            title="Kelola Matakuliah"
            description="Tambah, edit, hapus data matakuliah"
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            href="/dashboard/academic/courses"
            textColor="text-primary"
          />
          <FeatureCard
            title="Kelola Ruangan"
            description="Tambah, edit, hapus data ruangan"
            icon={<DoorOpen className="h-5 w-5 text-primary" />}
            href="/dashboard/academic/rooms"
            textColor="text-primary"
          />
          <FeatureCard
            title="Kelola Program Studi"
            description="Tambah, edit, hapus data program studi"
            icon={<School className="h-5 w-5 text-primary" />}
            href="/dashboard/academic/departments"
            textColor="text-primary"
          />
        </div>
      </div>

      {/* Rekapitulasi & Monitoring */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Rekapitulasi & Monitoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Statistik Kehadiran Mahasiswa"
            description="Pantau kehadiran per mata kuliah"
            icon={<BarChart2 className="h-5 w-5 text-primary" />}
            href="/dashboard/reports/student-attendance"
            textColor="text-primary"
          />
          <FeatureCard
            title="Statistik Kehadiran Dosen"
            description="Data dosen mangkir/izin/cuti"
            icon={<PieChart className="h-5 w-5 text-primary" />}
            href="/dashboard/reports/lecturer-attendance"
            textColor="text-primary"
          />
          <FeatureCard
            title="Rekap Kelas"
            description="Detail kelas aktif/hilang/kosong"
            icon={<ClipboardCheck className="h-5 w-5 text-primary" />}
            href="/dashboard/reports/class-summary"
            textColor="text-primary"
          />
          <FeatureCard
            title="Visualisasi Kehadiran"
            description="Grafik kehadiran mingguan/semester"
            icon={<GanttChart className="h-5 w-5 text-primary" />}
            href="/dashboard/reports/attendance-charts"
            textColor="text-primary"
          />
          <FeatureCard
            title="Ekspor Laporan"
            description="Download laporan kehadiran ke Excel/PDF"
            icon={<FileOutput className="h-5 w-5 text-primary" />}
            href="/dashboard/reports/export"
            textColor="text-primary"
          />
          <FeatureCard
            title="Dashboard Monitoring"
            description="Pantau aktivitas kampus secara real-time"
            icon={<BarChart className="h-5 w-5 text-primary" />}
            href="/dashboard/reports/monitoring"
            textColor="text-primary"
          />
        </div>
      </div>

      {/* Kontrol Akses */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Kontrol Akses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Manajemen Akun"
            description="Kelola akun dan peran pengguna"
            icon={<UserPlus className="h-5 w-5 text-primary" />}
            href="/dashboard/access/accounts"
            textColor="text-primary"
          />
          <FeatureCard
            title="Reset Password"
            description="Reset password pengguna sistem"
            icon={<KeyRound className="h-5 w-5 text-primary" />}
            href="/dashboard/access/reset-password"
            textColor="text-primary"
          />
          <FeatureCard
            title="Log Aktivitas"
            description="Pantau aktivitas pengguna di sistem"
            icon={<History className="h-5 w-5 text-primary" />}
            href="/dashboard/access/activity-logs"
            textColor="text-primary"
          />
          <FeatureCard
            title="Keamanan Sistem"
            description="Konfigurasi kebijakan keamanan"
            icon={<Shield className="h-5 w-5 text-primary" />}
            href="/dashboard/access/security"
            textColor="text-primary"
          />
          <FeatureCard
            title="Hak Akses Peran"
            description="Konfigurasi izin berbasis peran"
            icon={<Lock className="h-5 w-5 text-primary" />}
            href="/dashboard/access/roles"
            textColor="text-primary"
          />
          <FeatureCard
            title="Backup & Restore"
            description="Kelola pencadangan data sistem"
            icon={<FolderSync className="h-5 w-5 text-primary" />}
            href="/dashboard/access/backup"
            textColor="text-primary"
          />
        </div>
      </div>

      {/* System Integration */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Integrasi Sistem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Integrasi SIAKAD"
            description="Sinkronisasi data dengan SIAKAD"
            icon={<Globe className="h-5 w-5 text-primary" />}
            href="/dashboard/integration/siakad"
            textColor="text-primary"
          />
          <FeatureCard
            title="Konfigurasi API"
            description="Kelola endpoint dan integrasi API"
            icon={<Server className="h-5 w-5 text-primary" />}
            href="/dashboard/integration/api"
            textColor="text-primary"
          />
          <FeatureCard
            title="Pengaturan Sistem"
            description="Konfigurasi aplikasi dan parameter"
            icon={<Settings className="h-5 w-5 text-primary" />}
            href="/dashboard/integration/settings"
            textColor="text-primary"
          />
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionCard
            title="Tambah Jadwal"
            href="/dashboard/schedules/add"
            color="bg-primary/10"
            textColor="text-primary"
          />
          <ActionCard
            title="Tambah Pengguna"
            href="/dashboard/access/add-user"
            color="bg-primary/10"
            textColor="text-primary"
          />
          <ActionCard
            title="Ekspor Laporan"
            href="/dashboard/reports/export"
            color="bg-primary/10"
            textColor="text-primary"
          />
          <ActionCard
            title="Cek Konflik"
            href="/dashboard/schedules/conflicts"
            color="bg-primary/10"
            textColor="text-primary"
          />
        </div>
      </div>

      {/* System Status and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Status Sistem
          </h2>
          <Card className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg">
            <div className="space-y-4">
              <StatusItem
                title="Server Database"
                status="operational"
                lastUpdate="5 menit yang lalu"
                detail="Load: 12%, Storage: 42% terpakai"
              />
              <StatusItem
                title="Server Aplikasi"
                status="operational"
                lastUpdate="5 menit yang lalu"
                detail="Load: 18%, Memory: 34% terpakai"
              />
              <StatusItem
                title="Integrasi SIAKAD"
                status="operational"
                lastUpdate="1 jam yang lalu"
                detail="Sinkronisasi terakhir: 10:45 WIB"
              />
              <StatusItem
                title="Sistem QR Code"
                status="operational"
                lastUpdate="15 menit yang lalu"
                detail="Aktif untuk 24 kelas hari ini"
              />
              <div className="pt-2">
                <Link
                  href="/dashboard/system-status"
                  className="text-sm text-primary hover:text-primary/90 font-medium transition-colors flex items-center gap-1"
                >
                  <span>Lihat Detail Status</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Aktivitas Sistem Terkini
          </h2>
          <Card className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg">
            <div className="space-y-4">
              <ActivityItem
                action="Jadwal Diperbarui"
                description="Penambahan 2 jadwal kelas di ruang Lab 3"
                time="15 menit yang lalu"
                icon={<CalendarDays className="h-4 w-4 text-primary" />}
              />
              <ActivityItem
                action="Pengguna Baru"
                description="3 akun asisten dosen baru ditambahkan"
                time="1 jam yang lalu"
                icon={<UserCog className="h-4 w-4 text-primary" />}
              />
              <ActivityItem
                action="Konflik Terdeteksi"
                description="Bentrok jadwal ditemukan pada 2 kelas"
                time="2 jam yang lalu"
                icon={<AlertTriangle className="h-4 w-4 text-yellow-500" />}
              />
              <ActivityItem
                action="Ekspor Laporan"
                description="Laporan kehadiran bulan ini diunduh"
                time="3 jam yang lalu"
                icon={<FileOutput className="h-4 w-4 text-primary" />}
              />
              <div className="pt-2">
                <Link
                  href="/dashboard/activity-logs"
                  className="text-sm text-primary hover:text-primary/90 font-medium transition-colors flex items-center gap-1"
                >
                  <span>Lihat Log Lengkap</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
  textColor,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  trend: string;
}) {
  return (
    <Card className="p-6 bg-white border border-gray-100 hover:shadow-md transition-all h-full rounded-lg">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className={`text-sm font-medium ${textColor}`}>{title}</p>
          <p className="text-xs text-gray-500 mt-1">{trend}</p>
        </div>
      </div>
    </Card>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  href,
  textColor,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  textColor: string;
}) {
  return (
    <Link href={href}>
      <Card className="border border-gray-100 hover:shadow-md transition-all h-full overflow-hidden rounded-lg">
        <div className={`bg-primary p-4`}>
          <div className="flex justify-between items-center">
            <div className="bg-white/80 p-2 rounded-lg">{icon}</div>
            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="p-4">
          <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </Card>
    </Link>
  );
}

function ActionCard({
  title,
  href,
  color,
  textColor,
}: {
  title: string;
  href: string;
  color: string;
  textColor: string;
}) {
  return (
    <Link href={href}>
      <div
        className={`${color} ${textColor} p-4 rounded-lg text-center hover:shadow-sm transition-all border border-gray-100`}
      >
        <p className="font-medium">{title}</p>
      </div>
    </Link>
  );
}

function StatusItem({
  title,
  status,
  lastUpdate,
  detail,
}: {
  title: string;
  status: "operational" | "degraded" | "outage";
  lastUpdate: string;
  detail: string;
}) {
  const getStatusColor = () => {
    switch (status) {
      case "operational":
        return "text-green-500";
      case "degraded":
        return "text-yellow-500";
      case "outage":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "operational":
        return "Operasional";
      case "degraded":
        return "Performa Menurun";
      case "outage":
        return "Gangguan";
      default:
        return "Tidak Diketahui";
    }
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="p-2 bg-gray-100 rounded-full">
        <CheckCircle className={`h-4 w-4 ${getStatusColor()}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-800">{title}</h4>
          <span className={`text-xs font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">{detail}</p>
        <p className="text-xs text-gray-400 mt-1">
          Terakhir update: {lastUpdate}
        </p>
      </div>
    </div>
  );
}

function ActivityItem({
  action,
  description,
  time,
  icon,
}: {
  action: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start space-x-3">
      <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <h4 className="text-sm font-medium text-gray-800">{action}</h4>
        <p className="text-xs text-gray-600">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

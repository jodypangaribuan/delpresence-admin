"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Users,
  Book,
  ClipboardCheck,
  BarChart2,
  ArrowUpRight,
  Clock,
  MapPin,
  FileText,
  UserCheck,
  CheckCircle,
  QrCode,
  FileOutput,
  BarChart,
  PieChart,
  Database,
  CheckCheck,
  BookOpen,
  CalendarClock,
} from "lucide-react";
import Link from "next/link";

export default function AssistantDashboard() {
  const [stats] = useState({
    lecturers: 3,
    totalStudents: 145,
    attendanceToday: 91,
    totalAttendance: 87,
    pendingApprovals: 3,
  });

  return (
    <div className="space-y-8">
      {/* Stats cards */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Statistik Kehadiran
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Dosen Dibantu"
            value={stats.lecturers.toString()}
            icon={<Book className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="+1 dari bulan lalu"
          />
          <StatCard
            title="Total Mahasiswa"
            value={stats.totalStudents.toString()}
            icon={<Users className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Di 7 kelas"
          />
          <StatCard
            title="Presensi Hari Ini"
            value={`${stats.attendanceToday}%`}
            icon={<ClipboardCheck className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Meningkat 1%"
          />
          <StatCard
            title="Rata-rata Kehadiran"
            value={`${stats.totalAttendance}%`}
            icon={<BarChart className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Semester ini"
          />
        </div>
      </div>

      {/* Task details for assistant */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Detail Tugas Asisten
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Sesi Lab Bulan Ini"
            value="12"
            icon={<Database className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Dari 4 mata kuliah"
          />
          <StatCard
            title="Tugas Diperiksa"
            value="35"
            icon={<CheckCheck className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Minggu ini"
          />
          <StatCard
            title="Sesi Konsultasi"
            value="8"
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            color="bg-primary/10"
            textColor="text-primary"
            trend="Minggu ini"
          />
        </div>
      </div>

      {/* Upcoming lab sessions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Sesi Lab Hari Ini</h2>
          <Link
            href="/dashboard/schedules"
            className="text-sm text-primary hover:text-primary/90 font-medium transition-colors flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <ClassCard
            course="Praktikum Algoritma dan Pemrograman"
            lecturer="Dr. Budi Santoso"
            time="08:00 - 09:40"
            room="Lab Komputer 1"
            totalStudents={30}
            presentStudents={27}
            status="ongoing"
          />
          <ClassCard
            course="Praktikum Basis Data"
            lecturer="Dr. Ani Wijaya"
            time="10:00 - 11:40"
            room="Lab Komputer 2"
            totalStudents={32}
            presentStudents={0}
            status="upcoming"
          />
          <ClassCard
            course="Praktikum Pemrograman Berorientasi Objek"
            lecturer="Dr. Citra Alam"
            time="13:00 - 14:40"
            room="Lab Komputer 3"
            totalStudents={28}
            presentStudents={0}
            status="upcoming"
          />
        </div>
      </div>

      {/* Attendance Management Features */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Manajemen Kehadiran
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Generate QR Kelas"
            description="Buat QR untuk presensi kelas"
            icon={<QrCode className="h-5 w-5 text-primary" />}
            href="/dashboard/qr-generate"
            textColor="text-primary"
          />
          <FeatureCard
            title="Jadwal Asisten"
            description="Lihat jadwal tugas lab anda"
            icon={<CalendarClock className="h-5 w-5 text-primary" />}
            href="/dashboard/assistant-schedule"
            textColor="text-primary"
          />
          <FeatureCard
            title="Monitor Real-time"
            description="Pantau kehadiran siswa secara real-time"
            icon={<ClipboardCheck className="h-5 w-5 text-primary" />}
            href="/dashboard/realtime-monitor"
            textColor="text-primary"
          />
        </div>
      </div>

      {/* Lab Management Features - Specific for Assistants */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Manajemen Praktikum
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Materi Praktikum"
            description="Kelola dokumen dan tugas praktikum"
            icon={<FileText className="h-5 w-5 text-primary" />}
            href="/dashboard/lab-materials"
            textColor="text-primary"
          />
          <FeatureCard
            title="Penilaian Praktikum"
            description="Berikan nilai tugas lab mahasiswa"
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            href="/dashboard/lab-grades"
            textColor="text-primary"
          />
          <FeatureCard
            title="Konsultasi"
            description="Kelola jadwal konsultasi dengan mahasiswa"
            icon={<Users className="h-5 w-5 text-primary" />}
            href="/dashboard/consultation"
            textColor="text-primary"
          />
        </div>
      </div>

      {/* Student Management Features */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Manajemen Mahasiswa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Daftar Mahasiswa"
            description="Kelola data mahasiswa kelas Anda"
            icon={<Users className="h-5 w-5 text-primary" />}
            href="/dashboard/student-list"
            textColor="text-primary"
          />
          <FeatureCard
            title="Verifikasi Perizinan"
            description="Kelola dan verifikasi permintaan izin"
            icon={<UserCheck className="h-5 w-5 text-primary" />}
            href="/dashboard/leave-requests"
            textColor="text-primary"
          />
          <FeatureCard
            title="Tracking Perizinan"
            description="Lacak status perizinan mahasiswa"
            icon={<CheckCircle className="h-5 w-5 text-primary" />}
            href="/dashboard/student-permissions"
            textColor="text-primary"
          />
        </div>
      </div>

      {/* Reporting Features */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Laporan & Analisis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Statistik Praktikum"
            description="Lihat tren dan statistik kehadiran lab"
            icon={<BarChart2 className="h-5 w-5 text-primary" />}
            href="/dashboard/lab-stats"
            textColor="text-primary"
          />
          <FeatureCard
            title="Laporan untuk Dosen"
            description="Siapkan laporan untuk dosen pengampu"
            icon={<PieChart className="h-5 w-5 text-primary" />}
            href="/dashboard/lecturer-reports"
            textColor="text-primary"
          />
          <FeatureCard
            title="Ekspor Data"
            description="Ekspor data kehadiran praktikum"
            icon={<FileOutput className="h-5 w-5 text-primary" />}
            href="/dashboard/export-lab-data"
            textColor="text-primary"
          />
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionCard
            title="Buka Presensi"
            href="/dashboard/attendance/create"
            color="bg-primary/10"
            textColor="text-primary"
          />
          <ActionCard
            title="Lihat Notifikasi"
            href="/dashboard/notifications"
            color="bg-primary/10"
            textColor="text-primary"
          />
          <ActionCard
            title="QR Presensi"
            href="/dashboard/qr-generate"
            color="bg-primary/10"
            textColor="text-primary"
          />
          <ActionCard
            title="Jadwal Tugas"
            href="/dashboard/schedules"
            color="bg-primary/10"
            textColor="text-primary"
          />
        </div>
      </div>

      {/* Pending Tasks and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Persetujuan Menunggu
          </h2>
          <Card className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg">
            <div className="space-y-4">
              {stats.pendingApprovals > 0 ? (
                <>
                  <ApprovalItem
                    studentName="Andi Saputra"
                    course="Praktikum Algoritma dan Pemrograman"
                    date="Hari ini, 7 April 2025"
                    reason="Sakit"
                    type="illness"
                  />
                  <ApprovalItem
                    studentName="Budi Santoso"
                    course="Praktikum Basis Data"
                    date="Kemarin, 6 April 2025"
                    reason="Kegiatan Organisasi"
                    type="activity"
                  />
                  <div className="pt-2">
                    <Link
                      href="/dashboard/leave-requests"
                      className="text-sm text-primary hover:text-primary/90 font-medium transition-colors flex items-center gap-1"
                    >
                      <span>Lihat Semua Persetujuan</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center">
                  <CheckCircle className="h-10 w-10 mx-auto text-green-500 mb-2" />
                  <h3 className="text-lg font-medium text-gray-800">
                    Tidak Ada Persetujuan Pending
                  </h3>
                  <p className="text-sm text-gray-500">
                    Semua persetujuan telah ditangani.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Aktivitas Terkini
          </h2>
          <Card className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg">
            <div className="space-y-4">
              <ActivityItem
                action="QR Dibuat"
                description="QR untuk Praktikum Algoritma dan Pemrograman"
                time="15 menit yang lalu"
                icon={<QrCode className="h-4 w-4 text-primary" />}
              />
              <ActivityItem
                action="Presensi Dimulai"
                description="Sesi presensi untuk Praktikum Basis Data dibuka"
                time="1 jam yang lalu"
                icon={<Clock className="h-4 w-4 text-green-500" />}
              />
              <ActivityItem
                action="Izin Disetujui"
                description="Persetujuan izin untuk Dewi Lestari"
                time="2 jam yang lalu"
                icon={<CheckCircle className="h-4 w-4 text-green-500" />}
              />
              <ActivityItem
                action="Tugas Lab Diperiksa"
                description="5 tugas lab Basis Data telah diperiksa"
                time="3 jam yang lalu"
                icon={<FileText className="h-4 w-4 text-primary" />}
              />
              <div className="pt-2">
                <Link
                  href="/dashboard/activity"
                  className="text-sm text-primary hover:text-primary/90 font-medium transition-colors flex items-center gap-1"
                >
                  <span>Lihat Semua Aktivitas</span>
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

// Stats Card Component
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

// Feature Card Component
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

// Class Card Component
function ClassCard({
  course,
  lecturer,
  time,
  room,
  totalStudents,
  presentStudents,
  status,
}: {
  course: string;
  lecturer: string;
  time: string;
  room: string;
  totalStudents: number;
  presentStudents: number;
  status: "upcoming" | "ongoing" | "completed";
}) {
  const getStatusColor = () => {
    if (status === "ongoing") return "bg-green-100 text-green-800";
    if (status === "upcoming") return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
  };

  const getStatusText = () => {
    if (status === "ongoing") return "Sedang Berlangsung";
    if (status === "upcoming") return "Akan Datang";
    return "Selesai";
  };

  return (
    <Card className="p-4 bg-white border border-gray-100 shadow-sm rounded-lg">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-bold text-gray-800">{course}</h3>
          <p className="text-sm text-gray-600">Dosen: {lecturer}</p>
          <div className="flex items-center text-gray-500 space-x-3 text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{room}</span>
            </div>
          </div>
        </div>
        <div
          className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor()}`}
        >
          {getStatusText()}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <div className="text-xs text-gray-500">
            {status === "ongoing"
              ? `${presentStudents} dari ${totalStudents} mahasiswa hadir`
              : `${totalStudents} mahasiswa terdaftar`}
          </div>
          <div className="text-xs font-medium text-primary">
            {status === "ongoing"
              ? `${Math.round((presentStudents / totalStudents) * 100)}%`
              : "-"}
          </div>
        </div>
        {status === "ongoing" && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{
                width: `${Math.round(
                  (presentStudents / totalStudents) * 100
                )}%`,
              }}
            ></div>
          </div>
        )}
      </div>

      <div className="mt-4 flex space-x-2">
        {status === "upcoming" && (
          <>
            <Link
              href={`/dashboard/qr-generate?course=${encodeURIComponent(
                course
              )}`}
              className="flex-1 py-2 px-3 bg-primary text-white text-xs font-medium rounded-md flex justify-center items-center"
            >
              <QrCode className="h-3 w-3 mr-1" />
              Generate QR
            </Link>
            <Link
              href={`/dashboard/student-list?course=${encodeURIComponent(
                course
              )}`}
              className="flex-1 py-2 px-3 bg-gray-100 text-gray-800 text-xs font-medium rounded-md flex justify-center items-center"
            >
              <Users className="h-3 w-3 mr-1" />
              Lihat Mahasiswa
            </Link>
          </>
        )}
        {status === "ongoing" && (
          <>
            <Link
              href={`/dashboard/realtime-monitor?course=${encodeURIComponent(
                course
              )}`}
              className="flex-1 py-2 px-3 bg-primary text-white text-xs font-medium rounded-md flex justify-center items-center"
            >
              <BarChart className="h-3 w-3 mr-1" />
              Monitor Kehadiran
            </Link>
            <Link
              href={`/dashboard/student-list?course=${encodeURIComponent(
                course
              )}`}
              className="flex-1 py-2 px-3 bg-gray-100 text-gray-800 text-xs font-medium rounded-md flex justify-center items-center"
            >
              <Users className="h-3 w-3 mr-1" />
              Lihat Mahasiswa
            </Link>
          </>
        )}
        {status === "completed" && (
          <>
            <Link
              href={`/dashboard/attendance-summary?course=${encodeURIComponent(
                course
              )}`}
              className="flex-1 py-2 px-3 bg-primary text-white text-xs font-medium rounded-md flex justify-center items-center"
            >
              <BarChart className="h-3 w-3 mr-1" />
              Ringkasan Kehadiran
            </Link>
            <Link
              href={`/dashboard/export-attendance?course=${encodeURIComponent(
                course
              )}`}
              className="flex-1 py-2 px-3 bg-gray-100 text-gray-800 text-xs font-medium rounded-md flex justify-center items-center"
            >
              <FileOutput className="h-3 w-3 mr-1" />
              Ekspor Data
            </Link>
          </>
        )}
      </div>
    </Card>
  );
}

// Action Card Component
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

// Approval Item Component
function ApprovalItem({
  studentName,
  course,
  date,
  reason,
  type,
}: {
  studentName: string;
  course: string;
  date: string;
  reason: string;
  type: "illness" | "activity" | "family" | "other";
}) {
  const getReasonIcon = () => {
    switch (type) {
      case "illness":
        return (
          <div className="p-2 bg-red-100 rounded-full text-red-600">🏥</div>
        );
      case "activity":
        return (
          <div className="p-2 bg-blue-100 rounded-full text-blue-600">🎭</div>
        );
      case "family":
        return (
          <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
            👪
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-100 rounded-full text-gray-600">📝</div>
        );
    }
  };

  return (
    <div className="flex items-start space-x-3">
      {getReasonIcon()}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-800">{studentName}</h4>
          <div className="ml-2">
            <div className="flex space-x-2">
              <button className="p-1 text-green-600 hover:text-green-700 transition-colors">
                <CheckCircle className="h-4 w-4" />
              </button>
              <button className="p-1 text-red-600 hover:text-red-700 transition-colors">
                ❌
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-600">{course}</p>
        <p className="text-xs text-gray-500 mt-1">
          <span className="font-medium">Alasan:</span> {reason}
        </p>
        <p className="text-xs text-gray-400 mt-1">{date}</p>
      </div>
    </div>
  );
}

// Activity Item Component
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

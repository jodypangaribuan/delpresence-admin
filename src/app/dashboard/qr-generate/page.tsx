"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  QrCode,
  Clock,
  Calendar,
  Copy,
  Download,
  RefreshCw,
  Share2,
  Timer,
  Users,
  UserCheck,
} from "lucide-react";
import { getUserRole, UserRole } from "@/services/auth";

export default function QRGeneratePage() {
  const searchParams = useSearchParams();
  const [course, setCourse] = useState<string>(
    searchParams.get("course") || ""
  );
  const [userCourses, setUserCourses] = useState<string[]>([]);
  const [qrValue, setQrValue] = useState<string>("");
  const [qrExpiry, setQrExpiry] = useState<number>(300); // 5 minutes in seconds
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [generateTime, setGenerateTime] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [qrActive, setQrActive] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    // Get user role
    const role = getUserRole();
    setUserRole(role);

    // Set course from URL parameter if available
    if (searchParams.get("course")) {
      setCourse(searchParams.get("course") || "");
    }

    // Fetch courses from API (mock data for now)
    setUserCourses([
      "Algoritma dan Pemrograman",
      "Basis Data",
      "Pemrograman Berorientasi Objek",
      "Struktur Data",
      "Pemrograman Web",
    ]);
  }, [searchParams]);

  // Mock function to generate QR code
  const generateQRCode = () => {
    if (!course) {
      alert("Pilih mata kuliah terlebih dahulu");
      return;
    }

    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      // Generate a random code for the QR
      const token = Math.random().toString(36).substring(2, 15);
      const sessionId = Date.now().toString(36);
      const qrData = `delQR:${token}:${sessionId}:${course.replace(
        /\s/g,
        "_"
      )}`;

      setQrValue(qrData);
      setQrActive(true);
      setRemainingTime(qrExpiry);
      setGenerateTime(new Date().toLocaleTimeString());
      setIsGenerating(false);

      // Start countdown
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setQrActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, 1500);
  };

  // Format remaining time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Copy QR value to clipboard
  const copyQRValue = () => {
    if (qrValue) {
      navigator.clipboard.writeText(qrValue);
      alert("Kode QR disalin ke clipboard");
    }
  };

  const isLecturer = userRole === UserRole.LECTURER;
  const isAssistant = userRole === UserRole.ASSISTANT;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Generate QR Code Presensi {isAssistant ? "Praktikum" : "Kelas"}
        </h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{new Date().toLocaleDateString("id-ID")}</span>
          <span className="mx-2">|</span>
          <Clock className="h-4 w-4" />
          <span>{new Date().toLocaleTimeString("id-ID")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Pengaturan QR Code
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="course"
                >
                  Mata Kuliah
                </label>
                <select
                  id="course"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  disabled={qrActive}
                >
                  <option value="">Pilih Mata Kuliah</option>
                  {userCourses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="expiry"
                >
                  Masa Berlaku QR (menit)
                </label>
                <select
                  id="expiry"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={qrExpiry}
                  onChange={(e) => setQrExpiry(Number(e.target.value))}
                  disabled={qrActive}
                >
                  <option value="300">5 menit</option>
                  <option value="600">10 menit</option>
                  <option value="900">15 menit</option>
                  <option value="1800">30 menit</option>
                  <option value="3600">60 menit</option>
                </select>
              </div>

              <button
                className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
                  qrActive
                    ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90"
                } transition-colors`}
                onClick={generateQRCode}
                disabled={qrActive || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : qrActive ? (
                  <>
                    <QrCode className="h-5 w-5" />
                    <span>QR Aktif</span>
                  </>
                ) : (
                  <>
                    <QrCode className="h-5 w-5" />
                    <span>Generate QR</span>
                  </>
                )}
              </button>

              {qrActive && (
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">
                    QR akan kadaluarsa dalam:
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {formatTime(remainingTime)}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Informasi Sesi
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">
                    {isLecturer ? "Dosen" : "Asisten Dosen"}
                  </div>
                  <div className="text-base font-medium">John Doe</div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Tanggal</div>
                  <div className="text-base font-medium">
                    {new Date().toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
              {qrActive && generateTime && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">
                      Waktu Generate QR
                    </div>
                    <div className="text-base font-medium">{generateTime}</div>
                  </div>
                </div>
              )}
              {qrActive && (
                <div className="flex items-center">
                  <Timer className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">
                      Durasi Berlaku QR
                    </div>
                    <div className="text-base font-medium">
                      {qrExpiry / 60} menit
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              QR Code Presensi
            </h2>

            {!qrValue || !qrActive ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 h-80">
                <QrCode className="h-24 w-24 text-gray-300 mb-4" />
                <p className="text-gray-500 text-center max-w-md">
                  {isGenerating
                    ? "Sedang membuat QR code..."
                    : "Pilih mata kuliah dan klik tombol Generate QR untuk membuat kode QR presensi."}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="border-8 border-primary p-2 rounded-lg bg-white">
                    {/* This would normally be a proper QR code component */}
                    <div className="h-64 w-64 bg-white relative overflow-hidden">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                          qrValue
                        )}&size=240x240&margin=10`}
                        alt="QR Code"
                        className="absolute inset-0 h-full w-full object-contain"
                      />
                    </div>
                  </div>
                  {qrActive && (
                    <div className="absolute -top-4 -right-4 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      Aktif
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-2">
                    Arahkan kamera HP ke QR Code untuk presensi
                  </p>
                  <p className="text-sm font-medium text-gray-800 mb-4">
                    Mata Kuliah: <span className="font-bold">{course}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={copyQRValue}
                    className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-md transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Salin Kode</span>
                  </button>
                  <button
                    onClick={() => {
                      // This would be a real download function
                      const link = document.createElement("a");
                      link.download = `QR-${course.replace(/\s/g, "-")}.png`;
                      link.href = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                        qrValue
                      )}&size=1000x1000&margin=20`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-md transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Unduh QR</span>
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `QR Presensi: ${course}`,
                          text: `QR Code untuk presensi mata kuliah ${course}`,
                          url: window.location.href,
                        });
                      } else {
                        alert("Browser tidak mendukung fitur berbagi");
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-md transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Bagikan</span>
                  </button>
                </div>
              </div>
            )}
          </Card>

          {qrActive && (
            <Card className="mt-6 p-6 bg-white border border-gray-100 shadow-sm rounded-lg">
              <h2 className="text-lg font-bold mb-4 text-gray-800">
                Status Presensi
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-medium">Total Mahasiswa:</span>
                  </div>
                  <span className="font-bold">42</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Hadir:</span>
                  </div>
                  <span className="font-bold text-green-500">0</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    <span className="font-medium">Status:</span>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                    Menunggu Kehadiran
                  </span>
                </div>

                <div className="mt-6">
                  <button
                    className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    onClick={() => {
                      window.location.href =
                        "/dashboard/realtime-monitor?course=" +
                        encodeURIComponent(course);
                    }}
                  >
                    Lihat Monitor Kehadiran Real-time
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

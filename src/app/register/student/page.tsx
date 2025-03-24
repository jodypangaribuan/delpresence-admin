"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BsArrowRight,
  BsArrowLeft,
  BsEnvelope,
  BsLock,
  BsCheck2Circle,
  BsPerson,
  BsBook,
  BsMortarboard,
  BsBuilding,
} from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerStudent, StudentRegistrationInput } from "@/lib/auth";

export default function StudentRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<StudentRegistrationInput>({
    nim: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
    major: "",
    faculty: "",
    batch: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: "gray",
  });
  const [emailError, setEmailError] = useState("");

  // Program studi options and their faculties mapping
  const prodiToFakultas: { [key: string]: string } = {
    // Fakultas Informatika dan Teknik Elektro (FITE)
    "S1 Informatika": "Fakultas Informatika dan Teknik Elektro",
    "S1 Sistem Informasi": "Fakultas Informatika dan Teknik Elektro",
    "S1 Teknik Elektro": "Fakultas Informatika dan Teknik Elektro",

    // Fakultas Teknik Industri (FTI)
    "S1 Manajemen Rekayasa": "Fakultas Teknik Industri",
    "S1 Teknik Metalurgi": "Fakultas Teknik Industri",

    // Fakultas VOKASI
    "D4 Teknologi Rekayasa Perangkat Lunak": "Fakultas Vokasi",
    "D3 Teknologi Informasi": "Fakultas Vokasi",
    "D3 Teknologi Komputer": "Fakultas Vokasi",

    // Fakultas Bioteknologi
    "S1 Teknik Bioproses": "Fakultas Bioteknologi",
  };

  // Program studi options
  const prodiOptions = [
    // Fakultas Informatika dan Teknik Elektro (FITE)
    "S1 Informatika",
    "S1 Sistem Informasi",
    "S1 Teknik Elektro",

    // Fakultas Teknik Industri (FTI)
    "S1 Manajemen Rekayasa",
    "S1 Teknik Metalurgi",

    // Fakultas VOKASI
    "D4 Teknologi Rekayasa Perangkat Lunak",
    "D3 Teknologi Informasi",
    "D3 Teknologi Komputer",

    // Fakultas Bioteknologi
    "S1 Teknik Bioproses",
  ];

  // Angkatan options
  const angkatanOptions = [
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to check password strength
  const checkPasswordStrength = (password: string) => {
    if (!password) {
      return {
        score: 0,
        message: "",
        color: "gray",
      };
    }

    // Check password length
    const lengthScore = password.length >= 8 ? 1 : 0;

    // Check for uppercase letters
    const hasUppercase = /[A-Z]/.test(password);

    // Check for lowercase letters
    const hasLowercase = /[a-z]/.test(password);

    // Check for numbers
    const hasNumber = /[0-9]/.test(password);

    // Check for special characters
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    // Calculate total score (0-4)
    const score =
      lengthScore +
      (hasUppercase ? 1 : 0) +
      (hasLowercase ? 1 : 0) +
      (hasNumber ? 1 : 0) +
      (hasSpecial ? 1 : 0);

    // Map score to strength level
    let message = "";
    let color = "";

    if (score === 0 || password.length < 6) {
      message = "Sangat Lemah";
      color = "red";
    } else if (score === 1 || password.length < 8) {
      message = "Lemah";
      color = "#FFA500"; // Orange
    } else if (score === 2) {
      message = "Sedang";
      color = "#FFC107"; // Amber
    } else if (score === 3 || score === 4) {
      message = "Kuat";
      color = "#4CAF50"; // Green
    } else if (score >= 5) {
      message = "Sangat Kuat";
      color = "#2E7D32"; // Dark Green
    }

    return {
      score,
      message,
      color,
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    if (name === "email") {
      // Check if the email has the correct domain
      if (value && !value.endsWith("@students.del.ac.id")) {
        setEmailError("Email harus menggunakan domain @students.del.ac.id");
      } else {
        setEmailError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      // If changing the major, also update the faculty automatically
      if (name === "major" && prodiToFakultas[value]) {
        return {
          ...prev,
          [name]: value,
          faculty: prodiToFakultas[value],
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate confirm password
    if (formData.password !== confirmPassword) {
      setError("Password tidak cocok");
      setIsLoading(false);
      return;
    }

    // Validate email domain
    if (!formData.email.endsWith("@students.del.ac.id")) {
      setError("Email harus menggunakan domain @students.del.ac.id");
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (passwordStrength.score < 3) {
      setError(
        "Password terlalu lemah. Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol."
      );
      setIsLoading(false);
      return;
    }

    try {
      // Call the API for student registration
      await registerStudent(formData);

      // Show success message
      setSuccess(true);

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: Error | unknown) {
      setError(
        err instanceof Error ? err.message : "Gagal melakukan registrasi"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null; // Avoid hydration issues
  }

  if (success) {
    return (
      <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col items-center justify-center p-4 md:p-6 relative">
        <div className="absolute inset-0 bg-[#0687C9]/[0.02] pointer-events-none"></div>
        <Card className="w-full max-w-md bg-white border-0 shadow-xl shadow-[#0687C9]/10 rounded-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0687C9] to-[#00A3FF]"></div>
          <div className="p-6 md:p-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <BsCheck2Circle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-[#1A202C] mb-2">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-center text-[#64748B] mb-6">
              Akun mahasiswa telah berhasil terdaftar. Anda akan diarahkan ke
              halaman beranda.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="w-full h-11 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-colors"
            >
              <div className="flex items-center justify-center">
                <span>Lanjut ke Beranda</span>
                <BsArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col items-center justify-center p-4 md:p-6 relative">
      {/* Subtle color overlay */}
      <div className="absolute inset-0 bg-[#0687C9]/[0.02] pointer-events-none"></div>

      <div
        className="z-10 mb-6 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/images/logo2.png"
          alt="DelPresence Logo"
          width={180}
          height={60}
          className="h-auto w-auto object-contain"
        />
      </div>

      <Card className="w-full max-w-2xl bg-white border-0 shadow-xl shadow-[#0687C9]/10 rounded-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0687C9] to-[#00A3FF]"></div>

        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-[#1A202C]">
              Pendaftaran Mahasiswa
            </h2>
            <p className="mt-1 text-[#64748B] text-sm">
              Silahkan isi data berikut untuk mendaftar sebagai mahasiswa
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              <p className="font-medium">Pendaftaran Gagal</p>
              <p className="text-red-600/80 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NIM */}
              <div className="space-y-2">
                <Label
                  htmlFor="nim"
                  className="text-[#334155] font-medium text-sm"
                >
                  NIM
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsMortarboard className="h-4 w-4 text-[#0687C9]" />
                  </div>
                  <Input
                    id="nim"
                    name="nim"
                    type="text"
                    value={formData.nim}
                    onChange={handleChange}
                    className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                    placeholder="Nomor Induk Mahasiswa"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[#334155] font-medium text-sm"
                >
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsEnvelope className="h-4 w-4 text-[#0687C9]" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9] ${
                      emailError ? "border-red-500" : ""
                    }`}
                    placeholder="nama@students.del.ac.id"
                    required
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Gunakan email resmi mahasiswa dengan domain
                  @students.del.ac.id
                </p>
              </div>

              {/* First Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="first_name"
                  className="text-[#334155] font-medium text-sm"
                >
                  Nama Depan
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsPerson className="h-4 w-4 text-[#0687C9]" />
                  </div>
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                    placeholder="Nama depan"
                    required
                  />
                </div>
              </div>

              {/* Middle Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="middle_name"
                  className="text-[#334155] font-medium text-sm"
                >
                  Nama Tengah <span className="text-[#94A3B8]">(opsional)</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsPerson className="h-4 w-4 text-[#0687C9]" />
                  </div>
                  <Input
                    id="middle_name"
                    name="middle_name"
                    type="text"
                    value={formData.middle_name}
                    onChange={handleChange}
                    className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                    placeholder="Nama tengah (opsional)"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="last_name"
                  className="text-[#334155] font-medium text-sm"
                >
                  Nama Belakang{" "}
                  <span className="text-[#94A3B8]">(opsional)</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsPerson className="h-4 w-4 text-[#0687C9]" />
                  </div>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                    placeholder="Nama belakang (opsional)"
                  />
                </div>
              </div>

              {/* Major (Program Studi) - Changed to dropdown */}
              <div className="space-y-2">
                <Label
                  htmlFor="major"
                  className="text-[#334155] font-medium text-sm"
                >
                  Program Studi
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <BsBook className="h-4 w-4 text-[#0687C9]" />
                  </div>
                  <Select
                    value={formData.major}
                    onValueChange={(value) =>
                      handleSelectChange("major", value)
                    }
                  >
                    <SelectTrigger className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]">
                      <SelectValue placeholder="Pilih Program Studi" />
                    </SelectTrigger>
                    <SelectContent>
                      {prodiOptions.map((prodi) => (
                        <SelectItem key={prodi} value={prodi}>
                          {prodi}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Faculty - Now read-only and automatically set based on major */}
              <div className="space-y-2">
                <Label
                  htmlFor="faculty"
                  className="text-[#334155] font-medium text-sm"
                >
                  Fakultas
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsBuilding className="h-4 w-4 text-[#0687C9]" />
                  </div>
                  <Input
                    id="faculty"
                    name="faculty"
                    type="text"
                    value={formData.faculty}
                    readOnly
                    className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg text-[#4A5568] cursor-not-allowed"
                    placeholder="Otomatis berdasarkan program studi"
                  />
                </div>
              </div>

              {/* Batch (Angkatan) - Changed to dropdown */}
              <div className="space-y-2">
                <Label
                  htmlFor="batch"
                  className="text-[#334155] font-medium text-sm"
                >
                  Angkatan
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <BsMortarboard className="h-4 w-4 text-[#0687C9]" />
                  </div>
                  <Select
                    value={formData.batch}
                    onValueChange={(value) =>
                      handleSelectChange("batch", value)
                    }
                  >
                    <SelectTrigger className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]">
                      <SelectValue placeholder="Pilih Angkatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {angkatanOptions.map((angkatan) => (
                        <SelectItem key={angkatan} value={angkatan}>
                          {angkatan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-[#334155] font-medium text-sm"
                >
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsLock className="h-4 w-4 text-[#0687C9]" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                    placeholder="Minimal 8 karakter"
                    required
                    minLength={8}
                  />
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-medium"
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.message}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                          backgroundColor: passwordStrength.color,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Gunakan minimal 8 karakter dengan kombinasi huruf besar,
                      huruf kecil, angka, dan simbol
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-[#334155] font-medium text-sm"
                >
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsLock className="h-4 w-4 text-[#0687C9]" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                    placeholder="Ketik ulang password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-3 sm:space-y-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/register")}
                className="h-11 border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#334155] order-2 sm:order-1"
              >
                <BsArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto h-11 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-[#0687C9] focus:ring-offset-2 disabled:opacity-70 order-1 sm:order-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Daftar</span>
                    <BsArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

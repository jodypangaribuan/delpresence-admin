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
  BsEye,
  BsEyeSlash,
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
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
      valid: false,
    },
  });
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

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
        requirements: {
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          special: false,
          valid: false,
        },
      };
    }

    // Check password length
    const hasLength = password.length >= 8;

    // Check for uppercase letters
    const hasUppercase = /[A-Z]/.test(password);

    // Check for lowercase letters
    const hasLowercase = /[a-z]/.test(password);

    // Check for numbers
    const hasNumber = /[0-9]/.test(password);

    // Check for special characters
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    // Calculate total score (0-5)
    const score =
      (hasLength ? 1 : 0) +
      (hasUppercase ? 1 : 0) +
      (hasLowercase ? 1 : 0) +
      (hasNumber ? 1 : 0) +
      (hasSpecial ? 1 : 0);

    // Check if all criteria are met
    const isValid =
      hasLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

    // Map score to strength level
    let message = "";
    let color = "";

    if (score === 0 || !hasLength) {
      message = "Sangat Lemah";
      color = "red";
    } else if (score <= 2) {
      message = "Lemah";
      color = "#FFA500"; // Orange
    } else if (score === 3) {
      message = "Sedang";
      color = "#FFC107"; // Amber
    } else if (score === 4) {
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
      requirements: {
        length: hasLength,
        uppercase: hasUppercase,
        lowercase: hasLowercase,
        number: hasNumber,
        special: hasSpecial,
        valid: isValid,
      },
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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!termsAccepted) {
      setError("Anda harus menyetujui syarat dan ketentuan untuk melanjutkan");
      return;
    }

    if (formData.password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sesuai");
      return;
    }

    // Validate email domain
    if (!formData.email.endsWith("@students.del.ac.id")) {
      setError("Email harus menggunakan domain @students.del.ac.id");
      return;
    }

    // Validate password strength - ensure all requirements are met
    if (!passwordStrength.requirements?.valid) {
      setError(
        "Password harus memenuhi semua persyaratan keamanan (minimal 8 karakter, huruf besar, huruf kecil, angka, dan simbol)"
      );
      return;
    }

    setIsLoading(true);

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
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF] flex flex-col items-center justify-center p-4 md:p-6 relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] opacity-5 pointer-events-none"></div>

      <div
        className="z-10 mb-8 cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => router.push("/")}
      >
        <Image
          src="/images/logo2.png"
          alt="DelPresence Logo"
          width={200}
          height={70}
          className="h-auto w-auto object-contain"
        />
      </div>

      <Card className="w-full max-w-2xl bg-white border-0 shadow-xl shadow-[#0687C9]/10 rounded-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0687C9] to-[#00A3FF]"></div>

        <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1A202C]">
              Pendaftaran Mahasiswa
            </h2>
            <p className="mt-2 text-[#64748B] text-sm">
              Silahkan isi data berikut untuk mendaftar sebagai mahasiswa
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-lg">
              <p className="font-medium">Pendaftaran Gagal</p>
              <p className="text-red-600/80 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                    placeholder="Minimal 8 karakter"
                    required
                    minLength={8}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                  >
                    {showPassword ? (
                      <BsEyeSlash className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <BsEye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    )}
                  </div>
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

                    {/* Password requirements checklist */}
                    <div className="mt-3 space-y-1.5 text-xs">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-3.5 w-3.5 rounded-full flex items-center justify-center ${
                            passwordStrength.requirements?.length
                              ? "bg-green-100 text-green-500"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {passwordStrength.requirements?.length ? (
                            <svg
                              className="h-2.5 w-2.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : null}
                        </div>
                        <span
                          className={`ml-2 ${
                            passwordStrength.requirements?.length
                              ? "text-gray-600"
                              : "text-gray-500"
                          }`}
                        >
                          Minimal 8 karakter
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-3.5 w-3.5 rounded-full flex items-center justify-center ${
                            passwordStrength.requirements?.uppercase
                              ? "bg-green-100 text-green-500"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {passwordStrength.requirements?.uppercase ? (
                            <svg
                              className="h-2.5 w-2.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : null}
                        </div>
                        <span
                          className={`ml-2 ${
                            passwordStrength.requirements?.uppercase
                              ? "text-gray-600"
                              : "text-gray-500"
                          }`}
                        >
                          Setidaknya 1 huruf besar (A-Z)
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-3.5 w-3.5 rounded-full flex items-center justify-center ${
                            passwordStrength.requirements?.lowercase
                              ? "bg-green-100 text-green-500"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {passwordStrength.requirements?.lowercase ? (
                            <svg
                              className="h-2.5 w-2.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : null}
                        </div>
                        <span
                          className={`ml-2 ${
                            passwordStrength.requirements?.lowercase
                              ? "text-gray-600"
                              : "text-gray-500"
                          }`}
                        >
                          Setidaknya 1 huruf kecil (a-z)
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-3.5 w-3.5 rounded-full flex items-center justify-center ${
                            passwordStrength.requirements?.number
                              ? "bg-green-100 text-green-500"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {passwordStrength.requirements?.number ? (
                            <svg
                              className="h-2.5 w-2.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : null}
                        </div>
                        <span
                          className={`ml-2 ${
                            passwordStrength.requirements?.number
                              ? "text-gray-600"
                              : "text-gray-500"
                          }`}
                        >
                          Setidaknya 1 angka (0-9)
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-3.5 w-3.5 rounded-full flex items-center justify-center ${
                            passwordStrength.requirements?.special
                              ? "bg-green-100 text-green-500"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {passwordStrength.requirements?.special ? (
                            <svg
                              className="h-2.5 w-2.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : null}
                        </div>
                        <span
                          className={`ml-2 ${
                            passwordStrength.requirements?.special
                              ? "text-gray-600"
                              : "text-gray-500"
                          }`}
                        >
                          Setidaknya 1 karakter khusus (!@#$%^&*)
                        </span>
                      </div>
                    </div>
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
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                    placeholder="Ketik ulang password"
                    required
                    minLength={8}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={
                      showConfirmPassword
                        ? "Sembunyikan konfirmasi password"
                        : "Tampilkan konfirmasi password"
                    }
                  >
                    {showConfirmPassword ? (
                      <BsEyeSlash className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <BsEye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-4 pb-2">
              <div className="flex items-start bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 border border-blue-300 rounded bg-blue-50 focus:ring-2 focus:ring-blue-300 cursor-pointer"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-medium text-gray-700 cursor-pointer"
                  >
                    Saya menyetujui{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      className="text-[#0687C9] font-semibold hover:underline"
                      onClick={(e) => {
                        // If the page doesn't exist yet, prevent navigation
                        if (
                          !window.confirm(
                            "Halaman Privacy Policy belum tersedia. Lanjutkan?"
                          )
                        ) {
                          e.preventDefault();
                        }
                      }}
                    >
                      syarat dan ketentuan penggunaan
                    </a>{" "}
                    serta{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      className="text-[#0687C9] font-semibold hover:underline"
                      onClick={(e) => {
                        // If the page doesn't exist yet, prevent navigation
                        if (
                          !window.confirm(
                            "Halaman Privacy Policy belum tersedia. Lanjutkan?"
                          )
                        ) {
                          e.preventDefault();
                        }
                      }}
                    >
                      kebijakan privasi
                    </a>{" "}
                    yang berlaku.
                  </label>
                </div>
              </div>
            </div>

            {/* Form actions */}
            <div className="pt-4 flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-3 sm:space-y-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/register")}
                className="h-12 border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#334155] order-2 sm:order-1 rounded-lg transition-all duration-200"
              >
                <BsArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>

              <Button
                type="submit"
                disabled={isLoading || !termsAccepted}
                className="w-full sm:w-auto h-12 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:ring-2 focus:ring-[#0687C9] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed order-1 sm:order-2"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Daftar Sekarang</span>
                    <BsArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>

      <div className="mt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DelPresence. All rights reserved.
      </div>
    </div>
  );
}

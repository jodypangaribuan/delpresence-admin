"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { BsCheck2Circle, BsExclamationTriangle } from "react-icons/bs";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordStrengthMeter } from "@/components/ui/password-strength-meter";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState("");

  // Validate token on load
  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage(
        "Token reset password tidak ditemukan. Periksa URL Anda atau minta link reset password baru."
      );
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch(
          `${API_URL}/auth/validate-reset-token?token=${token}`
        );

        if (!response.ok) {
          const data = await response.json();
          setStatus("error");
          setMessage(
            data.message ||
              "Token reset password tidak valid atau kedaluwarsa. Silakan minta link reset password baru."
          );
        }
      } catch {
        setStatus("error");
        setMessage(
          "Terjadi kesalahan saat memvalidasi token. Silakan coba lagi nanti."
        );
      }
    };

    validateToken();
  }, [token]);

  const validatePasswords = () => {
    if (password.length < 8) {
      setPasswordError("Password harus memiliki minimal 8 karakter");
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordError("Password dan konfirmasi password tidak cocok");
      return false;
    }

    if (passwordStrength < 2) {
      setPasswordError(
        "Password terlalu lemah. Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol"
      );
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    setStatus("loading");
    setMessage("Menyimpan password baru Anda...");

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage(
          "Password Anda berhasil diubah! Anda sekarang dapat login dengan password baru."
        );
      } else {
        const data = await response.json();
        setStatus("error");
        setMessage(
          data.message ||
            "Gagal mengubah password. Token mungkin tidak valid atau kedaluwarsa."
        );
      }
    } catch {
      setStatus("error");
      setMessage(
        "Terjadi kesalahan saat mengubah password Anda. Silakan coba lagi nanti."
      );
    }
  };

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

      <Card className="w-full max-w-md bg-white border-0 shadow-xl shadow-[#0687C9]/10 rounded-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0687C9] to-[#00A3FF]"></div>

        <div className="p-6 md:p-8">
          {status === "loading" && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-[#1A202C] mb-2">
                Reset Password
              </h2>
              <p className="text-center text-[#64748B] mb-6">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <BsCheck2Circle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-[#1A202C] mb-2">
                Reset Password Berhasil
              </h2>
              <p className="text-center text-[#64748B] mb-6">{message}</p>
              <Button
                onClick={() => router.push("/login")}
                className="w-full h-11 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-colors"
              >
                Login Sekarang
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <BsExclamationTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-[#1A202C] mb-2">
                Reset Password Gagal
              </h2>
              <p className="text-center text-[#64748B] mb-6">{message}</p>
              <Button
                onClick={() => router.push("/forgot-password")}
                className="w-full h-11 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-colors"
              >
                Minta Link Reset Password Baru
              </Button>
            </div>
          )}

          {(status === "idle" || (!token && status !== "error")) && (
            <>
              <h2 className="text-xl font-bold text-[#1A202C] mb-4">
                Reset Password
              </h2>
              <p className="text-[#64748B] mb-6">
                Buat password baru untuk akun Anda
              </p>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password Baru</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <PasswordStrengthMeter
                      password={password}
                      onChange={setPasswordStrength}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pr-10"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {passwordError && (
                    <p className="text-sm text-red-500">{passwordError}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-colors"
                  >
                    Reset Password
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Card>

      <div className="mt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DelPresence. All rights reserved.
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  BsArrowRight,
  BsLock,
  BsCheck,
  BsPerson,
  BsEyeSlash,
  BsEye,
} from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Import auth components
import { login, UserRole } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Login with campus API
      const response = await login(username, password);

      // Debug: Log auth response (without sensitive info)
      console.log("Auth response:", {
        result: response.result,
        userRole: response.user?.role,
        hasToken: !!response.token,
        tokenLength: response.token?.length || 0,
      });

      // For admin users, verify we have a campus token
      if (response.result && response.user?.role === UserRole.ADMIN) {
        try {
          // Save campus token for admins (needed for API integrations)
          if (response.token) {
            document.cookie = `campus_token=${response.token}; path=/; max-age=86400; SameSite=Strict`;
            console.log("Saved campus token for admin from login");
          } else {
            console.error("No campus token received for admin user");
          }
        } catch (err) {
          console.error("Failed to save campus token:", err);
        }
      }

      // Check user role and redirect to dashboard
      if (response.result && response.user) {
        if (
          response.user.role === UserRole.LECTURER ||
          response.user.role === UserRole.ASSISTANT ||
          response.user.role === UserRole.ADMIN
        ) {
          router.push("/dashboard");
        } else {
          throw new Error(
            "Anda tidak memiliki akses ke sistem ini. Hanya Admin, Dosen, dan Asisten Dosen yang dapat mengakses."
          );
        }
      } else {
        throw new Error("Login gagal. Silakan coba lagi.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Kredensial tidak valid");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null; // Avoid hydration issues
  }

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col items-center justify-center p-4 md:p-6 relative">
      {/* Subtle color overlay */}
      <div className="absolute inset-0 bg-[#0687C9]/[0.02] pointer-events-none"></div>

      <div
        className="z-10 mb-8 cursor-pointer"
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

      <Card className="w-full max-w-md bg-white border-0 shadow-xl shadow-[#0687C9]/10 rounded-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0687C9] to-[#00A3FF]"></div>

        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-[#1A202C]">
              Selamat Datang di DelPresence
            </h2>
            <p className="mt-1 text-[#64748B] text-sm">
              Login untuk mengakses sistem manajemen akademik
            </p>
          </div>

          {/* Unified Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                <p className="font-medium">Login Gagal</p>
                <p className="text-red-600/80 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-[#334155] font-medium text-sm"
              >
                Username
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BsPerson className="h-4 w-4 text-[#0687C9]" />
                </div>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                  placeholder="Masukkan username anda"
                  required
                />
              </div>
            </div>

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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                  placeholder="Masukkan password anda"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <BsEyeSlash className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  ) : (
                    <BsEye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setRemember(!remember)}
                className="flex items-center focus:outline-none"
              >
                <div
                  className={`w-4 h-4 flex items-center justify-center rounded-sm border transition-colors duration-200 ${
                    remember
                      ? "bg-[#0687C9] border-[#0687C9]"
                      : "border-[#CBD5E1] bg-white"
                  }`}
                >
                  {remember && <BsCheck className="w-3 h-3 text-white" />}
                </div>
                <span className="ml-2 text-sm text-[#475569]">Ingat saya</span>
              </button>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-[#0687C9] focus:ring-offset-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Masuk</span>
                    <BsArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className="bg-[#F8FAFC] p-6 border-t border-[#E2E8F0]">
          <div className="text-center">
            <p className="text-xs text-[#64748B]">
              © {new Date().getFullYear()} Institut Teknologi Del • Sistem
              Manajemen Akademik
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

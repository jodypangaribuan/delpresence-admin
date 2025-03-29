"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { BsArrowRight, BsEnvelope, BsLock, BsCheck } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { loginAdmin, saveTokens, saveUserInfo } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user just verified their email
    if (searchParams.get("verified") === "true") {
      setVerificationSuccess(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setVerificationRequired(false);

    try {
      // Call the API for admin login
      const response = await loginAdmin(email, password);

      // Save auth data to localStorage
      saveTokens(response.data.tokens);
      saveUserInfo(response.data.user, response.data.user_type);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        // Check if error message contains verification related keywords
        const errorMessage = err.message;
        if (
          errorMessage.includes("tidak terverifikasi") ||
          errorMessage.includes("belum terverifikasi") ||
          errorMessage.includes("not verified") ||
          errorMessage.includes("Email not verified")
        ) {
          setVerificationRequired(true);
          setUserEmail(email);
        } else {
          setError(errorMessage);
        }
      } else {
        setError("Email atau password tidak valid");
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

          {verificationSuccess && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded">
              <p className="font-medium">Verifikasi Email Berhasil</p>
              <p className="text-green-600/80 text-sm">
                Email Anda telah berhasil diverifikasi. Anda sekarang dapat
                login ke akun Anda.
              </p>
            </div>
          )}

          {verificationRequired && (
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 text-sm rounded">
              <p className="font-medium">Verifikasi Email Diperlukan</p>
              <p className="text-blue-600/80 text-sm">
                Akun Anda belum diverifikasi. Silakan periksa email Anda (
                {userEmail}) untuk link verifikasi.
              </p>
              <button
                onClick={() =>
                  router.push(
                    `/resend-verification?email=${encodeURIComponent(
                      userEmail
                    )}`
                  )
                }
                className="mt-2 text-sm text-blue-700 font-medium underline hover:text-blue-600"
              >
                Kirim ulang email verifikasi
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              <p className="font-medium">Login Gagal</p>
              <p className="text-red-600/80 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                  placeholder="Masukkan email anda"
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 py-2 h-11 bg-[#F8FAFC] border-[#E2E8F0] rounded-lg focus:ring-[#0687C9] focus:border-[#0687C9]"
                  placeholder="Masukkan password anda"
                  required
                />
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
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="ml-auto text-sm text-[#0687C9] hover:text-[#0466a2] focus:outline-none"
              >
                Lupa Password?
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

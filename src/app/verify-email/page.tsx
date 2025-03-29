"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { BsCheck2Circle, BsExclamationTriangle } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Memverifikasi email Anda...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage(
        "Token verifikasi tidak ditemukan. Periksa URL Anda atau minta link verifikasi baru."
      );
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${API_URL}/auth/verify-email?token=${token}`
        );

        if (response.ok) {
          setStatus("success");
          setMessage(
            "Email Anda berhasil diverifikasi! Anda sekarang dapat login ke akun Anda."
          );
        } else {
          const data = await response.json();
          setStatus("error");
          setMessage(
            data.message ||
              "Gagal memverifikasi email. Token mungkin tidak valid atau kedaluwarsa."
          );
        }
      } catch {
        setStatus("error");
        setMessage(
          "Terjadi kesalahan saat memverifikasi email Anda. Silakan coba lagi nanti."
        );
      }
    };

    verifyEmail();
  }, [token]);

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

        <div className="p-6 md:p-8 flex flex-col items-center">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-[#1A202C] mb-2">
                Verifikasi Email
              </h2>
              <p className="text-center text-[#64748B] mb-6">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <BsCheck2Circle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-[#1A202C] mb-2">
                Verifikasi Berhasil
              </h2>
              <p className="text-center text-[#64748B] mb-6">{message}</p>
              <Button
                onClick={() => router.push("/login")}
                className="w-full h-11 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-colors"
              >
                Login Sekarang
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <BsExclamationTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-[#1A202C] mb-2">
                Verifikasi Gagal
              </h2>
              <p className="text-center text-[#64748B] mb-6">{message}</p>
              <Button
                onClick={() => router.push("/")}
                className="w-full h-11 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-colors"
              >
                Kembali ke Beranda
              </Button>
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

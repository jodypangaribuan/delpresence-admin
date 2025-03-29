"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { BsCheck2Circle, BsExclamationTriangle } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resendVerificationEmail } from "@/lib/auth";

export default function ResendVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");

  const [email, setEmail] = useState(emailParam || "");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Email tidak boleh kosong");
      return;
    }

    setStatus("loading");
    setMessage("Mengirim email verifikasi...");

    try {
      const response = await resendVerificationEmail(email);
      setStatus("success");
      setMessage(
        response.message ||
          "Email verifikasi telah dikirim kembali. Silakan periksa kotak masuk atau folder spam Anda."
      );
    } catch (err: Error | unknown) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengirim email verifikasi. Silakan coba lagi nanti."
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
                Mengirim Verifikasi
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
                Email Terkirim
              </h2>
              <p className="text-center text-[#64748B] mb-6">{message}</p>
              <Button
                onClick={() => router.push("/login")}
                className="w-full h-11 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-colors"
              >
                Kembali ke Login
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <BsExclamationTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-[#1A202C] mb-2">Gagal</h2>
              <p className="text-center text-[#64748B] mb-6">{message}</p>
              <Button
                onClick={() => {
                  setStatus("idle");
                  setMessage("");
                }}
                className="w-full h-11 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-colors"
              >
                Coba Lagi
              </Button>
            </div>
          )}

          {status === "idle" && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-[#1A202C] mb-2">
                  Kirim Ulang Verifikasi
                </h2>
                <p className="text-[#64748B]">
                  Masukkan alamat email Anda dan kami akan mengirimkan email
                  verifikasi baru.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-[#0687C9] hover:bg-[#0466a2] text-white font-medium rounded-lg transition-colors"
                  >
                    Kirim Email Verifikasi
                  </Button>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm text-[#0687C9] hover:text-[#0466a2]"
                      onClick={() => router.push("/login")}
                    >
                      Kembali ke Login
                    </Button>
                  </div>
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

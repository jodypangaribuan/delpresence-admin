"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BsArrowRight,
  BsMortarboardFill,
  BsBriefcaseFill,
} from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();

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

      <Card className="w-full max-w-md bg-white border-0 shadow-xl shadow-[#0687C9]/10 rounded-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0687C9] to-[#00A3FF]"></div>

        <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-[#1A202C]">
              Daftar Akun DelPresence
            </h2>
            <p className="mt-1 text-[#64748B] text-sm">
              Silahkan pilih jenis akun yang ingin didaftarkan
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => router.push("/register/student")}
              className="w-full h-14 bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] shadow-sm hover:shadow transition-all flex items-center justify-between px-5"
              variant="outline"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#EBF5FF] flex items-center justify-center mr-3">
                  <BsMortarboardFill className="h-5 w-5 text-[#0687C9]" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Mahasiswa</div>
                  <div className="text-xs text-[#64748B]">
                    Daftar sebagai mahasiswa
                  </div>
                </div>
              </div>
              <BsArrowRight className="h-4 w-4 text-[#94A3B8]" />
            </Button>

            <Button
              onClick={() => router.push("/register/lecture")}
              className="w-full h-14 bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] shadow-sm hover:shadow transition-all flex items-center justify-between px-5"
              variant="outline"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#EBF5FF] flex items-center justify-center mr-3">
                  <BsBriefcaseFill className="h-5 w-5 text-[#0687C9]" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Dosen</div>
                  <div className="text-xs text-[#64748B]">
                    Daftar sebagai dosen
                  </div>
                </div>
              </div>
              <BsArrowRight className="h-4 w-4 text-[#94A3B8]" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

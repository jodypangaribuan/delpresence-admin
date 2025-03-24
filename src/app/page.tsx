"use client";

import Link from "next/link";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

import Stack from "@/components/ui/Stack/Stack";
import { useEffect, useState } from "react";

export default function Home() {
  // Use a state to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false);

  // Only run on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
      {/* Hero Section with animated gradient background */}
      <main className="flex-grow">
        <div className="relative overflow-hidden">
          {/* Remove the background div since we've added it to the parent */}

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 py-24 md:py-40">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
                <div className="md:w-1/2 text-center md:text-left">
                  <Image
                    src="/images/logo2.png"
                    alt="DelPresence Logo"
                    width={220}
                    height={70}
                    className="h-auto object-contain mx-auto md:mx-0 mb-6"
                  />
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                    Sistem Kehadiran Digital{" "}
                    <span className="text-[#0687C9]">
                      Institut Teknologi Del
                    </span>
                  </h1>
                  <p className="text-slate-600 text-lg mb-8 max-w-xl">
                    Platform terintegrasi untuk manajemen presensi perkuliahan
                    yang efisien, cepat dan akurat bagi seluruh civitas
                    akademika.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8">
                    <Link
                      href="/register"
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#0687C9] text-white font-medium rounded-xl shadow-lg hover:bg-[#0078B5] transition-colors flex items-center justify-center group"
                    >
                      <span>Daftar</span>
                      <BsArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-slate-500">
                    <Link
                      href="/privacy-policy"
                      className="hover:text-[#0687C9] transition-colors"
                    >
                      Kebijakan Privasi
                    </Link>
                    <Link
                      href="/terms-of-use"
                      className="hover:text-[#0687C9] transition-colors"
                    >
                      Ketentuan Penggunaan
                    </Link>
                    <Link
                      href="https://www.del.ac.id"
                      className="hover:text-[#0687C9] transition-colors"
                    >
                      Website IT Del
                    </Link>
                    <p className="w-full md:w-auto mt-4 md:mt-0">
                      © {new Date().getFullYear()} Institut Teknologi Del
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 lg:w-3/5">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#0687C9] to-[#00A3FF] opacity-20 blur-2xl"></div>
                    <div className="relative rounded-2xl overflow-hidden flex items-center justify-center p-8">
                      {/* Image Stack from ReactBits - Only render on client to avoid hydration issues */}
                      {isClient && (
                        <Stack
                          randomRotation={false}
                          cardDimensions={{ width: 450, height: 300 }}
                          sensitivity={100}
                          sendToBackOnClick={true}
                          animationConfig={{ stiffness: 300, damping: 25 }}
                          cardsData={[
                            {
                              id: 5,
                              img: "/images/image-beranda-5.jpg",
                            },
                            {
                              id: 4,
                              img: "/images/image-beranda-4.jpg",
                            },
                            {
                              id: 3,
                              img: "/images/image-beranda-3.jpg",
                            },
                            {
                              id: 2,
                              img: "/images/image-beranda-2.jpg",
                            },
                            {
                              id: 1,
                              img: "/images/image-beranda-1.jpg",
                            },
                          ]}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { BsArrowLeft, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState } from "react";

export default function TermsOfUsePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Data untuk ketentuan penggunaan
  const sections = [
    {
      id: "intro",
      title: "Pengantar",
      content: (
        <p>
          DelPresence adalah sistem manajemen kehadiran digital yang
          dikembangkan oleh Institut Teknologi Del. Penggunaan layanan ini
          tunduk pada ketentuan yang diuraikan dalam dokumen ini.
        </p>
      ),
    },
    {
      id: "account-terms",
      title: "Ketentuan Akun",
      content: (
        <>
          <p>Dengan menggunakan DelPresence, Anda menyetujui bahwa:</p>
          <ul>
            <li>
              Anda bertanggung jawab untuk menjaga kerahasiaan kredensial akun
              Anda
            </li>
            <li>Anda tidak akan membagikan akun Anda dengan orang lain</li>
            <li>
              Anda akan segera memberitahu administrator jika terjadi
              pelanggaran keamanan akun
            </li>
            <li>
              Anda akan menggunakan sistem sesuai dengan tujuannya untuk
              pengelolaan kehadiran akademik
            </li>
            <li>
              Upaya memanipulasi sistem presensi merupakan pelanggaran dan dapat
              dikenakan sanksi akademik
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "prohibited-use",
      title: "Penggunaan yang Dilarang",
      content: (
        <>
          <p>Sebagai pengguna DelPresence, Anda dilarang untuk:</p>
          <ul>
            <li>
              Menggunakan sistem untuk melakukan presensi palsu atau
              memanipulasi kehadiran
            </li>
            <li>
              Mengembangkan atau menggunakan metode otomatis untuk mengakses,
              mencari, atau mengumpulkan data dari sistem
            </li>
            <li>
              Mencoba untuk mendekripsi, merusak, atau menembus keamanan sistem
            </li>
            <li>
              Menggunakan sistem dengan cara yang dapat menyebabkan gangguan
              atau kerusakan
            </li>
            <li>Melanggar hak kekayaan intelektual terkait dengan sistem</li>
          </ul>
        </>
      ),
    },
    {
      id: "data-accuracy",
      title: "Keakuratan Data",
      content: (
        <>
          <p>Anda bertanggung jawab untuk:</p>
          <ul>
            <li>Memastikan data profil Anda akurat dan terkini</li>
            <li>Memverifikasi kehadiran Anda dicatat dengan benar</li>
            <li>Segera melaporkan ketidakakuratan data kepada administrator</li>
            <li>Menyimpan bukti presensi jika terjadi perselisihan</li>
          </ul>
        </>
      ),
    },
    {
      id: "institution-rights",
      title: "Hak Institut Teknologi Del",
      content: (
        <>
          <p>Institut Teknologi Del berhak untuk:</p>
          <ul>
            <li>
              Mengubah, menambah, atau menghapus fitur sistem tanpa
              pemberitahuan
            </li>
            <li>
              Menghentikan akses pengguna jika terjadi pelanggaran ketentuan
            </li>
            <li>Memantau penggunaan sistem untuk memastikan kepatuhan</li>
            <li>Mengumpulkan dan menganalisis data untuk peningkatan sistem</li>
            <li>Memperbarui Ketentuan Penggunaan ini sewaktu-waktu</li>
          </ul>
        </>
      ),
    },
    {
      id: "liability",
      title: "Batasan Tanggung Jawab",
      content: (
        <p>
          DelPresence disediakan &ldquo;sebagaimana adanya&rdquo; tanpa jaminan
          apa pun. Institut Teknologi Del tidak bertanggung jawab atas kerugian
          tak langsung, insidental, khusus, atau konsekuensial yang timbul dari
          penggunaan atau ketidakmampuan untuk menggunakan layanan.
        </p>
      ),
    },
    {
      id: "intellectual-property",
      title: "Kekayaan Intelektual",
      content: (
        <p>
          Semua hak kekayaan intelektual terkait dengan sistem DelPresence,
          termasuk tetapi tidak terbatas pada perangkat lunak, desain, logo, dan
          konten, adalah milik Institut Teknologi Del. Pengguna tidak diberikan
          lisensi atau hak selain yang secara tegas diberikan dalam Ketentuan
          ini.
        </p>
      ),
    },
    {
      id: "academic-rules",
      title: "Kepatuhan Terhadap Aturan Akademik",
      content: (
        <p>
          Penggunaan DelPresence tunduk pada peraturan akademik Institut
          Teknologi Del. Pengguna diharapkan untuk mematuhi semua kebijakan dan
          prosedur akademik yang berlaku, termasuk persyaratan kehadiran
          perkuliahan dan konsekuensi ketidakhadiran.
        </p>
      ),
    },
    {
      id: "applicable-law",
      title: "Hukum yang Berlaku",
      content: (
        <p>
          Ketentuan penggunaan ini diatur oleh hukum yang berlaku di Indonesia.
          Segala perselisihan yang timbul dari atau berkaitan dengan penggunaan
          DelPresence akan diselesaikan melalui mekanisme penyelesaian
          perselisihan internal Institut Teknologi Del.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Kontak",
      content: (
        <>
          <p>
            Jika Anda memiliki pertanyaan tentang ketentuan penggunaan ini,
            silakan hubungi:
          </p>
          <a
            href="mailto:support@delpresence.del.ac.id"
            className="mt-2 inline-flex items-center text-[#0687C9] font-medium hover:underline"
          >
            support@delpresence.del.ac.id
          </a>
        </>
      ),
    },
  ];

  // Toggle section pada akordion
  const toggleSection = (id: string) => {
    if (activeSection === id) {
      setActiveSection(null);
    } else {
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header yang simpel dan tetap terlihat */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center text-[#0687C9] hover:text-[#0568a0] transition-colors"
          >
            <BsArrowLeft className="text-lg mr-2" />
            <span>Kembali</span>
          </Link>
          <Image
            src="/images/logo2.png"
            alt="DelPresence Logo"
            width={100}
            height={30}
            className="h-8 w-auto object-contain"
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header ketentuan */}
          <div className="px-6 py-8 border-b border-slate-100">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Ketentuan Penggunaan
            </h1>
            <p className="text-sm text-slate-500">
              Terakhir diperbarui: 1 Maret 2023
            </p>
            <p className="mt-4 text-slate-600">
              Dengan menggunakan layanan DelPresence, Anda menyetujui syarat dan
              ketentuan berikut.
            </p>
          </div>

          {/* Akordion yang diimprovisasi */}
          <div className="divide-y divide-slate-100">
            {sections.map((section) => (
              <div key={section.id} className="overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0687C9]"
                >
                  <span className="font-medium text-slate-800">
                    {section.title}
                  </span>
                  <span className="ml-6 flex-shrink-0 text-[#0687C9]">
                    {activeSection === section.id ? (
                      <BsChevronUp />
                    ) : (
                      <BsChevronDown />
                    )}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    activeSection === section.id
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 bg-white">
                    <div className="prose prose-sm lg:prose-base prose-slate max-w-none prose-ul:pl-5 prose-li:marker:text-[#0687C9]">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol navigasi */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
          <Link
            href="/privacy-policy"
            className="inline-flex justify-center items-center py-3 px-6 rounded-lg text-[#0687C9] border border-[#0687C9] bg-white hover:bg-[#f0f9ff] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0687C9]"
          >
            <span>Lihat Kebijakan Privasi</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex justify-center items-center py-3 px-6 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>Kembali ke Atas</span>
          </button>
        </div>
      </main>

      {/* Footer simpel */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-500 border-t border-slate-200">
        © {new Date().getFullYear()} Institut Teknologi Del • Sistem Manajemen
        Akademik
      </footer>
    </div>
  );
}

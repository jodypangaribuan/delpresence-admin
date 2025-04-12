"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BsArrowLeft,
  BsChevronDown,
  BsChevronUp,
  BsFileEarmarkText,
} from "react-icons/bs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TermsOfUsePage() {
  const [activeSection, setActiveSection] = useState<string | null>("intro");

  // Data untuk ketentuan penggunaan
  const sections = [
    {
      id: "intro",
      title: "Pengantar",
      icon: <BsFileEarmarkText className="text-primary/70" />,
      content: (
        <p className="text-slate-600">
          DelPresence adalah sistem manajemen kehadiran digital yang
          dikembangkan oleh Institut Teknologi Del. Penggunaan layanan ini
          tunduk pada ketentuan yang diuraikan dalam dokumen ini.
        </p>
      ),
    },
    {
      id: "account-terms",
      title: "Ketentuan Akun",
      icon: <BsFileEarmarkText className="text-primary/70" />,
      content: (
        <>
          <p className="text-slate-600 mb-3">
            Dengan menggunakan DelPresence, Anda menyetujui bahwa:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Anda bertanggung jawab untuk menjaga kerahasiaan kredensial akun
                Anda
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Anda tidak akan membagikan akun Anda dengan orang lain
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Anda akan segera memberitahu administrator jika terjadi
                pelanggaran keamanan akun
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Anda akan menggunakan sistem sesuai dengan tujuannya untuk
                pengelolaan kehadiran akademik
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Upaya memanipulasi sistem presensi merupakan pelanggaran dan
                dapat dikenakan sanksi akademik
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "prohibited-use",
      title: "Penggunaan yang Dilarang",
      icon: <BsFileEarmarkText className="text-primary/70" />,
      content: (
        <>
          <p className="text-slate-600 mb-3">
            Sebagai pengguna DelPresence, Anda dilarang untuk:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Menggunakan sistem untuk melakukan presensi palsu atau
                memanipulasi kehadiran
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Mengembangkan atau menggunakan metode otomatis untuk mengakses,
                mencari, atau mengumpulkan data dari sistem
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Mencoba untuk mendekripsi, merusak, atau menembus keamanan
                sistem
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Menggunakan sistem dengan cara yang dapat menyebabkan gangguan
                atau kerusakan
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Melanggar hak kekayaan intelektual terkait dengan sistem
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "data-accuracy",
      title: "Keakuratan Data",
      icon: <BsFileEarmarkText className="text-primary/70" />,
      content: (
        <>
          <p className="text-slate-600 mb-3">Anda bertanggung jawab untuk:</p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Memastikan data profil Anda akurat dan terkini</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Memverifikasi kehadiran Anda dicatat dengan benar</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Segera melaporkan ketidakakuratan data kepada administrator
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Menyimpan bukti presensi jika terjadi perselisihan</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "institution-rights",
      title: "Hak Institut Teknologi Del",
      icon: <BsFileEarmarkText className="text-primary/70" />,
      content: (
        <>
          <p className="text-slate-600 mb-3">
            Institut Teknologi Del berhak untuk:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Mengubah, menambah, atau menghapus fitur sistem tanpa
                pemberitahuan
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Menghentikan akses pengguna jika terjadi pelanggaran ketentuan
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Memantau penggunaan sistem untuk memastikan kepatuhan</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Mengumpulkan dan menganalisis data untuk peningkatan sistem
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Memperbarui Ketentuan Penggunaan ini sewaktu-waktu</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "liability",
      title: "Batasan Tanggung Jawab",
      icon: <BsFileEarmarkText className="text-primary/70" />,
      content: (
        <p className="text-slate-600">
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
      icon: <BsFileEarmarkText className="text-primary/70" />,
      content: (
        <p className="text-slate-600">
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
      icon: <BsFileEarmarkText className="text-primary/70" />,
      content: (
        <p className="text-slate-600">
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
      icon: <BsFileEarmarkText className="text-primary/70" />,
      content: (
        <p className="text-slate-600">
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
      icon: <BsFileEarmarkText className="text-primary/70" />,
      content: (
        <>
          <p className="text-slate-600 mb-3">
            Jika Anda memiliki pertanyaan tentang ketentuan penggunaan ini,
            silakan hubungi:
          </p>
          <a
            href="mailto:support@delpresence.del.ac.id"
            className="mt-2 inline-flex items-center text-primary font-medium hover:underline"
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
      {/* Header yang modern dan tetap terlihat */}
      <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <BsArrowLeft className="text-lg mr-2" />
            <span className="font-medium">Kembali</span>
          </Link>
          <div className="flex items-center">
            <Image
              src="/images/logo2.png"
              alt="DelPresence Logo"
              width={120}
              height={36}
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero banner */}
        <div className="bg-gradient-to-r from-primary-light to-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-10 sm:px-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-3">
              Ketentuan Penggunaan
            </h1>
            <p className="text-sm text-slate-500 mb-4">
              Terakhir diperbarui: 1 Maret 2023
            </p>
            <p className="max-w-3xl text-slate-600">
              Halaman ini berisi ketentuan penggunaan yang mengatur interaksi
              Anda dengan layanan DelPresence. Dengan mengakses atau menggunakan
              layanan ini, Anda setuju untuk terikat oleh ketentuan ini.
            </p>
          </div>
        </div>

        {/* Daftar isi - TOC */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Daftar Isi
          </h2>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(section.id);
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`px-3 py-2 rounded-lg text-sm flex items-center ${
                  activeSection === section.id
                    ? "bg-primary-light text-primary font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.title}
              </a>
            ))}
          </nav>
        </div>

        {/* Akordion yang diimprovisasi dengan animasi */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-slate-100">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <div className="flex items-center">
                  <span className="mr-3 text-lg">{section.icon}</span>
                  <span className="font-medium text-slate-800">
                    {section.title}
                  </span>
                </div>
                <div>
                  {activeSection === section.id ? (
                    <BsChevronUp className="text-primary text-lg" />
                  ) : (
                    <BsChevronDown className="text-slate-400 text-lg" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {activeSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1">{section.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center p-6 text-sm text-slate-500">
          <p>
            © 2023 DelPresence - Institut Teknologi Del. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}

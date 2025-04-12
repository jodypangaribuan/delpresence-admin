"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BsArrowLeft,
  BsChevronDown,
  BsChevronUp,
  BsShieldLock,
} from "react-icons/bs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(
    "info-collected"
  );

  // Data untuk kebijakan privasi
  const sections = [
    {
      id: "info-collected",
      title: "Informasi yang Kami Kumpulkan",
      icon: <BsShieldLock className="text-primary/70" />,
      content: (
        <>
          <p className="text-slate-600 mb-3">
            DelPresence mengumpulkan informasi yang diperlukan untuk menjalankan
            sistem manajemen kehadiran digital, termasuk:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Informasi identitas seperti nama, NIM/NIP, dan email</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Data fakultas dan program studi untuk mahasiswa</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Data jabatan untuk dosen</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Data kehadiran seperti waktu, tanggal, dan lokasi presensi
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Informasi perangkat dan log aktivitas sistem</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "info-usage",
      title: "Penggunaan Informasi",
      icon: <BsShieldLock className="text-primary/70" />,
      content: (
        <>
          <p className="text-slate-600 mb-3">
            Informasi yang dikumpulkan digunakan untuk:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Mengelola dan memverifikasi kehadiran perkuliahan</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Membuat dan menampilkan laporan kehadiran</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Mengirimkan notifikasi terkait kehadiran dan perkuliahan
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Memelihara dan meningkatkan layanan DelPresence</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Melindungi keamanan dan integritas sistem</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "data-protection",
      title: "Perlindungan Data",
      icon: <BsShieldLock className="text-primary/70" />,
      content: (
        <>
          <p className="text-slate-600 mb-3">
            DelPresence berkomitmen untuk melindungi data pribadi Anda dengan:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Mengimplementasikan praktik keamanan data yang ketat</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Membatasi akses ke informasi pribadi hanya kepada personel yang
                berwenang
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Menggunakan enkripsi untuk data sensitif</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Secara teratur meninjau dan meningkatkan praktik keamanan
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "info-sharing",
      title: "Pembagian Informasi",
      icon: <BsShieldLock className="text-primary/70" />,
      content: (
        <>
          <p className="text-slate-600 mb-3">
            DelPresence tidak akan menjual, memperdagangkan, atau menyewakan
            informasi pribadi pengguna. Informasi pribadi hanya dibagikan dalam
            lingkungan akademik Institut Teknologi Del dengan:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Dosen pengampu mata kuliah terkait data kehadiran mahasiswa
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Staf IT Del yang memerlukan akses untuk tujuan administratif
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Departemen akademik untuk tujuan pengarsipan dan evaluasi
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "data-retention",
      title: "Penyimpanan dan Retensi Data",
      icon: <BsShieldLock className="text-primary/70" />,
      content: (
        <p className="text-slate-600">
          Data kehadiran akan disimpan selama periode yang diperlukan untuk
          tujuan akademik dan administratif IT Del, biasanya selama masa studi
          atau masa kerja pengguna di institusi ditambah periode tambahan yang
          diperlukan untuk kepatuhan terhadap kebijakan arsip institusi.
        </p>
      ),
    },
    {
      id: "user-rights",
      title: "Hak Pengguna",
      icon: <BsShieldLock className="text-primary/70" />,
      content: (
        <>
          <p className="text-slate-600 mb-3">
            Sebagai pengguna DelPresence, Anda memiliki hak untuk:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Mengakses data personal Anda yang tersimpan dalam sistem
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Meminta koreksi data yang tidak akurat</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>Menerima notifikasi tentang penggunaan data Anda</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-2 mr-2"></span>
              <span>
                Mengajukan pertanyaan atau keluhan terkait privasi data
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "policy-updates",
      title: "Pembaruan Kebijakan Privasi",
      icon: <BsShieldLock className="text-primary/70" />,
      content: (
        <p className="text-slate-600">
          Kebijakan privasi ini dapat diperbarui dari waktu ke waktu untuk
          mencerminkan praktik terbaik dan kepatuhan terhadap regulasi.
          Perubahan signifikan akan diberitahukan melalui sistem DelPresence
          atau email.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Kontak",
      icon: <BsShieldLock className="text-primary/70" />,
      content: (
        <>
          <p className="text-slate-600 mb-3">
            Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan
            privasi, silakan hubungi:
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
              Kebijakan Privasi
            </h1>
            <p className="text-sm text-slate-500 mb-4">
              Terakhir diperbarui: 1 Maret 2023
            </p>
            <p className="max-w-3xl text-slate-600">
              Kebijakan privasi ini menjelaskan bagaimana DelPresence
              mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
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

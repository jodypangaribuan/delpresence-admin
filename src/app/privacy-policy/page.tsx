"use client";

import Link from "next/link";
import Image from "next/image";
import { BsArrowLeft, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState } from "react";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Data untuk kebijakan privasi
  const sections = [
    {
      id: "info-collected",
      title: "Informasi yang Kami Kumpulkan",
      content: (
        <>
          <p>
            DelPresence mengumpulkan informasi yang diperlukan untuk menjalankan
            sistem manajemen kehadiran digital, termasuk:
          </p>
          <ul>
            <li>Informasi identitas seperti nama, NIM/NIP, dan email</li>
            <li>Data fakultas dan program studi untuk mahasiswa</li>
            <li>Data jabatan untuk dosen</li>
            <li>Data kehadiran seperti waktu, tanggal, dan lokasi presensi</li>
            <li>Informasi perangkat dan log aktivitas sistem</li>
          </ul>
        </>
      ),
    },
    {
      id: "info-usage",
      title: "Penggunaan Informasi",
      content: (
        <>
          <p>Informasi yang dikumpulkan digunakan untuk:</p>
          <ul>
            <li>Mengelola dan memverifikasi kehadiran perkuliahan</li>
            <li>Membuat dan menampilkan laporan kehadiran</li>
            <li>Mengirimkan notifikasi terkait kehadiran dan perkuliahan</li>
            <li>Memelihara dan meningkatkan layanan DelPresence</li>
            <li>Melindungi keamanan dan integritas sistem</li>
          </ul>
        </>
      ),
    },
    {
      id: "data-protection",
      title: "Perlindungan Data",
      content: (
        <>
          <p>
            DelPresence berkomitmen untuk melindungi data pribadi Anda dengan:
          </p>
          <ul>
            <li>Mengimplementasikan praktik keamanan data yang ketat</li>
            <li>
              Membatasi akses ke informasi pribadi hanya kepada personel yang
              berwenang
            </li>
            <li>Menggunakan enkripsi untuk data sensitif</li>
            <li>Secara teratur meninjau dan meningkatkan praktik keamanan</li>
          </ul>
        </>
      ),
    },
    {
      id: "info-sharing",
      title: "Pembagian Informasi",
      content: (
        <>
          <p>
            DelPresence tidak akan menjual, memperdagangkan, atau menyewakan
            informasi pribadi pengguna. Informasi pribadi hanya dibagikan dalam
            lingkungan akademik Institut Teknologi Del dengan:
          </p>
          <ul>
            <li>Dosen pengampu mata kuliah terkait data kehadiran mahasiswa</li>
            <li>
              Staf IT Del yang memerlukan akses untuk tujuan administratif
            </li>
            <li>Departemen akademik untuk tujuan pengarsipan dan evaluasi</li>
          </ul>
        </>
      ),
    },
    {
      id: "data-retention",
      title: "Penyimpanan dan Retensi Data",
      content: (
        <p>
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
      content: (
        <>
          <p>Sebagai pengguna DelPresence, Anda memiliki hak untuk:</p>
          <ul>
            <li>Mengakses data personal Anda yang tersimpan dalam sistem</li>
            <li>Meminta koreksi data yang tidak akurat</li>
            <li>Menerima notifikasi tentang penggunaan data Anda</li>
            <li>Mengajukan pertanyaan atau keluhan terkait privasi data</li>
          </ul>
        </>
      ),
    },
    {
      id: "policy-updates",
      title: "Pembaruan Kebijakan Privasi",
      content: (
        <p>
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
      content: (
        <>
          <p>
            Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan
            privasi, silakan hubungi:
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
          {/* Header kebijakan */}
          <div className="px-6 py-8 border-b border-slate-100">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Kebijakan Privasi
            </h1>
            <p className="text-sm text-slate-500">
              Terakhir diperbarui: 1 Maret 2023
            </p>
            <p className="mt-4 text-slate-600">
              Kebijakan privasi ini menjelaskan bagaimana DelPresence
              mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
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
            href="/terms-of-use"
            className="inline-flex justify-center items-center py-3 px-6 rounded-lg text-[#0687C9] border border-[#0687C9] bg-white hover:bg-[#f0f9ff] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0687C9]"
          >
            <span>Lihat Ketentuan Penggunaan</span>
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

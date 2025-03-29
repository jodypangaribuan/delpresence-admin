This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Dokumentasi Pengujian

## Test Case Login Admin

| Modul | Sub Modul   | Test Case ID | Skenario Pengujian                  | Tipe       | Prakondisi                                            | Langkah-langkah                                                                                                                                                              | Hasil yang Diharapkan                                                                                                     |
| ----- | ----------- | ------------ | ----------------------------------- | ---------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Login | Login Admin | ADM-LOG-001  | Login admin berhasil                | Positif    | Akun admin sudah terdaftar dan terverifikasi          | 1. Buka halaman login admin<br>2. Masukkan email dan password admin yang valid<br>3. Klik tombol Login                                                                       | - Login berhasil<br>- Admin diarahkan ke dashboard admin<br>- Session admin dibuat                                        |
| Login | Login Admin | ADM-LOG-002  | Login admin dengan email salah      | Negatif    | -                                                     | 1. Buka halaman login admin<br>2. Masukkan email yang tidak terdaftar<br>3. Masukkan password valid<br>4. Klik tombol Login                                                  | Pesan error menunjukkan kredensial tidak valid                                                                            |
| Login | Login Admin | ADM-LOG-003  | Login admin dengan password salah   | Negatif    | Akun admin sudah terdaftar                            | 1. Buka halaman login admin<br>2. Masukkan email admin yang valid<br>3. Masukkan password yang salah<br>4. Klik tombol Login                                                 | Pesan error menunjukkan kredensial tidak valid                                                                            |
| Login | Login Admin | ADM-LOG-004  | Login admin dengan field kosong     | Negatif    | -                                                     | 1. Buka halaman login admin<br>2. Biarkan field email dan/atau password kosong<br>3. Klik tombol Login                                                                       | Pesan error menunjukkan field yang wajib diisi                                                                            |
| Login | Login Admin | ADM-LOG-005  | Login admin dengan akun non-admin   | Negatif    | Akun pengguna biasa (mahasiswa/dosen) sudah terdaftar | 1. Buka halaman login admin<br>2. Masukkan kredensial pengguna non-admin<br>3. Klik tombol Login                                                                             | Pesan error menunjukkan bahwa akun tidak memiliki hak akses admin                                                         |
| Login | Login Admin | ADM-LOG-006  | Menampilkan/menyembunyikan password | Fungsional | -                                                     | 1. Buka halaman login admin<br>2. Masukkan password<br>3. Klik ikon mata untuk menampilkan/menyembunyikan password                                                           | Password berubah antara terlihat dan tersembunyi                                                                          |
| Login | Login Admin | ADM-LOG-007  | Fitur "Remember Me"                 | Fungsional | -                                                     | 1. Buka halaman login admin<br>2. Masukkan kredensial valid<br>3. Centang opsi "Remember Me"<br>4. Klik tombol Login<br>5. Logout<br>6. Kunjungi kembali halaman login admin | Kredensial admin sudah terisi otomatis                                                                                    |
| Login | Login Admin | ADM-LOG-008  | Batas percobaan login               | Keamanan   | -                                                     | 1. Buka halaman login admin<br>2. Masukkan kredensial yang salah berulang kali (lebih dari 5 kali)                                                                           | Akun terkunci sementara atau terdapat mekanisme delay/captcha                                                             |
| Login | Login Admin | ADM-LOG-009  | Akses halaman admin tanpa login     | Keamanan   | Admin belum login                                     | 1. Coba akses URL halaman dashboard admin secara langsung tanpa login                                                                                                        | Diarahkan ke halaman login admin dengan pesan perlu login                                                                 |
| Login | Login Admin | ADM-LOG-010  | Logout admin                        | Fungsional | Admin sudah login                                     | 1. Login sebagai admin<br>2. Klik tombol Logout                                                                                                                              | - Session admin berakhir<br>- Admin diarahkan ke halaman login<br>- Tidak dapat mengakses halaman admin tanpa login ulang |

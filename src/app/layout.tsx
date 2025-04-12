import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClickSparkProvider from "@/components/ui/ClickSpark/ClickSparkProvider";
import { ToastProvider } from "@/components/ui/use-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Modern admin dashboard for your application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${inter.variable} font-sans antialiased bg-neutral-50`}
        style={
          {
            "--primary": "#0687C9",
            "--primary-dark": "#002A5C",
            "--primary-light": "#E6F3FB",
          } as React.CSSProperties
        }
      >
        <ClickSparkProvider>
          <ToastProvider>{children}</ToastProvider>
        </ClickSparkProvider>
      </body>
    </html>
  );
}

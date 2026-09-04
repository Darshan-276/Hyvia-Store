import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HIVYA — Modern E-Commerce",
  description: "Premium clothing and elevated everyday essentials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen flex flex-col font-sans antialiased">
        {/* 1. Navbar pinned on top */}
        <Navbar />

        {/* 2. Page Content in middle */}
        <main className="flex-1">
          {children}
        </main>

        {/* 3. Footer pinned at bottom */}
        <Footer />
      </body>
    </html>
  );
}

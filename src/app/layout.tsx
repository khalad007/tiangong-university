import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { AuthProvider } from "../components/session-provider";

export const metadata: Metadata = {
  title: "Tiangong University (Unofficial Concept)",
  description: "An unofficial concept website for Tiangong University, Tianjin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <AuthProvider>
                  <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
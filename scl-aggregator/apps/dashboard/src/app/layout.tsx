import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SCL Aggregator Dashboard",
  description: "Unified AI Model Aggregator Dashboard",
};

import { AuthProvider } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "antialiased min-h-screen bg-background")}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

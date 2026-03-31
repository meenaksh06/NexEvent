import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexEvent | AI Incident Intelligence",
  description: "Real-time AI-powered event monitoring and incident intelligence platform.",
};

import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster theme="dark" position="bottom-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}

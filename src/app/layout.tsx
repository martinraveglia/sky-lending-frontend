import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

import ErrorToast from "./errorToast";
import Wrappers from "./wrappers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sky Lending Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " flex min-h-screen"}>
        <Wrappers>
          {children}
          <ErrorToast />
        </Wrappers>
        <Toaster />
      </body>
    </html>
  );
}

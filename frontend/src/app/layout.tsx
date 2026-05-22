import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/ui/AppShell";
import { PatientProvider } from "@/lib/stores/patient-provider";
import { EncounterProvider } from "@/lib/stores/encounter-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Healins — Federated Health Network",
  description:
    "Self-sovereign healthcare platform with event-sourced clinical ledger and federated intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PatientProvider>
          <EncounterProvider>
            <AppShell>{children}</AppShell>
          </EncounterProvider>
        </PatientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import TrpcProviders from "@/components/providers/TrpcProvider";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Logique – Practice with Purpose",
    template: "%s | Logique",
  },
  description:
    "Logique is a modern test platform for JEE aspirants. Create, share, and solve custom tests with in-depth analysis.",
  keywords: [
    "Logique",
    "JEE Test Platform",
    "CBT Converter",
    "PDF to CBT",
    "JEE Practice",
    "JEE Mains",
    "Mock Tests",
    "Custom Tests",
    "EdTech",
    "Exam Platform",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
  authors: [{ name: "CalC", url: "https://vinm.me" }],
  creator: "Logique Team",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dracula" className="scroll-smooth">
      <body
        className={`transition-colors duration-300 bg-base pt-20 text-base-content font-[family-name:var(--font-geist-sans)]`}
      >
        <SessionProvider>
          <TrpcProviders>
            <Navbar />
            {children}
          </TrpcProviders>
        </SessionProvider>
      </body>
    </html>
  );
}

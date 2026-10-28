import type { Metadata, Viewport } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ta3ls.dev — AI Product Manager @ NIO",
  description:
    "ta3ls (33) — AI Product Manager at NIO. Former blockchain developer, product manager, and research assistant. Building AI applications with true practical value.",
  applicationName: "ta3ls.dev",
  authors: [{ name: "ta3ls" }],
  keywords: [
    "ta3ls",
    "AI Product Manager",
    "NIO",
    "blockchain",
    "Web3",
    "personal homepage",
  ],
};

export const viewport: Viewport = {
  themeColor: "#08051A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={firaCode.variable}>
      <body>{children}</body>
    </html>
  );
}

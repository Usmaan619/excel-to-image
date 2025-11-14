import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Excel to Image - Convert Spreadsheets Instantly",
  description:
    "Convert Excel files to high-quality images in seconds. Edit and download with ease.",
  icons: {
    icon: "/favicon.ico",
  },

  keywords: [
    "Excel to Image",
    "Spreadsheet Converter",
    "Excel Image Exporter",
    "Convert Excel to PNG",
    "Excel to JPEG",
    "Spreadsheet to Image",
    "Excel Screenshot Tool",
    "Excel Image Generator",
    "Convert XLSX to Image",
    "Excel File to Picture",
  ],

  authors: [
    { name: "Usman Wasim Hasan", url: "https://elevenfuturetech.surge.sh" },
  ],
  creator: "Usman Wasim Hasan",
  publisher: "Eleven Future Tech",

  openGraph: {
    title: "Excel to Image - Convert Spreadsheets Instantly",
    description:
      "Convert Excel files to high-quality images in seconds. Edit and download with ease.",
    url: "https://excel-to-image.vercel.app/",
    siteName: "Excel to Image",
    images: [
      {
        url: "https://elevenfuturetech.surge.sh/eft-logo.png",
        width: 1200,
        height: 630,
        alt: "Excel to Image - Convert Spreadsheets Instantly",
      },
    ],
    locale: "en-US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Excel to Image - Convert Spreadsheets Instantly",
    description:
      "Convert Excel files to high-quality images in seconds. Edit and download with ease.",
    images: ["https://elevenfuturetech.surge.sh/eft-logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

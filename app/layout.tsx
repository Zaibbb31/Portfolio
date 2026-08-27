import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zaib | Creative Developer & Designer",
  description: "Creative developer portfolio showing interactive designs, precision layout, and clean aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f7fa] text-[#09090b] relative">
        {/* Custom Rose-500 Pointer Arrow Cursor */}
        <CustomCursor />

        {children}
        
        {/* Pure Progressive Blur at bottom of viewport */}
        <div
          aria-hidden="true"
          className="fixed bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none z-40 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)]"
        />
      </body>
    </html>
  );
}

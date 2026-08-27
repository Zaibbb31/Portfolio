import type { Metadata, Viewport } from "next";
import { Montserrat, Gemunu_Libre, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const gemunuLibre = Gemunu_Libre({
  variable: "--font-gemunu",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zaib | Creative Developer & Designer",
  description: "Creative developer portfolio showing interactive designs, precision layout, and clean aesthetics.",
  icons: {
    icon: "/avatar.jpeg",
    shortcut: "/avatar.jpeg",
    apple: "/avatar.jpeg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${gemunuLibre.variable} ${outfit.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#ffffff] text-[#09090b] relative font-montserrat">
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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChakraWrapper from "../components/ChakraWrapper";
import NavBar from "../components/NavBar";  // ✅ ADD THIS

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tabata Festival",
  description: "Join the ultimate fitness carnival!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ChakraWrapper>
          <NavBar /> {/* ✅ NAVBAR AT THE TOP */}
          {children}
        </ChakraWrapper>
      </body>
    </html>
  );
}

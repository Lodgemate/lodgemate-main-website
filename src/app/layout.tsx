import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer/Footer";
import BottomNavbar from "@/components/Navbar/BottomNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lodgemate",
  description: "The best place to find your next lodge and roommate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Navbar />
      <body className={inter.className}>
        <div className=" min-h-screen">{children}</div>
      </body>
      <Footer />
      <BottomNavbar />
    </html>
  );
}

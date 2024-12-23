import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer/Footer";
import BottomNavbar from "@/components/Navbar/BottomNavbar";
import "aos/dist/aos.css";
import StoreProvider from "./StoreProvider";
import LogoLoader from "@/Ui/shared/logoLoader";
import Aproved from "@/Ui/shared/Aproved";
import Failed from "@/Ui/shared/Failed";
import EmailModal from "@/Ui/shared/EmailModal";
import { Providers } from "@/components/ProgressBarProvider";
import GetApp from "./GetApp";
import BackToTopButton from "./BackToTopButton";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={`  relative  ${inter.className}`}>
        <StoreProvider>
          <Navbar />
          <Providers>
            <div className=" min-h-screen ">{children}</div>
            <LogoLoader />
            <Aproved />
            <Failed />
          </Providers>
          <GetApp />
          <BackToTopButton />
          <Footer />
          <BottomNavbar />
          <EmailModal />
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}

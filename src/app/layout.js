import { Jost, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title: "Regalis | Transforming Equity With Precision & Gentle",
  description: "We provide trusted legal representation with a strategic approach, delivering clear guidance, strong advocacy, and reliable solutions for individuals and businesses seeking justice, protection, and long-term legal confidence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jost.variable} ${manrope.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 antialiased">
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

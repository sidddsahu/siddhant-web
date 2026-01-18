import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import ReduxProvider from "../../providers/ReduxProvider";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ✅ FAVICON + SEO METADATA */
export const metadata = {
  title: "Siddhant Dev",
  description: "Siddhant Dev | Web Developer & Programmer",

  icons: {
    icon: "/favicon-512x512-removebg-preview.png",
    shortcut: "/favicon-512x512-removebg-preview.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  cons: {
    icon: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon.gif' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon.gif' },
    ],
  },
  title: "Portfolio of Afshin Talebi - Software Developer",
  description:
    "My name is Afshin Talebi, a passionate software developer with a strong focus on JavaScript. I enjoy building practical web applications, learning new technologies, and solving challenging problems. I’m always open to opportunities that match my skills and help me grow as a developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}

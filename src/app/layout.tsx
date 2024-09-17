import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./provider/QueryProvider";
import NavBar from "./_components/navbar/NavBar";
import Footer from "./_components/footer/Footer";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "React Query App Movies",
  description: "Aplication using React Query to get Movies from TMDB",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        <QueryProvider>
          <main>{children}</main>
          </QueryProvider>
          <Footer/>
      </body>
    </html>
  );
}
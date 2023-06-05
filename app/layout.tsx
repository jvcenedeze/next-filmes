import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "./Header";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${montserrat.className}`}>
        <Header />
        <main className="mx-12 sm:mx-16 lg:mx-32 my-10">{children}</main>
      </body>
    </html>
  );
}

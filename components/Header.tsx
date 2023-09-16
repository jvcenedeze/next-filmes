import { Josefin_Sans } from "next/font/google";
import Link from "next/link";
import SearchInput from "./SearchInput";
import HeaderMenu from "./HeaderMenu";

const josefinSans = Josefin_Sans({
  weight: ["200"],
  subsets: ["latin"],
  variable: "--font-josefin_sans",
});

export default function Header() {
  return (
    <nav className="flex flex-row py-1 sm:py-2 pl-16 sm:pl-0 top-0 right-0 left-0 fixed bg-black z-50">
      <Link
        className={`${josefinSans.className} ml-auto sm:ml-16 lg:ml-32 sm:mx-auto sm:mr-0 mt-auto text-2xl sm:text-4xl`}
        href="/"
      >
        Next filmes
      </Link>
      <div className="ml-4 hidden sm:block max-w-xs w-1/3 lg:w-1/2">
        <SearchInput />
      </div>
      <div className="ml-auto mr-6 sm:mr-16 lg:mr-32">
        <HeaderMenu />
      </div>
    </nav>
  );
}

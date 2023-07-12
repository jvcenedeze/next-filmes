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
    <nav className="flex flex-row pt-4">
      <Link
        className={`${josefinSans.className} mx-auto sm:mr-0 mt-auto sm:ml-16 lg:ml-32 text-4xl`}
        href="/"
      >
        Next filmes
      </Link>
      <div className="ml-4 hidden sm:block max-w-xs w-2/5 lg:w-1/2">
        <SearchInput />
      </div>
      <div className="ml-auto hidden sm:block sm:mr-16 lg:mr-32">
        <HeaderMenu />
      </div>
    </nav>
  );
}

"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const path = usePathname();
  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (search === "") return;
    const encodedSearchQuery = encodeURI(search);
    router.push(`/search?q=${encodedSearchQuery}`);
  };
  useEffect(() => {
    if (path !== "/search") setSearch("");
  }, [path]);
  return (
    <div className="w-full relative inline-block flex items-center">
      <form onSubmit={onSearch} className="w-full">
        <input
          type="text"
          className="
            w-full
            border-2
            py-2
            pl-3
            pr-11
            rounded-lg
            text-slate-700
            text-black
            focus:outline-none
            focus:border-gray-300
          "
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div
        className="absolute right-3 text-slate-700 cursor-pointer"
        onClick={onSearch}
      >
        <SearchIcon />
      </div>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Movie from "../Movie";

// interface Movies {
//   page: number;
//   results: MovieResults[];
//   total_pages: number;
//   total_results: number;
// }

interface MovieResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function GenreMovies() {
  const search = useSearchParams();
  const searchQuery = search?.get("q");
  const encodedSearchQuery = encodeURI(searchQuery ?? "");
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(
      `https://next-filmes-search-api.onrender.com/search?q=${encodedSearchQuery}`
    )
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  }, [encodedSearchQuery]);
  return (
    <div>
      <h1 className="text-2xl mb-8">
        <span className="text-lg">Results for:</span> {searchQuery}
      </h1>
      <div className="grid gap-16 grid-cols-fluid">
        {data.results
          ? data.results.map((movie: MovieResults) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
              />
            ))
          : null}
      </div>
    </div>
  );
}

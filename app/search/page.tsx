"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingMovie from "../../components/LoadingMovie";
import Movie from "../../components/Movie";

interface Movies {
  page: number;
  results: MovieResults[];
  total_pages: number;
  total_results: number;
}

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
  const loadingComponents = Array(20).fill("");
  const [data, setData] = useState<Movies | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://next-filmes-search-api.onrender.com/search?q=${encodedSearchQuery}`
    )
      .then((resp) => resp.json())
      .then((resp) => setData(resp))
      .finally(() => setLoading(false));
  }, [encodedSearchQuery]);
  return (
    <div>
      {loading ? (
        <div className="animate-pulse grid gap-10 sm:gap-16 grid-cols-fluid">
          {loadingComponents.map((_, i) => (
            <LoadingMovie key={i} />
          ))}
        </div>
      ) : (
        <>
          <h1 className="text-2xl mb-6 sm:mb-8">
            <span className="text-lg">
              {data?.results && data.results.length > 0
                ? "Results for:"
                : "No results found for:"}
            </span>{" "}
            {`"${searchQuery}"`}
          </h1>
          <div className="grid gap-10 sm:gap-16 grid-cols-fluid">
            {data?.results && data.results.length > 0
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
        </>
      )}
    </div>
  );
}

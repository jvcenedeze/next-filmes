import Movie from "../../../../components/Movie";

interface MovieResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: React.Key;
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

export default async function GenreMovies({ params }) {
  const { genre, id } = params;
  const decodedGenre = decodeURIComponent(genre);
  const data = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${id}`
  );
  const res = await data.json();
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl mb-6 sm:mb-8">{decodedGenre}</h1>
      <div className="grid gap-10 sm:gap-16 grid-cols-fluid">
        {res.results.map((movie: MovieResults) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
          />
        ))}
      </div>
    </div>
  );
}

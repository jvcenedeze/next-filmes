import Movie from "../../../Movie";

interface MovieResults {
  adult: Boolean;
  backdrop_path: String;
  genre_ids: Array<Number>;
  id: React.Key;
  original_language: String;
  original_title: String;
  overview: String;
  popularity: Number;
  poster_path: String;
  release_date: String;
  title: String;
  video: Boolean;
  vote_average: Number;
  vote_count: Number;
}

export default async function GenreMovies({ params }) {
  const { genre, id } = params;
  const data = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${id}`
  );
  const res = await data.json();
  return (
    <div>
      <h1 className="text-4xl mb-4">{genre}</h1>
      <div className="grid gap-16 grid-cols-fluid">
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

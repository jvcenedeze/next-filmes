import Image from "next/image";
interface ResResults {
  adult: Boolean;
  backdrop_path: String;
  genre_ids: Array<Number>;
  id: Number;
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

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  return res.results.map((movie: ResResults) => ({
    movie: movie.id.toString(),
  }));
}

export default async function MovieDetail({ params }) {
  const { movie } = params;
  const imagePath = "https://image.tmdb.org/t/p/original";
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const res = await data.json();
  return (
    <div>
      <div>
        <pre>{JSON.stringify(res, null, 4)}</pre>
        <h2 className="text-2xl">{res.title}</h2>
        <h2 className="text-lg">{res.release_date}</h2>
        <h2>Runtime: {res.runtime} minutes</h2>
        <h2>
          Genres:<> </>
          {res.genres.map(
            (genre: { name: String; id: React.Key }, index: Number) => (
              <>
                <a href={`/genre/${genre.name}/${genre.id}`} key={genre.id}>
                  {genre.name}
                </a>
                {index < res.genres.length - 1 ? <>, </> : null}
              </>
            )
          )}
        </h2>
        <h2 className="text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded-md">
          {res.status}
        </h2>
        <Image
          className="my-12 w-full"
          src={imagePath + res.backdrop_path}
          width={1000}
          height={1400}
          alt={res.title}
          priority
        />
        <p>{res.overview}</p>
      </div>
    </div>
  );
}

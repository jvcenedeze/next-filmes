import Image from "next/image";
import Link from "next/link";

interface ResResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
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
        <h2 className="text-2xl">{res.title}</h2>
        <h2 className="text-lg">{res.release_date}</h2>
        <h2>Runtime: {res.runtime} minutes</h2>
        <h2>
          Genres:<> </>
          {res.genres.map(
            (genre: { name: string; id: React.Key }, index: number) => (
              <span key={genre.id}>
                <Link
                  href={`/genre/${genre.name}/${genre.id}`}
                  className="hover:underline underline-offset-2"
                >
                  {genre.name}
                </Link>
                {index < res.genres.length - 1 ? <>, </> : null}
              </span>
            )
          )}
        </h2>
        <h2 className="text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded-md">
          {res.status}
        </h2>
        <Image
          className="my-6 w-full"
          src={imagePath + res.backdrop_path}
          width={1000}
          height={600}
          alt={res.title}
          priority
        />
        <p>{res.overview}</p>
      </div>
    </div>
  );
}

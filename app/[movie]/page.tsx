import Image from "next/image";
import Link from "next/link";
import Rating from "../../components/Rating";
import Popularity from "../../components/Popularity";

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string | null;
}

interface Genres {
  id: number;
  name: string;
}

interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface ResResults {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Array<Genres>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<ProductionCompanies>;
  production_countries: Array<ProductionCountries>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<SpokenLanguages>;
  status: string;
  tagline: string;
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
  const voteRatingNumber = res.vote_average / 2;
  const formatedReleaseDate = new Date(res.release_date).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  const formatedRuntime = () => {
    const time = res.runtime;
    if (!time) return "-";
    const minutes = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    if (time < 60) return `${formattedMinutes}m`;
    const hours = Math.floor(time / 60);
    return `${hours}h${formattedMinutes}m`;
  };
  return (
    <div>
      <div>
        <h2 className="text-2xl">{res.title}</h2>
        <h2 className="text-lg">{formatedReleaseDate}</h2>
        <h2>Runtime: {formatedRuntime()}</h2>
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
        <div className="mt-0.5">
          <Rating rating={voteRatingNumber} />
        </div>
        <div>
          <Popularity popularity={res.popularity} />
        </div>
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

import Link from "next/link";
import Image from "next/image";

export default function Movie({ title, id, poster_path, release_date }) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const formatedReleaseDate = new Date(release_date).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  return (
    <div>
      <h1>{title}</h1>
      <h2>{formatedReleaseDate}</h2>
      <Link href={`/${id}`}>
        <Image
          src={imagePath + poster_path}
          alt={title}
          width={500}
          height={300}
          priority
        />
      </Link>
    </div>
  );
}

import LoadingMovie from "../components/LoadingMovie";

export default function LoadingHome() {
  const loadingComponents = Array(20).fill("");
  return (
    <div className="animate-pulse grid gap-10 sm:gap-16 grid-cols-fluid">
      {loadingComponents.map((_, i) => (
        <LoadingMovie key={i} />
      ))}
    </div>
  );
}

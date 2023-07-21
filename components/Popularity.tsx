"use client";

import {
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

export default function MoviePopularity({ popularity }) {
  const popularityFormated = Number(popularity).toFixed(2);
  const popularityIcon = () => {
    if (popularity < 200) return <TrendingDownIcon sx={{ color: "#ff3d47" }} />;
    if (popularity < 600) return <TrendingFlatIcon sx={{ color: "#ffeb3b" }} />;
    return <TrendingUpIcon sx={{ color: "#76ff03" }} />;
  };
  return (
    <div className="flex flex-row">
      <div>Popularity:</div>
      <div className="ml-2 mr-1">{popularityIcon()}</div>
      <div>{popularityFormated}</div>
    </div>
  );
}

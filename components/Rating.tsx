"use client";

import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff3d47",
  },
  "& .MuiRating-iconEmpty": {
    color: "#ff3d47",
  },
});

export default function MovieRating({ rating }) {
  const maxRating = Number(5).toFixed(2);
  const voteRating = Number(rating).toFixed(2);
  return (
    <div className="flex flex-row">
      <StyledRating
        name="movie-rating"
        defaultValue={rating}
        precision={0.1}
        readOnly
        getLabelText={(value: number) =>
          `${value} Heart${value !== 1 ? "s" : ""}`
        }
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
      <div className="ml-2">
        {voteRating} / {maxRating}
      </div>
    </div>
  );
}

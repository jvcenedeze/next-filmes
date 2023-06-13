const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/search", async (req, res) => {
  const encodedSearchQuery = encodeURI(req.query.q);
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${encodedSearchQuery}`
  ).then((resp) => resp.json());
  res.send(response);
});

module.exports = router;

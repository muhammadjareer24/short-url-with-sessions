const express = require("express");

const {
  handleGenerateNewShortURL,
  handleRedirectURL,
  handleGetAnalystics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleRedirectURL);

router.get("/analytics/:shortId", handleGetAnalystics);

module.exports = router;

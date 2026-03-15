const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/price", async (req, res) => {
  try {
    const ticker = (req.query.ticker || "").trim().toUpperCase();

    if (!ticker) {
      return res.status(400).json({
        error: "Ticker is required"
      });
    }

    if (!/^[A-Z.]{1,10}$/.test(ticker)) {
      return res.status(400).json({
        error: "Invalid ticker format"
      });
    }

    const apiKey = process.env.POLYGON_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing POLYGON_API_KEY in environment"
      });
    }

    const previousCloseUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${apiKey}`;
    const companyDetailsUrl = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${apiKey}`;

    const [priceResponse, detailsResponse] = await Promise.all([
      fetch(previousCloseUrl),
      fetch(companyDetailsUrl)
    ]);

    const priceData = await priceResponse.json();
    const detailsData = await detailsResponse.json();

    if (!priceResponse.ok) {
      return res.status(priceResponse.status).json({
        error: priceData.error || "Failed to fetch stock price data"
      });
    }

    if (!detailsResponse.ok) {
      return res.status(detailsResponse.status).json({
        error: detailsData.error || "Failed to fetch company details"
      });
    }

    if (!priceData.results || priceData.results.length === 0) {
      return res.status(404).json({
        error: "No price data found for this ticker"
      });
    }

    const previousBar = priceData.results[0];
    const closePrice = previousBar.c;
    const timestamp = previousBar.t;
    const closeDate = new Date(timestamp).toISOString().split("T")[0];

    const companyName =
      detailsData.results && detailsData.results.name
        ? detailsData.results.name
        : "Unknown Company";

    return res.json({
      ticker,
      companyName,
      lastClosedPrice: closePrice,
      date: closeDate
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
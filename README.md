# Stock Close Web App

Stock Close is a simple public web app that lets users enter a stock ticker and instantly view the company name and most recent closed stock price.

## Features

- Enter a stock ticker symbol such as `AAPL` or `MSFT`
- View the company name
- View the most recent closed stock price
- Clean and simple user interface
- Publicly deployable as a lightweight web app

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **API Provider:** Polygon / Massive stock market API
- **Environment Config:** dotenv

## Project Structure

```text
stock-close-app/
├── package.json
├── server.js
├── .env
├── .gitignore
└── public/
    └── index.html
```

## How It Works

- The user enters a stock ticker symbol such as AAPL.
- The frontend sends a request to the backend endpoint.
- The backend validates the ticker symbol.
- The backend requests stock data and company details from the external market data API.
- The backend returns the result as JSON.
- The frontend displays the ticker, company name, date, and last closed stock price.

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* A Polygon / Massive API key

## API Endpoint

### Request

```http
GET /api/price?ticker=AAPL
```

### Sample Response

```json
{
  "ticker": "AAPL",
  "companyName": "Apple Inc.",
  "lastClosedPrice": 213.49,
  "date": "2026-03-13"
}
```

## Error Handling

The app returns clear error messages for cases such as:

* Missing ticker symbol
* Invalid ticker format
* Missing API key
* No stock data found
* Internal server error

## Deployment

This app can be deployed publicly using platforms such as Vercel.

## Author

**Murali Krishnan Rajendran**

Email: [mkr.2096@gmail.com](mailto:mkr.2096@gmail.com)

## License

Copyright © 2026 Murali Krishnan Rajendran. All rights reserved.

# Weather App

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env` file
4. Initialize Prisma: `npx prisma migrate dev --name init`
5. Start the server: `npm run dev`

## Endpoints

- POST /register
- POST /login
- GET /weather/current?city={city}
- GET /weather/forecast?city={city}
- GET /weather/historical?city={city}
- POST /favorites
- GET /favorites
- DELETE /favorites

## Postman Collection

[https://documenter.getpostman.com/view/32419391/2sA3e2g9ft](#)


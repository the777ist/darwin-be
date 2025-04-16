# Server for Darwin

_“A man who dares to waste one hour of time has not discovered the value of life.”_

### Installation and local development

Install dependencies with command `npm install`.  
Start local dev server with command `npm run dev`. Starts server on `localhost:3001`

### Explanation of architecture decisions

While the project is extremely rough around the edges, I tried to follow some best practices and patterns.

- The `/lib` folder contains internal 'library' logic that can be reused across the app. This is where the websocket connection is managed.
- Modularized controllers, following the endpoints' structure.
  - We have endpoints:
    - `experiments/live`
    - `experiments/:id/metrics`
    - `experiments/:id/logs`
  - So the router lives in `/modules/experiments/routes.ts`
  - And the above route's controllers are, respectively, in:
    - `/modules/experiments/controllers/live.ts`
    - `/modules/experiments/controllers/metrics.ts`
    - `/modules/experiments/controllers/logs.ts`
- The `utils/dataGenerator.ts` is responsible for generaating random data

### Suggestions for future improvements
- No error handling, no standardised logging.
- No validation and middleware
- No sharing of types between client and server
- We can make this a monorepo and be able to easily share types between client and server.


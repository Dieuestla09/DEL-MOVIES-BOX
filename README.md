# DEL MOVIE BOX

**Discover. Save. Watch next.**

A dark, streaming-style movie and TV discovery app built with Vite, React, and Material UI. Browse popular and top-rated titles, search TMDB, view details, and keep a local watchlist.

## Getting Started

1. Clone the repository and enter the project folder:
   ```bash
   git clone https://github.com/Dieuestla09/DEL-MOVIES-BOX.git
   cd DEL-MOVIES-BOX
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` from the example:
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env
   # macOS/Linux
   cp .env.example .env
   ```

4. Add your TMDB v3 API key to `.env`:
   ```env
   TMDB_API_KEY=your_tmdb_v3_api_key_here
   ```
   The key is used only by the server-side API proxy and is never bundled into frontend JavaScript. Do not commit `.env`; it is ignored by Git. Restart the dev server after changing environment variables.

5. Start the development server and open the local URL Vite prints:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   ```

## Screenshots

The `screenshots` directory currently has no image files. When adding captures, use these filenames and captions:

- Home: `screenshots/del-movie-box-home.png`
- Details: `screenshots/del-movie-box-details.png`

## Deployment

### Netlify

1. Import the repository into Netlify.
2. Set the build command to `npm run build` and the publish directory to `dist`.
3. Add `TMDB_API_KEY` as a server-side environment variable. `netlify/functions/tmdb.mjs` handles the API request, and `public/_redirects` maps `/api/tmdb` to that function and provides SPA route fallback.
4. Deploy the site. Never use a `VITE_` prefix for the TMDB credential.

### Vercel

1. Import the repository into Vercel and set the project name to `del-movie-box`.
2. Add `TMDB_API_KEY` in the project's server environment variables.
3. Deploy with the Vite defaults (`npm run build`, output directory `dist`). `api/tmdb.js` provides the server-side proxy and `vercel.json` provides SPA route fallback.
4. Redeploy after adding or changing `TMDB_API_KEY` so the production functions use the updated value.

## TMDB Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

Images provided by TMDB. All rights belong to their respective owners.

## Author

DEL MOVIE BOX


Open Road Exchange - Next.js + Supabase (Admin Suite) Production Site

This is a deploy-ready Next.js 14 (app router) scaffold configured to use Supabase as the inventory backend and admin CMS (Full Dealership Admin Suite).

Quick local setup:
1. npm install
2. Create a .env.local with:
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   NEXT_PUBLIC_SITE_NAME="Open Road Exchange"

3. Create Supabase project, run sql/schema.sql (included) in SQL editor.
4. Create storage bucket 'inventory-images'.
5. Run: npm run dev

Deployment:
- Push to GitHub and import into Vercel.
- Add env vars in Vercel dashboard (same as .env.local).
- Add domain openroadexchange.com in Vercel and update GoDaddy DNS as instructed.


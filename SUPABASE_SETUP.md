# Supabase Setup Guide — Hollywood Furniture

## Step 1: Create Supabase Project
1. Go to https://supabase.com and create a free account
2. Click "New project", give it a name (e.g. "hollywood-furniture")
3. Choose a strong database password and save it somewhere safe
4. Select a region close to you (e.g. EU West)
5. Wait ~2 minutes for setup to complete

## Step 2: Get Your Credentials
1. Go to: Project Settings → API
2. Copy "Project URL" → paste into `.env` as `VITE_SUPABASE_URL`
3. Copy "anon public" key → paste into `.env` as `VITE_SUPABASE_ANON_KEY`

## Step 3: Run the Database SQL
1. Go to: SQL Editor (left sidebar)
2. Click "New query"
3. Paste the contents of `supabase-setup.sql` and run it

## Step 4: Create Storage Buckets
1. Go to: Storage (left sidebar)
2. Create these 3 buckets (all set to **Public**):
   - `project-covers`
   - `project-media`
   - `project-videos`

## Step 5: Create Admin User
1. Go to: Authentication → Users
2. Click "Add user" → "Create new user"
3. Email: `eng.mohammed.domidi@gmail.com`
4. Password: (choose a strong password — you'll use this to log into /admin/login)
5. Click "Create user"

**OR** run this SQL to create via script (replace PASSWORD with your chosen password):
```sql
-- This is handled via the Supabase dashboard Auth UI (recommended)
-- Just use Authentication → Users → Add User
```

## Step 6: Update .env File
Open `holly-wood-furniture/.env` and replace the placeholder values:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY-HERE
```

## Step 7: Restart Dev Server
```bash
npm run dev
```

## Done!
- Public site: http://localhost:5173
- Admin panel: http://localhost:5173/admin/login
  - Email: eng.mohammed.domidi@gmail.com
  - Password: (whatever you set in Step 5)

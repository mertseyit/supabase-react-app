# React + Supabase Starter Application

This project is a simple starter application built with **React** and **Supabase**.  
It demonstrates basic CRUD (Create, Read, Update, Delete) operations using Supabase as the backend.

---

## Requirements

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

## Setup

### 1. Create a Supabase Project

- Go to [Supabase](https://supabase.com/) and create a new project.
- Create a table named `products`.
  > If you use a different table name, update all occurrences of `products` in the project accordingly.
- Disable **Row Level Security (RLS)**.
  > This project is currently set to work with public access for simplicity.  
  > More info: [Supabase RLS Documentation](https://supabase.com/docs/guides/database/postgres/row-level-security)

### 2. Configure the API Connection

- Rename `/src/config/supabase-client.js.txt` to `supabase-client.js`.
- Replace the placeholders with your actual `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your Supabase project settings.

---

## Running the Project

From the project root directory, run:

```bash
npm install
npm run dev
```

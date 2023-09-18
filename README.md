# Typical Meteorological Year RESTFUL API DOC
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Setup
First, let’s make sure that your development environment is ready.

If you don’t have Node.js installed, install it . You’ll need Node.js version 18 or higher.
You’ll be using your own text editor and terminal app for this tutorial.
### Step 1: Clone a Project Directory 
Start by cloning the repository for Flask project: 
``` git clone url```
``` cd frontend-tmy```

### Step 3: Install the dependencies
Now, install the dependencies using `pip`:
`pip install -r requirements.txt`

### Step 4: Add environment's variables
In root folder create a .env.local file and add the follow environment's variables
 - NEXT_PUBLIC_API_URL = "your flask api url"
 NEXT_PUBLIC_GOOGLE_API_KEY = "your google api key"


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure
# Next.js App Directory Structure

- **/app/**
  - `favicon.ico`: Favicon file
  - `globals.css`: Global CSS file
  - `layout.tsx`: Layout component file
  - `page.tsx`: Main page component file

- **/components/**
  - **Form/**: Form component directory
    - *(Form component files)*
  - **historyItem/**: HistoryItem component directory
    - *(HistoryItem component files)*
  - **Home/**: Home component directory
    - *(Home component files)*
  - **MapContainer/**: MapContainer component directory
    - *(MapContainer component files)*
  - **Sidebar/**: Sidebar component directory
    - *(Sidebar component files)*

- **/helpers/**
  - `formatTMY.ts`: Utility function for formatting TMY data

- **/lib/**
  - `createNewTmy.ts`: Library function for creating new TMY data
  - `deleteTmy.ts`: Library function for deleting TMY data
  - `fetchTmy.ts`: Library function for fetching TMY data

- `.env.local`: Local environment variables file
- `.eslintrc.json`: ESLint configuration file
- `.gitignore`: Git ignore file specifying ignored files/directories
- `next-env.d.ts`: TypeScript declaration file for Next.js environment
- `next.config.js`: Next.js configuration file
- `package-lock.json`: Lock file for npm package versions
- `package.json`: npm package configuration file
- `postcss.config.js`: PostCSS configuration file
- `README.md`: Markdown file for project documentation
- `tailwind.config.ts`: Tailwind CSS configuration file (if using Tailwind)
- `tsconfig.json`: TypeScript configuration file
- `types.d.ts`: TypeScript declaration file (for custom types)




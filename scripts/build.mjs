import { execSync } from "node:child_process";

const realDatabaseUrl = process.env.DATABASE_URL;
const realDirectUrl = process.env.DIRECT_URL;

// generate only needs env vars to exist — not a live database connection
const generateEnv = {
  ...process.env,
  DATABASE_URL:
    realDatabaseUrl ??
    "postgresql://build:build@127.0.0.1:5432/build?schema=public",
  DIRECT_URL:
    realDirectUrl ??
    realDatabaseUrl ??
    "postgresql://build:build@127.0.0.1:5432/build?schema=public",
};

function run(command, env = process.env) {
  execSync(command, { stdio: "inherit", env });
}

run("npx prisma generate", generateEnv);

if (realDatabaseUrl) {
  run("npx prisma migrate deploy");
} else {
  console.warn(
    "[build] DATABASE_URL tanımlı değil — prisma migrate deploy atlandı.",
  );
  console.warn(
    "[build] Vercel → Settings → Environment Variables bölümüne Neon DATABASE_URL ve DIRECT_URL ekleyin.",
  );
}

run("npx next build");

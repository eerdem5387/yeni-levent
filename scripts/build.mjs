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

function tryRun(command, env = process.env) {
  try {
    run(command, env);
    return true;
  } catch {
    return false;
  }
}

run("npx prisma generate", generateEnv);

if (realDatabaseUrl) {
  const migrated = tryRun("npx prisma migrate deploy");
  if (!migrated) {
    console.warn(
      "[build] prisma migrate deploy başarısız — db push ile devam ediliyor.",
    );
    tryRun("npx prisma db push --skip-generate");
  }
} else {
  console.warn(
    "[build] DATABASE_URL tanımlı değil — veritabanı adımları atlandı.",
  );
}

run("npx next build");

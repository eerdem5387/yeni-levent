import { execSync } from "node:child_process";

function nonempty(value) {
  const trimmed = value?.trim?.() ?? value;
  return trimmed ? trimmed : undefined;
}

function resolveDatabaseUrl() {
  return (
    nonempty(process.env.DATABASE_URL) ??
    nonempty(process.env.POSTGRES_PRISMA_URL) ??
    nonempty(process.env.POSTGRES_URL)
  );
}

function resolveDirectUrl() {
  return (
    nonempty(process.env.DIRECT_URL) ??
    nonempty(process.env.DATABASE_URL_UNPOOLED) ??
    nonempty(process.env.POSTGRES_URL_NON_POOLING) ??
    resolveDatabaseUrl()
  );
}

const realDatabaseUrl = resolveDatabaseUrl();
const realDirectUrl = resolveDirectUrl();

if (realDatabaseUrl) process.env.DATABASE_URL = realDatabaseUrl;
if (realDirectUrl) process.env.DIRECT_URL = realDirectUrl;

if (!nonempty(process.env.NEXTAUTH_URL) && nonempty(process.env.VERCEL_URL)) {
  const host = process.env.VERCEL_URL;
  process.env.NEXTAUTH_URL = host.startsWith("http") ? host : `https://${host}`;
}

if (!nonempty(process.env.NEXTAUTH_SECRET)) {
  console.warn(
    "[build] NEXTAUTH_SECRET tanımlı değil — build için geçici değer kullanılıyor. Vercel Environment Variables'a ekleyin.",
  );
  process.env.NEXTAUTH_SECRET = "vercel-build-placeholder-set-NEXTAUTH_SECRET";
}

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
  const migrateEnv = {
    ...process.env,
    DATABASE_URL: realDatabaseUrl,
    DIRECT_URL: realDirectUrl ?? realDatabaseUrl,
  };
  const migrated = tryRun("npx prisma migrate deploy", migrateEnv);
  if (!migrated) {
    console.warn(
      "[build] prisma migrate deploy başarısız — db push ile devam ediliyor.",
    );
    tryRun("npx prisma db push --skip-generate", migrateEnv);
  }
} else {
  console.warn(
    "[build] DATABASE_URL tanımlı değil — veritabanı adımları atlandı.",
  );
}

run("npx next build");

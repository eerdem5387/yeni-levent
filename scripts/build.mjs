import { execSync } from "node:child_process";

// Vercel postinstall/build may run before env vars are injected; Prisma still
// needs these values present to generate typed client during CI.
process.env.DATABASE_URL ??=
  "postgresql://build:build@127.0.0.1:5432/build?schema=public";
process.env.DIRECT_URL ??= process.env.DATABASE_URL;

function run(command) {
  execSync(command, { stdio: "inherit", env: process.env });
}

run("npx prisma generate");
run("npx prisma migrate deploy");
run("npx next build");

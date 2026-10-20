/** Neon/Vercel often sets aliases instead of DIRECT_URL / NEXTAUTH_URL. */

function nonempty(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function resolveDatabaseUrl(): string | undefined {
  return (
    nonempty(process.env.DATABASE_URL) ??
    nonempty(process.env.POSTGRES_PRISMA_URL) ??
    nonempty(process.env.POSTGRES_URL)
  );
}

export function resolveDirectUrl(): string | undefined {
  return (
    nonempty(process.env.DIRECT_URL) ??
    nonempty(process.env.DATABASE_URL_UNPOOLED) ??
    nonempty(process.env.POSTGRES_URL_NON_POOLING) ??
    resolveDatabaseUrl()
  );
}

export function resolveNextAuthSecret(): string | undefined {
  return nonempty(process.env.NEXTAUTH_SECRET) ?? nonempty(process.env.AUTH_SECRET);
}

export function resolveNextAuthUrl(): string | undefined {
  const explicit = nonempty(process.env.NEXTAUTH_URL);
  if (explicit) return explicit;

  const production = nonempty(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (production) {
    return production.startsWith("http") ? production : `https://${production}`;
  }

  const vercel = nonempty(process.env.VERCEL_URL);
  if (vercel) return vercel.startsWith("http") ? vercel : `https://${vercel}`;

  return undefined;
}

export function isNextAuthConfigured() {
  return Boolean(resolveNextAuthSecret());
}

/** Mutates process.env so Prisma / NextAuth see the expected names. */
export function applyEnvFallbacks() {
  const databaseUrl = resolveDatabaseUrl();
  if (databaseUrl) {
    process.env.DATABASE_URL = databaseUrl;
  }

  const directUrl = resolveDirectUrl();
  if (directUrl) {
    process.env.DIRECT_URL = directUrl;
  }

  const nextAuthSecret = resolveNextAuthSecret();
  if (nextAuthSecret) {
    process.env.NEXTAUTH_SECRET = nextAuthSecret;
  } else {
    // Empty string in Vercel still blocks fallbacks — clear it.
    delete process.env.NEXTAUTH_SECRET;
  }

  const nextAuthUrl = resolveNextAuthUrl();
  if (nextAuthUrl) {
    process.env.NEXTAUTH_URL = nextAuthUrl;
  } else if (!nonempty(process.env.NEXTAUTH_URL)) {
    delete process.env.NEXTAUTH_URL;
  }
}

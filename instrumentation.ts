export async function register() {
  const { applyEnvFallbacks } = await import("./src/lib/env");
  applyEnvFallbacks();
}

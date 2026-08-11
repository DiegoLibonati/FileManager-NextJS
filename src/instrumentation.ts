export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  // Dynamic import required: this file is also compiled for the Edge runtime,
  // and a static import would pull node:net and pino into the Edge bundle.
  const { warnIfDbUnreachable } = await import("@/server/startup/db_check.startup");

  await warnIfDbUnreachable();
}

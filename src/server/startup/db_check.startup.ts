import { createConnection } from "node:net";

import { getEnvs } from "@/server/configs/env.config";
import { logger } from "@/server/configs/logger.config";

import { DB_PROBE_TIMEOUT_MS } from "@/server/constants/vars.constant";

function isPortReachable(host: string, port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = createConnection({ host, port, timeout: DB_PROBE_TIMEOUT_MS });

    const finish = (reachable: boolean): void => {
      socket.destroy();
      resolve(reachable);
    };

    socket.once("connect", () => {
      finish(true);
    });
    socket.once("timeout", () => {
      finish(false);
    });
    socket.once("error", () => {
      finish(false);
    });
  });
}

export async function warnIfDbUnreachable(): Promise<void> {
  try {
    const url = new URL(getEnvs().DATABASE_URL);
    const host = url.hostname;
    const port = url.port ? Number(url.port) : 27017;

    if (await isPortReachable(host, port)) return;

    logger.warn(
      { host, port },
      `MongoDB is not reachable at ${host}:${port}. The app will start anyway, but any request that hits the database will fail. Start it with: docker compose -f dev.docker-compose.yml up -d nexdrive-db`
    );
  } catch {
    // This check must never break the boot — invalid envs or a malformed URL surface later, on the first real DB call.
  }
}

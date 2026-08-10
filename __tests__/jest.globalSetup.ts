import { execSync } from "child_process";
import { Socket } from "net";

import { mockEnvs } from "./__mocks__/envs.mock";

const COMPOSE_FILE = "test.docker-compose.yml";
const PROBE_TIMEOUT_MS = 1000;

declare global {
  var __testDbStartedByJest__: boolean | undefined;
}

const isReachable = (host: string, port: number): Promise<boolean> =>
  new Promise((resolve) => {
    const socket = new Socket();

    const finish = (reachable: boolean): void => {
      socket.destroy();
      resolve(reachable);
    };

    socket.setTimeout(PROBE_TIMEOUT_MS);
    socket.once("connect", () => {
      finish(true);
    });
    socket.once("timeout", () => {
      finish(false);
    });
    socket.once("error", () => {
      finish(false);
    });
    socket.connect(port, host);
  });

export default async (): Promise<void> => {
  globalThis.__testDbStartedByJest__ = false;

  const host = mockEnvs.MONGO_HOST;
  const port = Number(mockEnvs.MONGO_PORT);

  if (process.env.SKIP_TEST_DB === "true") {
    console.info(`[jest] SKIP_TEST_DB=true — expecting MongoDB on ${host}:${port}.`);
    return;
  }

  if (await isReachable(host, port)) {
    console.info(`[jest] Reusing the MongoDB already listening on ${host}:${port}.`);
    return;
  }

  try {
    execSync(`docker compose -f ${COMPOSE_FILE} up -d --wait`, { stdio: "inherit" });
  } catch (error) {
    throw new Error(
      [
        `Nothing is listening on ${host}:${port} and "${COMPOSE_FILE}" could not be started.`,
        "",
        "Pick one:",
        "  - with Docker:    start the Docker daemon and re-run.",
        `  - without Docker: point a MongoDB at ${host}:${port} (user "${mockEnvs.MONGO_USER}",`,
        `                    password "${mockEnvs.MONGO_PASS}", database "${mockEnvs.MONGO_DB_NAME}")`,
        "                    and re-run with SKIP_TEST_DB=true.",
        "",
        `Cause: ${error instanceof Error ? error.message : String(error)}`,
      ].join("\n")
    );
  }

  globalThis.__testDbStartedByJest__ = true;
};

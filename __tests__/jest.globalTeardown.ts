import { execSync } from "child_process";

const COMPOSE_FILE = "test.docker-compose.yml";

export default (): void => {
  if (globalThis.__testDbStartedByJest__ !== true) return;

  execSync(`docker compose -f ${COMPOSE_FILE} down -v --remove-orphans`, {
    stdio: "inherit",
  });
};

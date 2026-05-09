import { execSync } from "child_process";

export default (): void => {
  execSync("docker compose -f test.docker-compose.yml down -v --remove-orphans", {
    stdio: "inherit",
  });
};

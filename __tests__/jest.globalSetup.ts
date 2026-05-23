import { execSync } from "child_process";

import { mockEnvs } from "./__mocks__/envs.mock";

export default (): void => {
  execSync("docker compose -f test.docker-compose.yml up -d --wait", {
    stdio: "inherit",
    env: {
      ...process.env,
      MONGO_USER: mockEnvs.MONGO_USER,
      MONGO_PASS: mockEnvs.MONGO_PASS,
      MONGO_DB_NAME: mockEnvs.MONGO_DB_NAME,
    },
  });
};

import path from "path";

import { getEnvs } from "@/server/configs/env.config";

export const getCloudPath = (username: string, ...segments: string[]): string =>
  path.join(getEnvs().CLOUD_PATH, username, ...segments);

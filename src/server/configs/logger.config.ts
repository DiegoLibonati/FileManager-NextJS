import pino from "pino";

import type { Logger } from "pino";

import { getEnvs } from "@/server/configs/env.config";

let _logger: Logger | null = null;

function init(): Logger {
  const envs = getEnvs();
  const isDev = envs.ENV === "development";

  return pino({
    level: envs.LOG_LEVEL,
    ...(isDev
      ? {
          transport: {
            target: "pino-pretty",
            options: { colorize: true, translateTime: "SYS:standard", ignore: "pid,hostname" },
          },
        }
      : {}),
  });
}

export const logger: Logger = new Proxy({} as Logger, {
  get(_target, prop: string | symbol, receiver: unknown): unknown {
    _logger ??= init();
    return Reflect.get(_logger, prop, receiver);
  },
});

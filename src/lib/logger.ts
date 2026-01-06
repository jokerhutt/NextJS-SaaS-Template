import pino from "pino";

const defaultLevel = "info"

export const logger = pino({
  level: process.env.LOG_LEVEL ?? defaultLevel,
});
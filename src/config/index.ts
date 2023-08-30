import { readFileSync } from "fs";
import loggerConfig from "./logger/index";

const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  logger: loggerConfig,
  // additional shared configuration
};

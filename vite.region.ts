import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface LovrabetDevServerRouting {
  hostname: "dev.lovrabet.com" | "dev.lovrabet.id";
  certificateUrl:
    | "https://g.lovrabet.com/cert/lovrabet-dev.json"
    | "https://g.lovrabet.id/cert/lovrabet-dev.json";
}

export function resolveDevServerRouting(projectRoot: string): LovrabetDevServerRouting {
  try {
    const projectConfig = JSON.parse(
      readFileSync(join(projectRoot, ".rabetbase.json"), "utf8"),
    ) as { region?: unknown };
    if (projectConfig.region === "id") {
      return {
        hostname: "dev.lovrabet.id",
        certificateUrl: "https://g.lovrabet.id/cert/lovrabet-dev.json",
      };
    }
  } catch {
    // The template source has no project config until `rabetbase workspace init` runs.
  }
  return {
    hostname: "dev.lovrabet.com",
    certificateUrl: "https://g.lovrabet.com/cert/lovrabet-dev.json",
  };
}

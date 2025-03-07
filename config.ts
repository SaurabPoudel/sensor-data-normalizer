import { SensorConfig } from "./types.ts";

export async function loadConfig(filePath: string): Promise<SensorConfig[]> {
  const jsonText = await Deno.readTextFile(filePath);
  const config = JSON.parse(jsonText) as SensorConfig[];
  // Basic validation
  config.forEach((c) => {
    if (!c.type || !c.unit || !c.inputRange) {
      throw new Error("Invalid sensor config: missing required fields");
    }
  });
  return config;
}
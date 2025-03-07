import { SensorDataNormalizer, loadConfig } from "../mod.ts";

async function run() {
  const configs = await loadConfig("./config.json");
  const normalizer = new SensorDataNormalizer(configs);

  // Simulate Arduino temp sensor (analog, 0-1023 range)
  const rawData = { value: 512, timestamp: Date.now() };
  const normalized = normalizer.normalize("temperature", rawData);
  console.log("Normalized Temp:", normalized);
}

if (import.meta.main) run();
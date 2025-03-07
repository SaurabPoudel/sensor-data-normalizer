import { assertEquals, assertThrows, assertAlmostEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { SensorDataNormalizer } from "../normalizer.ts";
import { SensorConfig, RawSensorData } from "../types.ts";

Deno.test("SensorDataNormalizer - Basic Normalization", () => {
  const config: SensorConfig[] = [
    {
      type: "temperature",
      unit: "celsius",
      inputRange: [0, 1023],
      outputRange: [0, 100],
    },
  ];
  const normalizer = new SensorDataNormalizer(config);

  const raw: RawSensorData = { value: 511.5 };
  const result = normalizer.normalize("temperature", raw);

  assertEquals(result.value, 50, "Value should be normalized to 50");
  assertEquals(result.unit, "celsius", "Unit should match config");
});

Deno.test("SensorDataNormalizer - Digital Sensor", () => {
  const config: SensorConfig[] = [
    {
      type: "light",
      unit: "binary",
      inputRange: [0, 1],
      digital: true,
    },
  ];
  const normalizer = new SensorDataNormalizer(config);

  assertEquals(normalizer.normalize("light", { value: 0 }).value, 0, "Digital 0 should stay 0");
  assertEquals(normalizer.normalize("light", { value: 1 }).value, 1, "Digital 1 should stay 1");
  assertEquals(normalizer.normalize("light", { value: 0.5 }).value, 1, "Digital non-zero should be 1");
});

Deno.test("SensorDataNormalizer - Timestamp Preservation", () => {
  const config: SensorConfig[] = [
    { type: "humidity", unit: "percentage", inputRange: [0, 100] },
  ];
  const normalizer = new SensorDataNormalizer(config);

  const timestamp = Date.now();
  const result = normalizer.normalize("humidity", { value: 50, timestamp });

  assertEquals(result.timestamp, timestamp, "Timestamp should be preserved");
});

Deno.test("SensorDataNormalizer - Unknown Sensor Type", () => {
  const normalizer = new SensorDataNormalizer([]);
  assertThrows(
    () => normalizer.normalize("unknown", { value: 10 }),
    Error,
    "Unknown sensor type: unknown",
    "Should throw for unknown sensor type"
  );
});

Deno.test("SensorDataNormalizer - Register New Sensor Type", () => {
  const normalizer = new SensorDataNormalizer([]);
  normalizer.registerSensorType({
    type: "pressure",
    unit: "pascals",
    inputRange: [0, 1023],
    outputRange: [0, 101325],
  });

  const result = normalizer.normalize("pressure", { value: 511.5 });
  assertAlmostEquals(result.value, 50662.5, 1, "Newly registered type should work");
});
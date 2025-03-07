import { assertEquals, assertAlmostEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { scaleValue, smoothData, fahrenheitToCelsius } from "../utils.ts";

Deno.test("scaleValue - Basic Scaling", () => {
  const result = scaleValue(50, [0, 100], [0, 1]);
  assertEquals(result, 0.5, "50 in [0,100] should scale to 0.5 in [0,1]");
});

Deno.test("scaleValue - Edge Cases", () => {
  assertEquals(scaleValue(0, [0, 100], [0, 1]), 0, "Min input should map to min output");
  assertEquals(scaleValue(100, [0, 100], [0, 1]), 1, "Max input should map to max output");
});

Deno.test("smoothData - Simple Moving Average", () => {
  const data = [1, 2, 3, 4, 5];
  const smoothed = smoothData(data, 3);
  assertEquals(smoothed, [1, 1.5, 2, 3, 4], "Should compute moving average correctly");
});

Deno.test("smoothData - Small Window", () => {
  const data = [1, 2, 3];
  const smoothed = smoothData(data, 1);
  assertEquals(smoothed, [1, 2, 3], "Window of 1 should return original data");
});

Deno.test("fahrenheitToCelsius - Conversion", () => {
  assertAlmostEquals(fahrenheitToCelsius(32), 0, 0.01, "32°F should be 0°C");
  assertAlmostEquals(fahrenheitToCelsius(212), 100, 0.01, "212°F should be 100°C");
});
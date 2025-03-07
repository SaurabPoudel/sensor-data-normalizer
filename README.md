# Sensor Data Normalizer

A Deno library for normalizing raw sensor data into standard units and ranges.

## Installation
```bash
deno add @saurab/sensor-data-normalizer
```

## Usage

```ts
import { SensorDataNormalizer, loadConfig } from "@yourname/sensor-data-normalizer";

const configs = await loadConfig("config.json");
const normalizer = new SensorDataNormalizer(configs);

const raw = { value: 512 };
const result = normalizer.normalize("temperature", raw);
console.log(result); // { value: 50, unit: "celsius" }
```

## Features
- Supports temperature, humidity, pressure, and light sensors.
- Customizable normalization ranges.
- Utility functions: scaling, smoothing, unit conversion.


## Extending

Add new sensor types

```ts
normalizer.registerSensorType({
  type: "pressure",
  unit: "pascals",
  inputRange: [0, 1023],
  outputRange: [0, 101325]
});
```

See `examples/` for more use cases.

---

### Next Steps
- Test the library with real sensor data.
- Add more utility functions (e.g., noise filtering with median).
- Implement error handling for edge cases (e.g., out-of-range values).

Let me know if you’d like to refine any part of this!



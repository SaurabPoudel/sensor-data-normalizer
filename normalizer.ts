import { SensorConfig, RawSensorData, NormalizedSensorData } from "./types.ts";
import { scaleValue } from "./utils.ts";

export class SensorDataNormalizer {
  private sensorTypes: Map<string, SensorConfig> = new Map();

  constructor(configs: SensorConfig[]) {
    configs.forEach((config) => this.registerSensorType(config));
  }

  // Register a new sensor type
  registerSensorType(config: SensorConfig) {
    this.sensorTypes.set(config.type, config);
  }

  // Normalize raw sensor data
  normalize(type: string, data: RawSensorData): NormalizedSensorData {
    const config = this.sensorTypes.get(type);
    if (!config) throw new Error(`Unknown sensor type: ${type}`);

    let normalizedValue = data.value;

    // Handle digital vs analog
    if (config.digital) {
      normalizedValue = data.value === 0 ? 0 : 1; // Binary normalization
    } else {
      // Scale analog value to output range
      const outputRange = config.outputRange || [0, 100];
      normalizedValue = scaleValue(
        data.value,
        config.inputRange,
        outputRange
      );
    }

    return {
      value: normalizedValue,
      unit: config.unit,
      timestamp: data.timestamp,
    };
  }
}
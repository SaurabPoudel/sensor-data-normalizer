export interface SensorConfig {
    type: string;              // e.g., "temperature", "humidity"
    unit: string;              // e.g., "celsius", "percentage"
    inputRange: [number, number]; // e.g., [0, 1023] for analog sensor
    outputRange?: [number, number]; // e.g., [0, 100] or [0, 1]
    digital?: boolean;         // True if digital sensor
  }
  
  export interface RawSensorData {
    value: number;
    timestamp?: number;        // Optional timestamp
  }
  
  export interface NormalizedSensorData {
    value: number;
    unit: string;
    timestamp?: number;
  }
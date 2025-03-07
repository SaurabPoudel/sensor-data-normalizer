// Scale a value from one range to another
export function scaleValue(
    value: number,
    inputRange: [number, number],
    outputRange: [number, number]
  ): number {
    const [inMin, inMax] = inputRange;
    const [outMin, outMax] = outputRange;
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
  
  // Simple moving average for smoothing
  export function smoothData(values: number[], windowSize: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < values.length; i++) {
      const start = Math.max(0, i - windowSize + 1);
      const slice = values.slice(start, i + 1);
      const avg = slice.reduce((sum, val) => sum + val, 0) / slice.length;
      result.push(avg);
    }
    return result;
  }
  
  // Unit conversion: Fahrenheit to Celsius
  export function fahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * (5 / 9);
  }
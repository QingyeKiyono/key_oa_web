interface JsonResponse<T = any> {
  code: String;
  message: String;
  data: T;
}
export { type JsonResponse };

// Entity types.
export { type Employee, type Page } from "./Entity";

// Actuator type.
export { type Actuator, type Metrics, type MetricsNames } from "./Actuator";

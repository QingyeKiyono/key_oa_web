interface JsonResponse<T = any> {
  code: String;
  message: String;
  data: T;
}
export { type JsonResponse };

// Entity types.
import { Employee, Page } from "./Entity";
export { type Employee, type Page };

// Actuator type.
// noinspection ES6PreferShortImport
import { Actuator, Metrics, MetricsNames } from "./Actuator";
export { type Actuator, type Metrics, type MetricsNames };

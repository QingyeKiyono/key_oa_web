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
import Actuator from "./Actuator";
export { type Actuator };

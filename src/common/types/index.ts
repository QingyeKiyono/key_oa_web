interface JsonResponse<T = any> {
  code: String;
  message: String;
  data: T;
}
export { type JsonResponse };

export {
  type DataTableHeader,
  type SelectItemKey,
  type DataTableCompareFunction,
} from "./VuetifyType";

// Entity types.
export { type Employee, type PageRes } from "./Entity";

// Actuator type.
export { type Actuator, type Metrics, type MetricsNames } from "./Actuator";

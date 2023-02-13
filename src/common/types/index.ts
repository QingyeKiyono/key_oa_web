interface JsonResponse<T = any> {
  code: String;
  message: String;
  data: T;
}
export { type JsonResponse };

interface VDataTableHeader {
  title: String;
  sortable: Boolean;
  align: "start" | "end";
  key: String;
}

export { type VDataTableHeader };

// Entity types.
export { type Employee, type PageRes } from "./Entity";

// Actuator type.
export { type Actuator, type Metrics, type MetricsNames } from "./Actuator";

// 一下代码摘自Vuetify源码，用于类型推导

// src/util/helpers.ts
export type SelectItemKey =
  | boolean // Ignored
  | string // Lookup by key, can use dot notation for nested objects
  | (string | number)[] // Nested lookup by key, each array item is a key in the next level
  | ((item: Record<string, any>, fallback?: any) => any);

// src/labs/VDataTable/types.ts
export type DataTableCompareFunction<T = any> = (a: T, b: T) => number;

// src/labs/VDataTable/types.ts
export type DataTableHeader = {
  key: string;
  value?: SelectItemKey;
  title: string;

  colspan?: number;
  rowspan?: number;

  fixed?: boolean;
  align?: "start" | "end";

  width?: number;
  minWidth?: string;
  maxWidth?: string;

  sortable?: boolean;
  sort?: DataTableCompareFunction;
};

// VDataTable中@update:options的options
export interface DataTableOptions {
  page: number;
  itemsPerPage: number;
  sortBy?: String;
  // For unknown fields
  [prop: string]: unknown;
}

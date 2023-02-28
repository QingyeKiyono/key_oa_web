// Constant
import { useTheme } from "vuetify";
import { getCookie } from "typescript-cookie";
import { CookieName } from "@/common/Constant";

// 用于初始化页面的颜色主图
function initTheme() {
  const theme = useTheme();
  theme.global.name.value = getCookie(CookieName.theme) || "light";
}

// Cookie names
export { CookieName } from "./Constant";

// Types
export { type JsonResponse } from "./types";
export { type Employee, type PageRes } from "./types";
export { type Actuator, type Metrics, type MetricsNames } from "./types";
export {
  type DataTableHeader,
  type SelectItemKey,
  type DataTableCompareFunction,
} from "./types";

// Theme initialization
export { initTheme };

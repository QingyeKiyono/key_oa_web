import { createPinia } from "pinia";

// Pinia
const pinia = createPinia();
export default pinia;

// Stores.
import useLoginStore from "@/plugins/store/UseLoginStore";
export { useLoginStore };

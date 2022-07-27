import { createPinia } from "pinia";

// Pinia
const pinia = createPinia();
export default pinia;

// Stores.
import useLoginStore from "@/store/UseLoginStore";
export { useLoginStore };

import axios, { AxiosRequestConfig } from "axios";
import JsonResponse from "../common/JsonResponse";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  responseType: "json",
  responseEncoding: "utf-8",
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
  validateStatus: (status) => status < 500,
});

const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<JsonResponse<T>> => {
  const { data } = await instance.request<JsonResponse<T>>(config);
  return data;
};

export default request;

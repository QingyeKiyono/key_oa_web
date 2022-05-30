import axios, { AxiosRequestConfig } from "axios";
import { CookieName, JsonResponse } from "@/common";
import { getCookie } from "typescript-cookie";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  responseType: "json",
  responseEncoding: "utf-8",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  validateStatus: (status) => status < 500,
});

const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await instance.request<T>(config);
  return data;
};

const jsonResRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<JsonResponse<T>> => {
  let token = getCookie(CookieName.token);
  if (token != null) {
    config = { headers: { token }, ...config };
  }
  const { data } = await instance.request<JsonResponse<T>>(config);
  return data;
};

export { request, jsonResRequest };

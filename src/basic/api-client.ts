import axios, { AxiosHeaders } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { getHeaders, handleUnauthorized } from "./utils";

const API_ROOT = "/api"
export const apiClient = axios.create({
  baseURL: API_ROOT,
  timeout: 60000,
});

export const refreshAuthCall = async () => {
  const url = `${API_ROOT}/refresh`;
  const headers = getHeaders(new AxiosHeaders());
  try {
    await axios.post<boolean>(url, null, {
      withCredentials: true,
      headers,
    });
    return Promise.resolve();
  } catch (error) {
    handleUnauthorized();
    return Promise.reject(error);
  }
};

apiClient.interceptors.request.use((config) => {
  config.headers = getHeaders(config.headers);
  return config;
});

createAuthRefreshInterceptor(apiClient, refreshAuthCall, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

import { AxiosRequestHeaders } from "axios";

import { queryClient } from "./query-client";
import { useAuthStore } from "./store/auth";

export const handleUnauthorized = () => {
  queryClient.clear();
  useAuthStore.getState().actions.logout();
};

export const getHeaders = (
  headers: AxiosRequestHeaders,
): AxiosRequestHeaders => {
  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};


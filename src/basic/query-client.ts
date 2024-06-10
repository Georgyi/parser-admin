import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //   staleTime: 5 * 60 * 1000, // 5min
      // retryDelay: () => 0,
      retry: (failureCount, error) => {
        // если бэк вернул 403, не пытаемся повторить этот запрос
        if (error instanceof AxiosError && error.response?.status === 403) {
          return false;
        }
        return failureCount <= 3;
      },
      retryDelay: (attemptIndex) => {
        if (attemptIndex <= 1) return 0;
        return Math.min(1000 * 2 ** attemptIndex, 30000);
      },
      refetchOnWindowFocus: false,
    },
  },
});

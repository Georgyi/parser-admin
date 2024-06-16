import React, { lazy, Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import { queryClient } from './basic/query-client';
import { theme } from './basic/theme';

function App() {
const Login = lazy(() => import('./pages/login'));
const ProtectedPages = lazy(() => import('./features/protected-pages'));

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Suspense fallback={'Loading...'}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<ProtectedPages />} />
          </Routes>
        </Suspense>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;

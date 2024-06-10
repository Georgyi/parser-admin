import React, { lazy, Suspense, useMemo } from 'react';
import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/basic/store/auth";


const ProtectedPages = () => {
  const AppLayout = useMemo(() => lazy(() => import('../app-layout')), []);

  const loggedIn = useAuthStore((store) => store.loggedIn);

  // if (!loggedIn) {
  //   return <Navigate to="/login" />
  // }

  return (
    <>
      <Suspense fallback={'Loading...'}>
        <AppLayout />
      </Suspense>
    </>
  );
};

export default ProtectedPages;

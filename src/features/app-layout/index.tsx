import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PageNotFound from '@/pages/page-not-found';
import Header from '@/features/header';
import { useProtectedRoutes } from "@/basic/routes/hooks";

const AppLayout = () => {
  const protectedRoutes = useProtectedRoutes();



  return (
    <>
      <Header routes={protectedRoutes} />

      <Routes>
        {protectedRoutes.map(({ path, component }, index) => (
          <Route key={index} path={path} element={component} />
        ))}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppLayout;

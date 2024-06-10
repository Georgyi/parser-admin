import { useMemo } from 'react';
import { ERouteTypes, RouteElement, routes } from '@/basic/routes/index';
import { useAccess } from '@/basic/roles/hooks';
import { useAuthStore } from '@/basic/store/auth';

export const useProtectedRoutes = () => {
  const { checkAccess } = useAccess();
  const loggedIn = useAuthStore((store) => store.loggedIn);

  return useMemo<RouteElement[]>(() => {
    return routes.filter((r) => {
      if (r.type === ERouteTypes.LOGIN && loggedIn) {
        return false;
      }

        return true;
    });

    // return routes.filter((r) =>
    //   r.right ? checkAccess({ right: r.right }) : true
    // );
  }, [checkAccess, loggedIn]);
};

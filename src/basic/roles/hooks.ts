import { RIGHTS, RIGHTS_BY_ROLES_MAP } from "./constant";
import { useProfileStore } from "../store/profile";

export function useAccess() {
  const activeRole = useProfileStore((state) => state.role);

  return {
    checkAccess: ({ right }: { right: RIGHTS }) => {
      if (!activeRole) return false;

      return RIGHTS_BY_ROLES_MAP?.[activeRole]?.[right] || false;
    },
  };
}

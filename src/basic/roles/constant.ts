import { RoleNameType } from "./types";


export enum RIGHTS {
  // Pages
  SHOW_GLOBAL_FILTER_PAGE = 'SHOW_GLOBAL_FILTER_PAGE',
  SHOW_JOBS_PAGE = 'SHOW_JOBS_PAGE',
  SHOW_MESSAGES_PAGE = 'SHOW_MESSAGES_PAGE',
  SHOW_ANALYTICS_PAGE = 'SHOW_ANALYTICS_PAGE',
  SHOW_ACTIVITIES_PAGE = 'SHOW_ACTIVITIES_PAGE',
  SHOW_SETTINGS_PAGE = 'SHOW_SETTINGS_PAGE',
}

const defaultRights = {
  SHOW_GLOBAL_FILTER_PAGE: false,
  SHOW_JOBS_PAGE: false,
  SHOW_MESSAGES_PAGE: false,
  SHOW_ANALYTICS_PAGE: false,
  SHOW_ACTIVITIES_PAGE: false,
  SHOW_SETTINGS_PAGE: false,
};

export const RIGHTS_BY_ROLES_MAP: {
  [key in RoleNameType]: { [key in RIGHTS]?: boolean };
} = {
  user: {
    ...defaultRights,
    SHOW_GLOBAL_FILTER_PAGE: true,
    SHOW_JOBS_PAGE: true,
    SHOW_MESSAGES_PAGE: true,
    SHOW_ANALYTICS_PAGE: true,
    SHOW_ACTIVITIES_PAGE: true,
    SHOW_SETTINGS_PAGE: true,
  },
};

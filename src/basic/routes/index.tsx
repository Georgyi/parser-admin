import React from 'react';

import { RIGHTS } from '@/basic/roles/constant';
import GlobalFilterPage from '@/pages/parser-filter';
import MessagesPage from '@/pages/messages';
import JobsPage from '@/pages/jobs';
import AnalyticsPage from '@/pages/analytics';
import ActivitiesPage from '@/pages/activities';
import SettingsPage from '@/pages/settings';

export type RouteElement = {
  path: string;
  type: ERouteTypes;
  component: React.ReactElement | null;
  right?: RIGHTS;
};

export enum ERouteTypes {
  LOGIN = 'login',
  FILTER = 'filter',
  JOBS = 'jobs',
  MESSAGES = 'messages',
  ANALYTICS = 'analytics',
  ACTIVITIES = 'activities',
  SETTINGS = 'settings',
}

export const routes: RouteElement[] = [
  // General pages
  {
    path: '/login',
    type: ERouteTypes.LOGIN,
    component: <GlobalFilterPage />,
    right: RIGHTS.SHOW_GLOBAL_FILTER_PAGE,
  },

  // Protected Pages
  {
    path: '/',
    type: ERouteTypes.FILTER,
    component: <GlobalFilterPage />,
    right: RIGHTS.SHOW_GLOBAL_FILTER_PAGE,
  },
  {
    path: '/jobs',
    type: ERouteTypes.JOBS,
    component: <JobsPage />,
    right: RIGHTS.SHOW_JOBS_PAGE,
  },
  {
    path: '/messages',
    type: ERouteTypes.MESSAGES,
    component: <MessagesPage />,
    right: RIGHTS.SHOW_MESSAGES_PAGE,
  },
  {
    path: '/analytics',
    type: ERouteTypes.ANALYTICS,
    component: <AnalyticsPage />,
    right: RIGHTS.SHOW_ANALYTICS_PAGE,
  },
  {
    path: '/activities',
    type: ERouteTypes.ACTIVITIES,
    component: <ActivitiesPage />,
    right: RIGHTS.SHOW_ACTIVITIES_PAGE,
  },
  {
    path: '/settings',
    type: ERouteTypes.SETTINGS,
    component: <SettingsPage />,
    right: RIGHTS.SHOW_SETTINGS_PAGE,
  },
];

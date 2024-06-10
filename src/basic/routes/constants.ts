import { ERouteTypes } from "@/basic/routes/index";

export const ROUTES_NAMES_MAP: { [key in ERouteTypes]: string } = {
  login: "Login",
  filter: "Filter",
  jobs: "Jobs",
  messages: "Messages",
  analytics: "Analytics",
  activities: "Activities",
  settings: "Settings",
}
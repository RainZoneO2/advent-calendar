import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/media-list", "routes/api.media-list.tsx"),
] satisfies RouteConfig;

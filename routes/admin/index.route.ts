
import { Express } from "express";
import { systemConfig } from "../../config/system";
import { dashBoardRoutes } from "./dashboard.route";
import { topicsRoutes } from "./topic.route";
import { songsRoutes } from "./song.route";
const adminRoutes = (app: Express): void => {
  const path = `/${systemConfig.prefixAdmin}`;
  
  app.use(`${path}/dashboard`, dashBoardRoutes);
  app.use(`${path}/topics`, topicsRoutes);
  app.use(`${path}/songs`, songsRoutes);
};
export default adminRoutes;

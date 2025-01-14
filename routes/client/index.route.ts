import { Express } from "express";
import { topicsRoutes } from "./topic.route";
import { songRoutes } from "./song.route";

const clientRoutes = (app: Express): void =>{

    app.use(`/topics`, topicsRoutes)
    app.use(`/songs`, songRoutes)
}

export default clientRoutes;

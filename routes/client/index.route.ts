import { Express } from "express";
import { topicsRoutes } from "./topic.route";

const clientRoutes = (app: Express): void =>{

    app.use(`/topics`, topicsRoutes)
}

export default clientRoutes;

import { Express } from "express";
import { topicsRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite-song.route";
import { searchRoutes } from "./search.route";

const clientRoutes = (app: Express): void =>{

    app.use(`/topics`, topicsRoutes)
    app.use(`/songs`, songRoutes)
    app.use(`/favarite-songs`, favoriteSongRoutes)
    app.use(`/search`, searchRoutes)
}

export default clientRoutes;

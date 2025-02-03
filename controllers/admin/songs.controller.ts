import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topics.model";
import Singer from "../../models/singer.model";
import { title } from "process";
import { systemConfig } from "../../config/system";


// [GET] /admin/songs
export const index= async (req:Request, res: Response) =>{
    const songs = await Song.find({
        deleted:false
    })
    
    res.render("admin/pages/songs/index",{
        pageTitle: "Quản lý bài hát ",
        songs:songs
    });
}

// [GET] /admin/songs/create
export const create= async (req:Request, res: Response) =>{
    const topics = await Topic.find({
        deleted:false,
        status:"active"
    }).sort("desc").select("title");

    const singers = await Singer.find({
        status:"active",
        deleted:false
    }).select("fullName");

    
    res.render("admin/pages/songs/create",{
        pageTitle: "Quản lý bài hát ",
        topics:topics,
        singers:singers
    });
}

// [Post] /admin/songs/create
export const createPost= async (req:Request, res: Response) =>{
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: req.body.avatar  
    };

    const song = new Song(dataSong);
    await song.save();
   res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}
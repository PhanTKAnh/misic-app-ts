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

    let avatar = "";
    let  audio = "";
    if(req.body.avatar){
        avatar = req.body.avatar[0]
    }
    if(req.body.avatar){
        audio = req.body.audio[0]
    }
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar:avatar,
        audio:audio,
        lyrics:req.body.lyrics 
    };

    const song = new Song(dataSong);
    await song.save();
   res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}

// [GET] /admin/songs/edit/:id
export const edit= async (req:Request, res: Response) =>{
    const id = req.params.id;

    const song = await Song.findOne({
        _id:id,
        deleted: false
    });

    const topics = await Topic.find({
        deleted:false
    }).select("title");

    const singers = await Singer.find({
        deleted: false
    }).select("fullName");
       
    
    res.render("admin/pages/songs/edit",{
        pageTitle: "Quản lý bài hát ",
        song: song,
        topics: topics,
        singers:singers
    });
}
// [PATCH] /admin/songs/edit/:id
export const editPatch= async (req:Request, res: Response) =>{
    const id = req.params.id;
    console.log(req.body);

   

    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics:req.body.lyrics 
    };
    if(req.body.avatar){
        dataSong["avatar"] = req.body.avatar[0]
    }
    if(req.body.avatar){
        dataSong["audio"] = req.body.audio[0]
    }

    await Song.updateOne({
        _id:id,
        
    },dataSong);

    res.redirect("back");
}
import { Request, Response } from "express";

// [GET] /songs/:slugTopic
export const index= async (req:Request, res: Response) =>{
    
    res.render("admin/pages/dashboard/index",{
        pageTitle: "Tổng quan"

    
    });
}
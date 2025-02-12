import mongoose from "mongoose"
const favoriteSongSchema = new mongoose.Schema(
    {
        userId:String,
        songId:String, 
        deleted: {
            type: Boolean,
            default: false
        },
        deleteAt: Date

    }, {
    timestamps: true
}
);
const  FavoriteSong= mongoose.model('FavoriteSong',  favoriteSongSchema, "favorite-song");

export default FavoriteSong;

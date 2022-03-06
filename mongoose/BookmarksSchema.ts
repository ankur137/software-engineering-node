/**
 * @file Implements mongoose schema for bookmarks
 */
import mongoose,{Schema} from "mongoose";
import Bookmarks from "../models/Bookmarks";

/**
 * @typedef Bookmarks Represents bookmarks
 * @property {ObjectId} bookmarkedTuit string of Tuit ID
 * @property {ObjectId} bookmarkedBy string of User ID
 */
const BookmarksSchema = new mongoose.Schema<Bookmarks>({
    bookmarkedTuit:{type:Schema.Types.ObjectId,ref:"TuitModel"},
    bookmarkedBy:{type:Schema.Types.ObjectId,ref:"UserModel"},
},{collection:"bookmarks"});

export default BookmarksSchema;
/**
 * @file Implements mongoose schema for likes
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";

/**
 * @typedef Tuit Represents tuits
 * @property {string} tuit string of the tuit
 * @property {Date} postedOn Date of tuit
 * @property {ObjectId} postedBy string of User ID
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: String,
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    },{collection:'tuits'}
);
export default TuitSchema;
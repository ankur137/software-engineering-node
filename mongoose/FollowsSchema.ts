/**
 * @file Implements mongoose schema for follows
 */
import mongoose, {Schema} from "mongoose";
import Follows from "../models/Follows";

/**
 * @typedef Follows Represents follows
 * @property {ObjectId} followedBy string of User ID
 * @property {ObjectId} following string of User ID
 */
const FollowsSchema = new mongoose.Schema<Follows>({
    followedBy:{type:Schema.Types.ObjectId, ref:"UserModel"},
    following:{type:Schema.Types.ObjectId, ref:"UserModel"},
},{collection:"follows"});
export default FollowsSchema;
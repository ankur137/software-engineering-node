/**
 * @file Implements mongoose schema for likes
 */
import mongoose, {Schema} from "mongoose";
import Messages from "../models/Messages";

/**
 * @typedef Messages Represents messages
 * @property {string} message string of the message, is required
 * @property {ObjectId} to string of User ID
 * @property {ObjectId} from string of User ID
 * @property {Date} sentOn Date of message
 */
const MessagesSchema = new mongoose.Schema<Messages>({
    message:{type: String, required: true},
    to:{type: Schema.Types.ObjectId, ref: "UserModel",required:true},
    from:{type: Schema.Types.ObjectId, ref: "UserModel",required:true},
    sentOn:{type: Date, default: Date.now}
},{collection:"messages"});
export default MessagesSchema;
import mongoose, {Schema} from "mongoose";
import Messages from "../models/Messages";

const MessagesSchema = new mongoose.Schema<Messages>({
    message:{type: String, required: true},
    to:{type: Schema.Types.ObjectId, ref: "UserModel",required:true},
    from:{type: Schema.Types.ObjectId, ref: "UserModel",required:true},
    sentOn:{type: Date, default: Date.now}
},{collection:"messages"});
export default MessagesSchema;
/**
 * @file Implements mongoose model to CRUD
 * documents in the messages collection
 */
import mongoose from "mongoose";
import MessagesSchema from "./MessagesSchema";
const MessagesModel = mongoose.model("MessagesModel",MessagesSchema);
export default MessagesModel;
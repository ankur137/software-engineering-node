import Messages from "../models/Messages";

export default interface MessagesDaoI{
    findAllMessagesSentByUser(uid:string):Promise<Messages[]>;
    findAllMessagesSentToUser(uid:string):Promise<Messages[]>;
    sendMessage(message:Messages):Promise<Messages>;
    unsendMessage(mid:string):Promise<any>;
}
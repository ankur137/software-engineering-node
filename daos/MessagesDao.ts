import MessagesDaoI from "../interfaces/MessagesDaoI";
import Messages from "../models/Messages";
import MessagesModel from "../mongoose/MessagesModel";

export default class MessagesDao implements MessagesDaoI{
    private static messagesDao:MessagesDao|null=null;
    public static getInstance=():MessagesDao=>{
        if(MessagesDao.messagesDao===null){
            MessagesDao.messagesDao = new MessagesDao();
        }
        return MessagesDao.messagesDao;
    }
    private constructor() {
    }

    findAllMessagesSentByUser = async (uid: string): Promise<Messages[]> =>
        MessagesModel.find({from:uid})
            .populate("message")
            .exec();

    findAllMessagesSentToUser = async (uid: string): Promise<Messages[]> =>
        MessagesModel.find({to:uid})
            .populate("message")
            .exec();

    sendMessage = async (message: Messages): Promise<Messages> =>
        MessagesModel.create(message);

    unsendMessage = async (mid: string): Promise<any> =>
        MessagesModel.deleteOne({_id:mid})

}
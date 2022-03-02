/**
 * @file Implements DAO managing data storage of Messages. Uses mongoose MessagesModel
 * to integrate with MongoDB
 */
import MessagesDaoI from "../interfaces/MessagesDaoI";
import Messages from "../models/Messages";
import MessagesModel from "../mongoose/MessagesModel";
/**
 * @class MessagesDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessagesDao} messagesDao Private single instance of MessagesDao
 */
export default class MessagesDao implements MessagesDaoI{
    private static messagesDao:MessagesDao|null=null;
    /**
     * Creates singleton DAO instance
     * @returns MessagesDao
     */
    public static getInstance=():MessagesDao=>{
        if(MessagesDao.messagesDao===null){
            MessagesDao.messagesDao = new MessagesDao();
        }
        return MessagesDao.messagesDao;
    }
    private constructor() {
    }

    /**
     * Uses MessagesModel to retrieve all message documents from messages collection
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesSentByUser = async (uid: string): Promise<Messages[]> =>
        MessagesModel.find({from:uid})
            .populate("message")
            .exec();

    /**
     * Uses MessagesModel to retrieve all message documents from messages collection
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllMessagesSentToUser = async (uid: string): Promise<Messages[]> =>
        MessagesModel.find({to:uid})
            .populate("message")
            .exec();

    /**
     * Inserts message instance into the database
     * @param {Message} message request body of the Message
     * @returns Promise To be notified when message is inserted into the database
     */
    sendMessage = async (message: Messages): Promise<Messages> =>
        MessagesModel.create(message);

    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message being unsent
     * @returns Promise To be notified when message is removed from the database
     */
    unsendMessage = async (mid: string): Promise<any> =>
        MessagesModel.deleteOne({_id:mid})

}
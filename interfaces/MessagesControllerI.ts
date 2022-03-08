import Messages from "../models/Messages";
import {Request, Response} from "express";

export default interface MessagesControllerI{
    /**
     * Retrieves all messages sent by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesSentByUser (req: Request, res: Response): void;
    /**
     * Retrieves all messages sent to a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesSentToUser(req: Request, res: Response): void;
    /**
     * @param {Request} req Represents request from client, including the
     * message body and the user details along with time
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    sendMessage (req: Request, res: Response): void;
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters mid representing the message that is unsent
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    unsendMessage (req: Request, res: Response): void;
}
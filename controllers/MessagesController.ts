/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessagesControllerI from "../interfaces/MessagesControllerI";
import {Express,Response,Request} from "express";
import MessagesDao from "../daos/MessagesDao";

/**
 * @class MessagesController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /messages/:uid/sent to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /messages/:uid/received to retrieve all messages received by a user
 *     </li>
 *     <li>POST /messages/send to record that a user sends a message
 *     </li>
 *     <li>DELETE /messages/:mid/delete to record that a user
 *     unsends a message</li>
 * </ul>
 * @property {MessagesDao} messagesDao Singleton DAO implementing message CRUD operations
 * @property {MessagesController} messagesController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessagesController implements MessagesControllerI{
    private static messagesDao: MessagesDao = MessagesDao.getInstance();
    private static messagesController: MessagesController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessagesController
     */
    public static getInstance = (app: Express): MessagesController => {
        if(MessagesController.messagesController === null) {
            MessagesController.messagesController = new MessagesController();
            app.get("/messages/:uid/sent", MessagesController.messagesController.findAllMessagesSentByUser);
            app.get("/messages/:uid/received", MessagesController.messagesController.findAllMessagesSentToUser);
            app.post("/messages/send", MessagesController.messagesController.sendMessage);
            app.delete("/messages/:mid/delete", MessagesController.messagesController.unsendMessage);
        }
        return MessagesController.messagesController;
    }

    private constructor() {}

    /**
     * Retrieves all messages sent by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesSentByUser = (req: Request, res: Response)=>
        MessagesController.messagesDao.findAllMessagesSentByUser(req.params.uid)
            .then(messages=>res.json(messages));

    /**
     * Retrieves all messages sent to a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesSentToUser = (req: Request, res: Response)=>
        MessagesController.messagesDao.findAllMessagesSentToUser(req.params.uid)
            .then(messages=>res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * message body and the user details along with time
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    sendMessage = (req: Request, res: Response)=>
        MessagesController.messagesDao.sendMessage(req.body)
            .then(messages=>res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters mid representing the message that is unsent
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    unsendMessage = (req: Request, res: Response)=>
        MessagesController.messagesDao.unsendMessage(req.params.mid)
            .then(status=>res.send(status));
    
}
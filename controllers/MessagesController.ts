import MessagesControllerI from "../interfaces/MessagesControllerI";
import LikeDao from "../daos/LikeDao";
import {Express,Response,Request} from "express";
import MessagesDao from "../daos/MessagesDao";

export default class MessagesController implements MessagesControllerI{
    private static messagesDao: MessagesDao = MessagesDao.getInstance();
    private static messagesController: MessagesController | null = null;

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
    findAllMessagesSentByUser = (req: Request, res: Response)=>
        MessagesController.messagesDao.findAllMessagesSentByUser(req.params.uid)
            .then(messages=>res.json(messages));

    findAllMessagesSentToUser = (req: Request, res: Response)=>
        MessagesController.messagesDao.findAllMessagesSentToUser(req.params.uid)
            .then(messages=>res.json(messages));

    sendMessage = (req: Request, res: Response)=>
        MessagesController.messagesDao.sendMessage(req.body)
            .then(messages=>res.json(messages));

    unsendMessage = (req: Request, res: Response)=>
        MessagesController.messagesDao.unsendMessage(req.params.mid)
            .then(status=>res.send(status));
    
}
import Messages from "../models/Messages";
import {Request, Response} from "express";

export default interface MessagesControllerI{
    findAllMessagesSentByUser (req: Request, res: Response): void;
    findAllMessagesSentToUser(req: Request, res: Response): void;
    sendMessage (req: Request, res: Response): void;
    unsendMessage (req: Request, res: Response): void;
}
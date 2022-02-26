import {Request, Response} from "express";
import Bookmarks from "../models/Bookmarks";

export default interface BookmarksControllerI{
    findAllBookmarksOfUser(req: Request, res: Response): void;
    userBookmarksTuit(req: Request, res: Response): void;
    userUnBookmarksTuit(req: Request, res: Response): void;
}
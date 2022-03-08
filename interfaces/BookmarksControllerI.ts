import {Request, Response} from "express";
import Bookmarks from "../models/Bookmarks";

export default interface BookmarksControllerI{
    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllBookmarksOfUser(req: Request, res: Response): void;
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is bookmarking the tuit
     * and the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksTuit(req: Request, res: Response): void;
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is removing
     * the tuit from bookmarks and the tuit being removed from bookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userUnBookmarksTuit(req: Request, res: Response): void;
}
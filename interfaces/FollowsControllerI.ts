import {Request, Response} from "express";

export default interface FollowsControllerI{
    /**
     * Retrieves all users that are followed by current user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the current user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersFollowedByUser(req:Request,res:Response):void;
    /**
     * Retrieves all users that are following the current user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the current user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersFollowingUser(req: Request, res: Response): void;
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid_cur and uid representing the current user that is following the user
     * and the uid being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser(req: Request, res: Response): void;
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid_cur and uid representing the current user that is unfollowing the user
     * and the uid being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnFollowsUser(req: Request, res: Response): void;
}
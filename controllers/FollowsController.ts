/**
 * @file Controller RESTful Web service API for follows resource
 */
import FollowsControllerI from "../interfaces/FollowsControllerI";
import FollowsDao from "../daos/FollowsDao";
import {Express, Request, Response} from "express";

/**
 * @class FollowsController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/following to retrieve all the users followed by a user
 *     </li>
 *     <li>GET /users/:uid/followedby to retrieve all users that follow a user
 *     </li>
 *     <li>POST /users/:uid_cur/follows/:uid to record that a user(uid_cur) follows a user
 *     </li>
 *     <li>DELETE /users/:uid_cur/unfollows/:uid to record that a user
 *     no longer follow the user</li>
 * </ul>
 * @property {FollowsDao} followsDao Singleton DAO implementing follows CRUD operations
 * @property {FollowsController} followsController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowsController implements FollowsControllerI{
    private static followsDao:FollowsDao=FollowsDao.getInstance();
    private static followsController:FollowsController|null=null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowsController
     */
    public static getInstance=(app:Express):FollowsController=>{
        if(FollowsController.followsController === null) {
            FollowsController.followsController = new FollowsController();
            app.get("/users/:uid/following", FollowsController.followsController.findAllUsersFollowedByUser);
            app.get("/users/:uid/followedby", FollowsController.followsController.findAllUsersFollowingUser);
            app.post("/users/:uid_cur/follows/:uid", FollowsController.followsController.userFollowsUser);
            app.delete("/users/:uid_cur/unfollows/:uid", FollowsController.followsController.userUnFollowsUser);
        }
        return FollowsController.followsController;
    }

    /**
     * Retrieves all users that are followed by current user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the current user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersFollowedByUser=(req: Request, res: Response)=>
        FollowsController.followsDao.findAllUsersFollowedByUser(req.params.uid)
            .then(following=>res.json(following));

    /**
     * Retrieves all users that are following the current user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the current user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersFollowingUser = (req: Request, res: Response) =>
        FollowsController.followsDao.findAllUsersFollowingUser(req.params.uid)
            .then(followedby=>res.json(followedby));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid_cur and uid representing the current user that is following the user
     * and the uid being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowsController.followsDao.userFollowsUser(req.params.uid_cur,req.params.uid)
            .then(follows=>res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid_cur and uid representing the current user that is unfollowing the user
     * and the uid being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnFollowsUser = (req: Request, res: Response)=>
        FollowsController.followsDao.userUnFollowsUser(req.params.uid_cur,req.params.uid)
            .then(status=>res.send(status));

}
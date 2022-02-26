import FollowsControllerI from "../interfaces/FollowsControllerI";
import FollowsDao from "../daos/FollowsDao";
import {Express, Request, Response} from "express";

export default class FollowsController implements FollowsControllerI{
    private static followsDao:FollowsDao=FollowsDao.getInstance();
    private static followsController:FollowsController|null=null;
    
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
    
    findAllUsersFollowedByUser=(req: Request, res: Response)=>
        FollowsController.followsDao.findAllUsersFollowedByUser(req.params.uid)
            .then(following=>res.json(following));

    findAllUsersFollowingUser = (req: Request, res: Response) =>
        FollowsController.followsDao.findAllUsersFollowingUser(req.params.uid)
            .then(followedby=>res.json(followedby));

    userFollowsUser = (req: Request, res: Response) =>
        FollowsController.followsDao.userFollowsUser(req.params.uid_cur,req.params.uid)
            .then(follows=>res.json(follows));

    userUnFollowsUser = (req: Request, res: Response)=>
        FollowsController.followsDao.userUnFollowsUser(req.params.uid_cur,req.params.uid)
            .then(status=>res.send(status));

}
import {Request, Response} from "express";

export default interface FollowsControllerI{
    findAllUsersFollowedByUser(req:Request,res:Response):void;
    findAllUsersFollowingUser(req: Request, res: Response): void;
    userFollowsUser(req: Request, res: Response): void;
    userUnFollowsUser(req: Request, res: Response): void;
}
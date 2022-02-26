import Follows from "../models/Follows";

export default interface FollowsDaoI {
    findAllUsersFollowedByUser (uid:string): Promise<Follows[]>;
    findAllUsersFollowingUser(uid:string): Promise<Follows[]>;
    userFollowsUser(uid_cur:String,uid:string):Promise<any>;
    userUnFollowsUser(uid_cur:String, uid:string):Promise<Follows>;
}
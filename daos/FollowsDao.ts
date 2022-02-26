import FollowsDaoI from "../interfaces/FollowsDaoI";
import Follows from "../models/Follows";
import FollowsModel from "../mongoose/FollowsModel";

export default class FollowsDao implements FollowsDaoI{
    private static followsDao:FollowsDao|null=null;
    public static getInstance = ():FollowsDao=>{
        if(FollowsDao.followsDao==null){
            FollowsDao.followsDao=new FollowsDao();
        }
        return FollowsDao.followsDao;
    }

    private constructor() {}


    findAllUsersFollowedByUser = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({followedBy:uid})
            .populate("following")
            .exec();

    findAllUsersFollowingUser = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({following:uid})
            .populate("followedBy")
            .exec();

    userFollowsUser = async  (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.create({followedBy:uid_cur,following:uid});

    userUnFollowsUser = async (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.deleteOne({followedBy:uid_cur,following:uid});
}
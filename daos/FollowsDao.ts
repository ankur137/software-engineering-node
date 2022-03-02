/**
 * @file Implements DAO managing data storage of Follows. Uses mongoose FollowsModel
 * to integrate with MongoDB
 */
import FollowsDaoI from "../interfaces/FollowsDaoI";
import Follows from "../models/Follows";
import FollowsModel from "../mongoose/FollowsModel";

/**
 * @class FollowsDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowsDao} followsDao Private single instance of FollowsDao
 */
export default class FollowsDao implements FollowsDaoI{
    private static followsDao:FollowsDao|null=null;
    /**
     * Creates singleton DAO instance
     * @returns FollowsDao
     */
    public static getInstance = ():FollowsDao=>{
        if(FollowsDao.followsDao==null){
            FollowsDao.followsDao=new FollowsDao();
        }
        return FollowsDao.followsDao;
    }

    private constructor() {}

    /**
     * Uses FollowsModel to retrieve all follows documents from follows collection
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllUsersFollowedByUser = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({followedBy:uid})
            .populate("following")
            .exec();

    /**
     * Uses FollowsModel to retrieve all follows documents from follows collection
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllUsersFollowingUser = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({following:uid})
            .populate("followedBy")
            .exec();

    /**
     * Inserts follows instance into the database
     * @param {string} uid_cur Primary key of user following the user
     * @param {string} uid Primary key of user being followed
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsUser = async  (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.create({followedBy:uid_cur,following:uid});

    /**
     * Removes follow from the database.
     * @param {string} uid_cur Primary key of user unfollowing the user
     * @param {string} uid Primary key of user being unfollowed
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnFollowsUser = async (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.deleteOne({followedBy:uid_cur,following:uid});
}
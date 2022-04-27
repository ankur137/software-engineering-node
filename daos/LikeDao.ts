/**
 * @file Implements DAO managing data storage of Likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";
import TuitModel from "../mongoose/TuitModel";
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}
    /**
     * Uses LikeModel to retrieve all like documents from likes collection
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Uses LikeModel to retrieve all like documents from likes collection
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();
    /**
     * Inserts like instance into the database
     * @param {string} uid Primary key of user liking the tuit
     * @param {string} tid Primary key of tuit being liked
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});
    /**
     * Removes like from the database.
     * @param {string} uid Primary key of user unliking the tuit
     * @param {string} tid Primary key of tuit being unliked
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({ tuit: tid, likedBy: uid });

    /**
     * check if there's a likes document in the database for user/tuit combination
     * @param uid user id to search liked tuit on
     * @param tid tuit id to check for
     * @returns boolean representing presence of document
     */
    findUserLikesTuit =
        async (uid: string, tid: string) =>
            LikeModel.findOne(
                { tuit: tid, likedBy: uid });
    /**
     * count how many users liked a tuit
     * @param tid tuit id of the tuit
     * @returns count of users liking the tuit
     */
    countHowManyLikedTuit =
        async (tid: string) =>
            LikeModel.count({ tuit: tid });

    /**
     * insert document into likes collection
     *  to record that user uid likes tuit tid
     * @param uid userid of the user
     * @param tid tuitid of the user
     * @returns created document
     */
    userLikesTuit =
        async (uid: string, tid: string) =>
            LikeModel.create({ tuit: tid, likedBy: uid });

    /**
     * delete document from likes collection
     * to record that user uid no longer
     * likes tuit tid
     * @param uid id of the user
     * @param tid id of the tuit
     * @returns count of documents deleted
     */
    userUnlikesTuit =
        async (uid: string, tid: string) =>
            LikeModel.deleteOne({ tuit: tid, likedBy: uid });

    /**
     * update a tuit's stats
     * @param tid id ot the tuit
     * @param newStats new stats of the tuit
     * @returns
     */
    updateLikes =
    async (tid:string, newStats: object) =>
        TuitModel.updateOne(
        {_id: tid},
        {$set: {stats: newStats}});
}
/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {

    private static dao: TuitDao | null = null;
    /**
     * Returns the instance of TuitDao. If instance is not present the
     * first creates the instance and the returns the same instance.
     * @returns {TuitDao} singleton of Likes DAO
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.dao === null) {
            TuitDao.dao = new TuitDao();
        }
        return TuitDao.dao;
    }
    private constructor() { }

    /**
     * Inserts tuit instance into the database
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return TuitModel.create(tuit);
    }

    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({id:tid});
    }

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find();
    }

    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    async findTuitById(tid: string): Promise<Tuit | null> {
        return TuitModel.findById(tid);
    }

    /**
     * Uses TuitModel to retrieve tuit documents from tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return TuitModel.find({postedBy: uid});
    }

    /**
     * Updates tuit with new values in database
     * @param {string} tis Primary key of tuit to be modified
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});
    }

    async createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }

    async deleteTuitByUser(uid: string): Promise<any> {
        return await TuitModel.deleteMany({postedBy:uid});
    }

    /**
    * Updates likes count with new values in database
    * @param {string} tid Primary key of tuit stas to be modified
    * @param {any} newStats new stats object for the tuit to be updated
    * @returns Promise To be notified when tuit stats is updated in the database
    */
    updateLikes = async (tid: string, newStats: any): Promise<any> =>
        TuitModel.updateOne(
            { _id: tid },
            { $set: { stats: newStats } });
}
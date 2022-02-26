/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI {
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return TuitModel.create(tuit);
    }

    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({id:tid});
    }

    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find();
    }

    async findTuitById(tid: string): Promise<Tuit | null> {
        return TuitModel.findById(tid);
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return TuitModel.find({postedBy: uid});
    }

    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});
    }
}
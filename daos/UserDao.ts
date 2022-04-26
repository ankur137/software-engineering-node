/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {
    private static dao: UserDao | null = null;

    /**
     * Returns the instance of BookmarksDao. If instance is not present the 
     * first creates the instance and the returns the same instance
     * @returns {BookmaUserDaorksDAO} singleton of Bookmarks DAO
     */
     public static getInstance = (): UserDao => {
        if (UserDao.dao === null) {
            UserDao.dao = new UserDao();
        }
        return UserDao.dao;
    }

    /**
     * Uses UserModel to retrieve all user documents from users collection
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }

    /**
     * Uses UserModel to retrieve single user document from users collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    async findUserById(uid: string): Promise<User | null> {
        return UserModel.findById(uid);
    }

    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    async createUser(user: User): Promise<User> {
        return UserModel.create(user);
    }

    /**
     * Removes user from the database.
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    async deleteUser(uid: string):  Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }

    /**
     * Updates user with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid}, {$set: user});
    }

    async deleteUsersByUsername(username: string): Promise<any> {
        return UserModel.deleteMany({username: username});
    }

    /**
     * Returns the first user object having the username provided as the input.
     * @param username username of the user
     * @returns first user having the username provided
     */
    async findUserByUsername(username: string): Promise<any> {
        return UserModel.findOne({username});
    }
}

/**
 * @file Declares Tuit data type representing relationship between
 * users and tuits, as in user posts a tuit
 */import User from "./User";

/**
 * @typedef Tuit Represents likes relationship between a user and a tuit,
 * as in a user posts a tuit
 * @property {string} tuit string tuit being posted
 * @property {User} postedBy User posting the tuit
 * @property {Date} postedOn Date of the tuit
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}

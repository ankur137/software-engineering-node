/**
 * @file Declares Like data type representing relationship between
 * users and messages, as in user sends a message
 */
import User from "./User";

/**
 * @typedef Messages Represents likes relationship between a user and a message,
 * as in a user sends a message
 * @property {string} message string containing the message
 * @property {User} to User receiving the message
 * @property {User} from User sending the message
 * @property {Date} sendOn Date of the message being sent
 */
export default interface Messages{
    message:string,
    to:User,
    from:User,
    sentOn:Date
}
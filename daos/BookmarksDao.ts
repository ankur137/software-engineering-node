/**
 * @file Implements DAO managing data storage of Bookmarks. Uses mongoose BookmarksModel
 * to integrate with MongoDB
 */
import BookmarksDaoI from "../interfaces/BookmarksDaoI";
import BookmarksModel from "../mongoose/BookmarksModel";
import Bookmarks from "../models/Bookmarks";
/**
 * @class BookmarksDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarksDao} bookmarksDao Private single instance of BookmarksDao
 */
export default class BookmarksDao implements BookmarksDaoI{
    private static bookmarksDao: BookmarksDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookmarksDao
     */
    public static getInstance = (): BookmarksDao => {
        if(BookmarksDao.bookmarksDao === null) {
            BookmarksDao.bookmarksDao = new BookmarksDao();
        }
        return BookmarksDao.bookmarksDao;
    }
    private constructor() {}

    /**
     * Uses BookmarksModel to retrieve all bookmarks documents from bookmarks collection
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookmarksOfUser = async (uid: string): Promise<Bookmarks[]> =>
        BookmarksModel.find({bookmarkedBy:uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid Primary key of user bookmarking the tuit
     * @param {string} tid Primary key of tuit being bookmarked
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.create({bookmarkedTuit:tid,bookmarkedBy:uid});

    /**
     * Removes bookmark from the database.
     * @param {string} uid Primary key of user unbookmarking the tuit
     * @param {string} tid Primary key of tuit being unbookmarked
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnBookmarksTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.deleteOne({bookmarkedTuit:tid,bookmarkedBy:uid});
}
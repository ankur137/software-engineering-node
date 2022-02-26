import BookmarksDaoI from "../interfaces/BookmarksDaoI";
import BookmarksModel from "../mongoose/BookmarksModel";
import Bookmarks from "../models/Bookmarks";

export default class BookmarksDao implements BookmarksDaoI{
    private static bookmarksDao: BookmarksDao | null = null;
    public static getInstance = (): BookmarksDao => {
        if(BookmarksDao.bookmarksDao === null) {
            BookmarksDao.bookmarksDao = new BookmarksDao();
        }
        return BookmarksDao.bookmarksDao;
    }
    private constructor() {}

    findAllBookmarksOfUser = async (uid: string): Promise<Bookmarks[]> =>
        BookmarksModel.find({bookmarkedBy:uid})
            .populate("bookmarkedTuit")
            .exec();

    userBookmarksTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.create({bookmarkedTuit:tid,bookmarkedBy:uid});

    userUnBookmarksTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.deleteOne({bookmarkedTuit:tid,bookmarkedBy:uid});
}
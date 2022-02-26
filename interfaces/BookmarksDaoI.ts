import Bookmarks from "../models/Bookmarks";

export default interface BookmarksDaoI{
    findAllBookmarksOfUser(uid:string):Promise<Bookmarks[]>;
    userBookmarksTuit(tid:string,uid:string):Promise<any>;
    userUnBookmarksTuit(tid:string,uid:string):Promise<Bookmarks>;
}
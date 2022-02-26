import BookmarksControllerI from "../interfaces/BookmarksControllerI";
import BookmarksDao from "../daos/BookmarksDao";
import {Express, Request,Response} from "express";

export default class BookmarksController implements BookmarksControllerI{
    private static bookmarksDao:BookmarksDao=BookmarksDao.getInstance();
    private static bookmarksController:BookmarksController|null=null;

    public static getInstance = (app: Express): BookmarksController => {
        if(BookmarksController.bookmarksController === null) {
            BookmarksController.bookmarksController = new BookmarksController();
            app.get("/users/:uid/bookmarks", BookmarksController.bookmarksController.findAllBookmarksOfUser);
            app.post("/users/:uid/bookmarks/:tid", BookmarksController.bookmarksController.userBookmarksTuit);
            app.delete("/users/:uid/unbookmarks/:tid", BookmarksController.bookmarksController.userUnBookmarksTuit);
        }
        return BookmarksController.bookmarksController;
    }

    private constructor() {}
    
    findAllBookmarksOfUser = (req: Request, res: Response)=>
        BookmarksController.bookmarksDao.findAllBookmarksOfUser(req.params.uid)
            .then(bookmarks=>res.json(bookmarks));

    userBookmarksTuit = (req: Request, res: Response)=>
        BookmarksController.bookmarksDao.userBookmarksTuit(req.params.tid,req.params.uid)
            .then(bookmarks=>res.json(bookmarks));

    userUnBookmarksTuit = (req: Request, res: Response)=>
        BookmarksController.bookmarksDao.userUnBookmarksTuit(req.params.tid,req.params.uid)
            .then(status=>res.send(status));
    
}
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import mongoose from "mongoose";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
import LikeController from "./controllers/LikeController";
import FollowsController from "./controllers/FollowsController";
import BookmarksController from "./controllers/BookmarksController";
import MessagesController from "./controllers/MessagesController";


const app = express();
app.use(express.json())


const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const connectionUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.t0mcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(connectionUrl);

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

new UserController(app,new UserDao());
new TuitController(app,new TuitDao());
LikeController.getInstance(app);
FollowsController.getInstance(app);
BookmarksController.getInstance(app);
MessagesController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
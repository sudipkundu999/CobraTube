import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongoDB from "./config/db.connect.js";
import errorHandler from "./middlewares/error-handler.js";
import routeNotFound from "./middlewares/route-not-found.js";
import requiresAuth from "./middlewares/requires-auth.js";
import videosRouter from "./routes/public/videos.router.js";
import categoriesRouter from "./routes/public/categories.route.js";
import authRouter from "./routes/public/auth.router.js";
import likesRouter from "./routes/private/likes.router.js";
import playlistsRouter from "./routes/private/playlists.router.js";
import watchlaterRouter from "./routes/private/watchlater.router.js";
import historyRouter from "./routes/private/history.router.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT || 3000;

connectToMongoDB();

app.get("/", (req, res) => {
  res.send("CobraTube Backend");
});

//PUBLIC ROUTES
app.use("/videos", videosRouter);
app.use("/categories", categoriesRouter);
app.use("/auth", authRouter);

//PRIVATE ROUTES
app.use("/likes", requiresAuth, likesRouter);
app.use("/watchlater", requiresAuth, watchlaterRouter);
app.use("/history", requiresAuth, historyRouter);
app.use("/playlists", requiresAuth, playlistsRouter);

//ERROR HANDLERS
app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`CobraTube backend on port ${port}`);
});

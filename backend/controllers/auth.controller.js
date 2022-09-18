import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Playlist from "../models/playlist.model.js";
import getVideosByID from "../utils/getVideosByID.js";
import populatePlaylists from "../utils/populatePlaylists.js";

export const signupHandler = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    await User.init();
    const newUser = new User({ email, password, firstName, lastName });
    const passwordHash = bcrypt.hashSync(password, 10);
    newUser.password = passwordHash;
    let createdUser = await newUser.save();
    const { _id } = createdUser;
    const newPlaylist = new Playlist({
      title: "My Playlist",
      description: "Default playlist",
      videos: [],
      user_id: _id,
    });
    const createdPlaylist = await newPlaylist.save();
    createdUser = await User.findOneAndUpdate(
      { _id },
      {
        $push: {
          playlists: createdPlaylist._id,
        },
      },
      {
        returnDocument: "after",
      }
    );
    const encodedToken = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ createdUser, encodedToken });
  } catch (error) {
    res.status(422).json({
      message: "Email already exists",
      errorMessage: error.message,
    });
  }
};

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res.status(401).json({ message: "Email not found" });
    } else {
      const { _id } = foundUser;
      if (bcrypt.compareSync(password, foundUser.password)) {
        const encodedToken = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        foundUser.likes = await getVideosByID(foundUser.likes);
        foundUser.history = await getVideosByID(foundUser.history);
        foundUser.watchlater = await getVideosByID(foundUser.watchlater);
        foundUser.playlists = await populatePlaylists(foundUser._id);
        res.status(200).json({ foundUser, encodedToken });
      } else {
        res.status(401).json({ message: "Incorrect Password" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const verifyHandler = async (req, res) => {
  const { encodedToken } = req.body;
  try {
    const decodedToken = jwt.verify(encodedToken, process.env.JWT_SECRET);
    if (decodedToken) {
      const foundUser = await User.findOne({ email: decodedToken.email });
      if (foundUser) {
        foundUser.likes = await getVideosByID(foundUser.likes);
        foundUser.history = await getVideosByID(foundUser.history);
        foundUser.watchlater = await getVideosByID(foundUser.watchlater);
        foundUser.playlists = await populatePlaylists(foundUser._id);
        res.status(200).json({ foundUser });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

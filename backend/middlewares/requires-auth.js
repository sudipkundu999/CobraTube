import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const requiresAuth = async (req, res, next) => {
  try {
    const encodedToken = req.headers.authorization;
    if (encodedToken) {
      try {
        const decodedToken = jwt.verify(encodedToken, process.env.JWT_SECRET);
        if (decodedToken) {
          const foundUser = await User.findOne({ email: decodedToken.email });
          req.user = foundUser;
          next();
        }
      } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
      }
    } else {
      res.status(401).json({ message: "No Token" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export default requiresAuth;

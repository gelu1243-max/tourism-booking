import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user; // ✅ attach user to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
export default authMiddleware;
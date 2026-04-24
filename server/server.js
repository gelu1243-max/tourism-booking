import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/db.js";
import authMiddleware from "./middleware/authMiddleware.js";

// Import models so Sequelize knows about them
import { User } from "./model/user.js";
import  Destination  from "./model/destination.js";
import Booking from "./model/booking.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/tours", tourRoutes);
app.use("/bookings",authMiddleware, bookingRoutes);
app.use("/users", userRoutes); // ✅ clearer path than "/"

sequelize.authenticate()
  .then(async () => {
    console.log("✅ Database connected");

    // Sync all models (creates tables if they don’t exist)
    await sequelize.sync({ alter: true });
    console.log("✅ All tables synced");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err);
  });

import Booking from "../model/booking.js";
import Destination from "../model/destination.js";
import { User } from "../model/user.js";
import authMiddleware from "../middleware/authMiddleware.js";
export const createBooking = async (req, res) => {
    try {
    const newBooking = await Booking.create(req.body);
    
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};
//Get user bookings
export const getBookings = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    // req.user is available thanks to your authMiddleware
    const userId = req.user.id;

    const bookings = await Booking.findAll({
      where: { userId: userId },
      include: [
        {
          model: Destination,
          attributes: [ 'name', 'imageURL', 'price'],
          
        },
      ],
      order: [['createdAt', 'DESC']] 
    });

   
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
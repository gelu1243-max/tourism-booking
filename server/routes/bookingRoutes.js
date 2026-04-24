import express from "express"
import { createBooking,getBookings } from "../controller/bookcontroller.js"
const bookingRoutes=express.Router();
bookingRoutes.post("/",createBooking)
bookingRoutes.get("/dashboard",getBookings)
export default bookingRoutes
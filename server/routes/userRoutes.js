import {register,login} from "../controller/authcontroller.js";
import express from "express"
const userRoutes =express.Router();
userRoutes.post("/register",register)
userRoutes.post("/login",login)
export default userRoutes
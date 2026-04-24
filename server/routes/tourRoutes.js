import express from "express"
import { allDestination,singleDestination,createDestination } from "../controller/descontroller.js"
import Destination from "../model/destination.js"
const tourRoutes=express.Router()
tourRoutes.get("/",allDestination)
tourRoutes.get("/:id",singleDestination)
tourRoutes.post("/destination",createDestination)
export default tourRoutes
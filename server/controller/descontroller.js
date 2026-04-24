// routes/destinations.js
import Destination from "../model/destination.js";


// Get all destinations
export const allDestination=async (req, res) => {
  const destinations = await Destination.findAll();
  res.json(destinations);
};

// Get single destination
export const singleDestination=async (req, res) => {
  const destination = await Destination.findByPk(req.params.id);
  res.json(destination);
};

// Admin add destination
export const createDestination= async (req, res) => {
  const destination = await Destination.create(req.body);
  res.json(destination);
};


import db from "../config/db.js";
import { DataTypes } from "sequelize";
const Destination = db.define("Destination", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false},
  imageURL: {
    type: DataTypes.STRING,
    allowNull: false},});
export default Destination;
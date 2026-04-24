import db from "../config/db.js";
import { DataTypes } from "sequelize";
export const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,},
  username: {
    type: DataTypes.STRING,
    allowNull: false,},
  email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,},
  password: {
        type: DataTypes.STRING,
        allowNull: false,},   
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user", // New signups are always 'user' by default
  },      
});

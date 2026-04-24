import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { User } from "./user.js";
import Destination from "./destination.js";
const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' } 
  },
  destinationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Destinations', key: 'id' }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
User.hasMany(Booking,{ foreignKey: "userId" });
Booking.belongsTo(User,{ foreignKey: "userId" });
Destination.hasMany(Booking,{ foreignKey: "destinationId" }); ;
Booking.belongsTo(Destination,{ foreignKey: "destinationId" } );
export default Booking;
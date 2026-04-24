import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false, // Optional: prevents SQL logs from cluttering your Render console
    dialectOptions: {
        ssl: {
            require: true,               // This is required for Neon
            rejectUnauthorized: false,    // This is required for Render free tier
        }
    }
});

export default sequelize;
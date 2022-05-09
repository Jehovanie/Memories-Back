import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// dotenv.config()

/**
 * After install dotenv
 *  -import dotenv from "dotenv"
 * configure dotenv
 *  -dotenv.config()
 * and 
 *  uncomment the bleow of the connetcion_url
 */


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


/** ==============  CONNECTION TO THE MONGODB =============== */

const CONNECTION_URL = "mongodb://localhost:27017/mernStack"; /// uncomment this to use dotenv
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL) /// change connection_url to process.env.CONNECTION_URL
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log("ERROR : " + error.message));

/** ======================== ROUTES DEFINITIONS ========================== */

import postRoutes from "./routes/posts_routes.js";

app.use("/posts", postRoutes);

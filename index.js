import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


/** ==============  CONNECTION TO THE MONGODB =============== */

const CONNECTION_URL = "mongodb://localhost:27017/mernStack";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log("ERROR : " + error.message));

/** ======================== ROUTES DEFINITIONS ========================== */

app.use("/posts", postRoutes);

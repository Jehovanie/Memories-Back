import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

/**
 *  C'est le point d'entre dans l'application.
 * 
 */

// dotenv.config()

/**
 * After install dotenv
 *  -import dotenv from "dotenv"
 * configure dotenv
 *  -dotenv.config()
 * and
 *  uncomment the bleow of the connetcion_url
 */

///instancier l'application express.
const app = express();

/**
 * bodyParser est un morceau de middleware express , afin de lire les données HTTP POST
 * qui lit l'entrée d'un formulaire et le stocke en tant qu'objet javascript accessible par l'intermediaire de "req.body"
 */

///analyser le text en tant que JSON et expose 'objet résultant sur le  "req.body"
app.use(bodyParser.json({ limit: "30mb", extended: true }));

///analyser le text en tant que donnée codées URL ce qui est la facon dont les navigateurs ont tendances à envoyer les données de formulaires réguliers configurés en POST
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/** standard CORS est utilisé afin de permettre les requêtte multi-origin */
app.use(cors());


/** ==============  CONNECTION TO THE MONGODB =============== */

const CONNECTION_URL = "mongodb://localhost:27017/mernStack"; /// uncomment this to use dotenv
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL) /// change connection_url to process.env.CONNECTION_URL
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log("ERROR : " + error.message));

/** ======================== ROUTES DEFINITIONS ========================== */

import postRoutes from "./routes/posts_routes.js";

/** definir une route : http://localhost:5000/posts */
app.use("/posts", postRoutes);
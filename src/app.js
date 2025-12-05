import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit:"16kb"}));

import noteRoutes from "./routes/noteRoutes.js";
app.use("/api/mynotes", noteRoutes);

export {app}
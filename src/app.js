import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit:"16kb"}));

// All Routes
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/auth.routes.js";
import passRoutes from "./routes/user.routes.js";

app.use("/api/mynotes", noteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", passRoutes)
export {app}
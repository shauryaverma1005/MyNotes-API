import { Router } from "express";
import { createNote, getAllNote, updateNote, deleteNote } from "../controllers/noteController.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

//Create New Notes
router.post("/", auth, createNote);

//Get All Notes
router.get("/", auth, getAllNote);

//Update a note
router.put("/:id", auth, updateNote);

//Delete a note
router.delete("/:id", auth, deleteNote);

export default router;
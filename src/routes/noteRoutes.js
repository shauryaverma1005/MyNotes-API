import { Router } from "express";
import { createNote, getAllNote, updateNote, deleteNote } from "../controllers/noteController.js";

const router = Router();

//Create New Notes
router.post(`/`, createNote);

//Get All Notes
router.get(`/`, getAllNote);

//Update a note
router.update(`/:id`, updateNote);

//Delete a note
router.delete(`/:id`, deleteNote);

export default router;
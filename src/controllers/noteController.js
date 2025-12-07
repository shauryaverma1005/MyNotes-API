import { Note } from "../models/noteModel.js";

// Create new Note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = await Note.create({
            title,
            content,
            user: req.user._id,
        });

        return res.status(201).json({newNote});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

// Get all note
const getAllNote = async (req, res) => {
    try{
        const AllNotes = await Note.find({user: req.user._id});
        return res.json(AllNotes);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
        const noteID = req.params.id;
        const { title, content } = req.body;


        if (!req.user) {
            return res.status(401).json({ message: "Not authorized: no user on request (missing/invalid token)" });
        }

        const note = await Note.findById(noteID);

        if (!note) {
            return res.status(404).json({ message: "Note not found !" });
        }

        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Operation not allowed !" });
        }

        note.title = title ?? note.title;
        note.content = content ?? note.content;

        const updatedNote = await note.save();
        return res.json(updatedNote);
    } catch (error) {
        console.error("updateNote error:", error);
        return res.status(500).json({ message: error.message });
    }
};

// delete a note
const deleteNote = async (req, res) => {
    try{
        const noteID = req.params.id;
        const note = await Note.findById(noteID);

        if(!note){
            return res.status(404).json({message: "Note not found !"})
        }

        if(note.user.toString() !== req.user._id.toString()){
            return res.status(404).json({message: "Operation not allowed !"});
        }

        await note.deleteOne();
        return res.json({message: "Note deleted Successfully !"});
    } catch(error){
        return res.status(500).json({message: error.message});
    }
}

export {createNote, getAllNote, updateNote, deleteNote};
import { Note } from "../models/noteModel.js";

// Create new Note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = await Note.create({
            title,
            content
        });

        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// Get all note
const getAllNote = async (req, res) => {
    try{
        const AllNotes = await Note.find({});
        res.json(AllNotes);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

// Update a note
const updateNote = async (req, res)=> {
    try {
        const noteID = req.params.id;
        const {title, content} = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            noteID,
            {title, content},
            {new: true}
        );

        if(!updatedNote){
            res.status(404).json({message: "Note not found !" });
        }

        res.json(updatedNote);
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

// delete a note
const deleteNote = async (req, res) => {
    try{
        const noteID = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(noteID);

        if(!deleteNote){
            res.status(404).json({message: "Note not found !"});
        }

        res.json({message: "Note deleted Successfully !"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

export {createNote, getAllNote, updateNote, deleteNote};
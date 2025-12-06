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

        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// Get all note
const getAllNote = async (req, res) => {
    try{
        const AllNotes = await Note.find({user: req.user._id});
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

        const note = await User.findById(noteID);

        if(note.user.toString() !== req.user._id.toString()){
            res.status(403).json({message: "Note not found !"});
        }

        note.title = title || note.title;
        note.content = content || note.content;

        const updatedNote = await note.save();
        res.json(updatedNote);

    } catch(error){
        res.status(500).json({message: error.message})
    }
};

// delete a note
const deleteNote = async (req, res) => {
    try{
        const noteID = req.params.id;
        const note = await User.findById(noteID);

        if(note.user.toString() !== req.user._id.toString()){
            res.status(404).json({message: "Note not found !"});
        }

        await note.deleteOne();
        res.json({message: "Note deleted Successfully !"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

export {createNote, getAllNote, updateNote, deleteNote};
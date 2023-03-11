const express = require('express');
const router = express.Router();
// Fetching the middleware function
const fetchdata = require('../middleware/fetchdata')
// importing notes model
const Notes = require('../models/Notes')
// Express Validator to apply checks on fields
const { body, validationResult } = require('express-validator');



// ROUTE 1:

// Get All notes data using GET method: "/api/notes/getdetail/" "Login required"
router.get('/fetchallnotes', fetchdata, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 2:

// Add Notes using POSt method: "/api/notes/addnotes/" "Login required"
router.post('/addnotes', fetchdata, [
    // Title must be atleast 3 char
    body('title', "Must Enter a Title").exists(),
    // description must be at least 3 chars long
    body('description', "Description must be of 3 Words").isLength({ min: 3 })],
    async (req, res) => {
        // To handle error using try catch
        try {
            // Using destructuring
            const { title, description, tag } = req.body

            // If there are errors return Bad request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Creating a new Note:
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            //Save Notes
            const savedNote = await note.save()
            // Sending notes in response
            res.json(savedNote);
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }
    })


// ROUTE 3:

// Updating Notes using PUT method: "/api/notes/updatenote/" "Login required"
router.put('/updatenote/:id', fetchdata,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // Create a New Note Object
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            // Find the note tobe updated and update it:
            let note = await Notes.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") }

            if (note.user.toString() !== req.user.id) {
                return (
                    res.status(401).send("Not Authorized")
                )
            }

            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note });

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }

    })


// ROUTE 4:

// Deleting Notes using DELETE method: "/api/notes/updatenote/" "Login required"
router.delete('/deletenote/:id', fetchdata,
    async (req, res) => {
        try {

            // Find the note tobe updated and update it:
            let note = await Notes.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") }

            if (note.user.toString() !== req.user.id) {
                return (
                    res.status(401).send("Not Authorized")
                )
            }

            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "Sucess": "Note has been deleted", "note": note });

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }

    })

module.exports = router;
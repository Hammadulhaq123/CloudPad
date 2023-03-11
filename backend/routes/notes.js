const express = require('express');
const router = express.Router();
// Fetching the middleware function
const fetchdata = require('../middleware/fetchdata')
// importing notes model
const Notes = require('../models/Notes')
// Express Validator to apply checks on fields
const { body, validationResult } = require('express-validator');



// ROUTE 1:

// Get All notes data using GET method: "/api/auth/getdetail/" "Login required"
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

// Add Notes using POSt method: "/api/auth/getdetail/" "Login required"
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



            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote);
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }
    })


module.exports = router;
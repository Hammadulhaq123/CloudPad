const express = require('express');
const router = express.Router();
const User = require('../models/User')
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');



// Create a user  using POST method: "/api/auth/createuser/" "No Login required"
router.post(
    '/createuser',
    // name must be atleast 3 char
    body('name', "Enter a valid name").isLength({ min: 3 }),
    // email must be an email
    body('email', "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body('password', "Password must be more than 5 characters").isLength({ min: 5 }),
    async (req, res) => {



        // Finds the validation errors in this request and wraps them in an object with handy functions
        // If there are errors return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Checking wheather the user with same email already exist :

            let user = await User.findOne({ email: req.body.email })

            if (user) {
                return res.status(400).json({ error: 'User with this email already exists' })
            }
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })


            // .then(user => res.json(user)).catch(err => {
            //     console.log(err)
            //     res.json({ error: "Email already in use" })
            // })

            res.json(user)

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some Error Occured")
        }


    },
);

module.exports = router;
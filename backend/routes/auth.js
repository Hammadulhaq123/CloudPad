const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
// Adding bcrypt to use hashing;
const bcrypt = require('bcrypt')
// Adding JWT Authentication:
const jwt = require('jsonwebtoken')



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

        const JWT_SECRET = 'Iamasecret1!anddb#$depends&^onme'

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

            // Bcrypt function to generate a salt
            const salt = await bcrypt.genSalt(10);
            // bcrypt function to generate a hash and concatenate salt to it
            const secPass = await bcrypt.hash(req.body.password, salt);


            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })


            // .then(user => res.json(user)).catch(err => {
            //     console.log(err)
            //     res.json({ error: "Email already in use" })
            // })
            const data = {
                user: {
                    id: user.id,
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
            // console.log(jwtData)

            // res.json(user._id)

            // Sending  auth token in response
            res.json({ authtoken })

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some Error Occured")
        }


    },
);

module.exports = router;
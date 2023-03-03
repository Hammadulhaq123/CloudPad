const express = require('express');
const router = express.Router();
const User = require('../models/User')
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

router.post(
    '/',
    // name must be atleast 3 char
    body('name', "Enter a valid name").isLength({ min: 3 }),
    // email must be an email
    body('email', "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body('password', "Password must be more than 5 characters").isLength({ min: 5 }),
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user)).catch(err => {
            console.log(err)
            res.json({ error: "Email already in use" })
        })
    },
);

module.exports = router;
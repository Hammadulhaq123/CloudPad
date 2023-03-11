const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Iamasecret1!anddb#$depends&^onme'


const fetchdata = (req, res, next) => {
    // Get user from jwt token and add id to req object
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send("Please Authenticate using a valid token")
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user
        // Runs the next async function
        next();
    } catch (error) {
        res.status(401).send("Please Authenticate using a valid token")

    }

}

module.exports = fetchdata;
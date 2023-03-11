const main = require("./db");
const express = require('express')
main();


const app = express()
const port = 7000

// Middle Wear. This must've to be used inorder to use req.body in auth.js or any other route
app.use(express.json())


// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
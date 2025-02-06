const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const SignUpModel = require('./models/SignUpData')

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect("mongodb://localhost:27017/Event_Management_Platform")
.then(() => console.log("Database Connected"))
.catch((err) => {
    console.error("Connection Failed", err)
    process.exit(1)
})

app.post('/register', (req, res) => {
    SignUpModel.create(req.body)
    .then(signup => res.json(signup))
    .catch((err) => {
        console.error("Registration failed: ", err)
    })
})

app.listen(3001, () => console.log("Server running on port 3001"));
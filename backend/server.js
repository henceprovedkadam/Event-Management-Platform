const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const SignUpModel = require('./models/SignUpData');
const bcrypt = require('bcrypt');

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
    const {name, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        SignUpModel.create({name, email, password: hash})
        .then(signup => res.json(signup))
        .catch((err) => {
            console.error("Registration failed: ", err)
        })
    }).catch((err) => {
        console.error("This is outside catch: ", err);
    })
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    SignUpModel.findOne({email: email})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, (err, response) => {
                if(response){
                    res.json('Login successfull')
                } else{
                    res.json('Password or username incorrrect')
                }
            })
        } else{
            res.json("No record exist")
        }
    })
})

app.listen(3001, () => console.log("Server running on port 3001"));
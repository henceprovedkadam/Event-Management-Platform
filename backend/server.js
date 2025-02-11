const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const SignUpModel = require('./models/SignUpData');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"], 
    credentials: true
}))

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
    const user = SignUpModel.findOne({email: email})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, (err, response) => {
                if(response){
                    // token creation
                    const token = jwt.sign({username: user.name}, process.env.KEY, {
                        expiresIn: '10000'
                    })
                    res.cookie("token", token, { httpOnly: true})
                    return res.json({status: true, msg: 'Login successfull'})

                } else{
                    res.json('Password or username incorrrect')
                }
            })
        } else{
            res.json("No record exist")
        }
    })
})

const verifyUser = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json({status: false, msg: "no token found"})
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.json(err);
    }
}

app.get('/verify', verifyUser, (req, res) => {
    return res.json({status: true, msg: "authorized", user: req.user})
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({status: true, msg: "logout successful"})
})
app.listen(3001, () => console.log("Server running on port 3001"));
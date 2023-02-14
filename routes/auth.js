const router = require("express").Router();
const { users } = require('../db');
const bcrypt = require('bcrypt');
const JWT = require("jsonwebtoken");

const { check, validationResult } = require('express-validator');

//make the request
router.post('/signup', [
    check("email", "please provide a valid email").isEmail(),

    check("password", "please provide a password which is greater than 5 character").isLength({
        min: 6
    })
], async (req, res) => {
    const { password, email } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        })
    }
    let user = users.find((user) => {
        return user.email === email;
    });
    if (user) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "This user is already exist"
                }
            ]
        })
    }
    let handlePassword = await bcrypt.hash(password, 10);
    users.push({
        email,
        password: handlePassword
    })
    const token = await JWT.sign({
        email
    }, "fg236rgfeigr34uei3", {
        expiresIn: 360000
    })
    res.json({
        token
    })
    res.send("validation pass");
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user = users.find((user) => {
        return user.email === email;
    })
    if (!user) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid Credentials"
                }
            ]
        })
    }

    let isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid Credentials"
                }
            ]
        })
    }
})
router.get('/all', (req, res) => {
    res.json(users);
})





module.exports = router;
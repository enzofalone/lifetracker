const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        //take user email and password to log in into app
        const user = await User.login(req.body);
        return res.status(200).json({
            user
        });
    } catch (err) {
        next(err);
    }
})

router.post('/register', async (req, res, next) => {
    try {
        // get body and send to model 
        const user = await User.register(req.body);

        // return processed data for handling in frontend
        return res.status(201).json({
            user
        });
    } catch (err) {
        next(err);
    }
})

module.exports = router;
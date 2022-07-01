const express = require('express');
const User = require('../models/user');
const router = express.Router();
//token management
const security = require('../middleware/security');
const {createUserJwt} = require('../utils/tokens');




router.post('/login', async (req, res, next) => {
    try {
        //take user email and password to log in into app
        const user = await User.login(req.body);
        //create user token
        const token = createUserJwt(user);

        return res.status(200).json({
            user, token
        });
    } catch (err) {
        next(err);
    }
})

router.post('/register', async (req, res, next) => {
    try {
        // get body and send to model 
        const user = await User.register(req.body);
        //create user token
        const token = createUserJwt(user);
        // return processed data for handling in frontend
        return res.status(201).json({
            user, token
        });
    } catch (err) {
        next(err);
    }
})

router.get('/me', security.requireAuthenticatedUser, async(req, res, next) => {
    try{
        const {email} = res.locals.user;
        const user = await User.fetchUserByEmail(email);
        return res.status(200).json({user})
    }catch(error){
        next(error)
    }
})

module.exports = router;
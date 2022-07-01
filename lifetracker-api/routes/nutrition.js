const express = require('express');
const User = require('../models/user');
const Nutrition = require('../models/nutrition');
const router = express.Router();
//token management
const security = require('../middleware/security');
const {
    createUserJwt
} = require('../utils/tokens');

router.post('/create', security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // get user email to save reference in psql table
        const {
            email
        } = res.locals.user;

        const user = await User.fetchUserByEmail(email);
        console.log(user.email);
        // retrieve new nutrition item data
        const nutritionData = req.body;

        // create entry 
        await Nutrition.create(user.email, nutritionData);

        // fetch again all the nutritions associated with email so the user can be 
        // redirected in the frontend with the new information
        const nutritions = await Nutrition.fetch(email);

        // send new table with nutritions 
        return res.status(201).json({
            nutritions
        })

    } catch (error) {
        next(error)
    }
})

router.get('/', security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //retrieve email
        const {
            email
        } = res.locals.user;
        
        //fetch all nutrition elements associated with email
        const nutritions = await Nutrition.fetch(email);
        //send back
        return res.status(200).json({
            nutritions
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;
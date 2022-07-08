const express = require("express");
const User = require("../models/user");
const Nutrition = require("../models/nutrition");
const router = express.Router();
const security = require("../middleware/security");
const { authedUserIsNutritionOwner } = require("../middleware/permissions");
const { createUserJwt } = require("../utils/tokens");

// request that creates a new entry in the name of the user
router.post(
  "/create",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      // get user email to save reference in psql table
      const { email } = res.locals.user;

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
        nutritions,
      });
    } catch (error) {
      next(error);
    }
  }
);

// get one nutrition item based on param
router.get(
  "/id/:id",
  security.requireAuthenticatedUser,
  authedUserIsNutritionOwner,
  async (req, res, next) => {
    try {
      //retrieve id in params
      const id = req.params.id;
      // fetch the nutrition item by id
      const nutrition = await Nutrition.fetchById(id);
      // return single nutrition item
      return res.status(200).json({
        ...nutrition
      });

    } catch (error) {
      next(error);
    }
  }
);

// main nutrition page retrieves all the nutrition items for user
router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    //retrieve email
    const { email } = res.locals.user;

    //fetch all nutrition elements associated with email
    const nutritions = await Nutrition.fetch(email);
    //send back
    return res.status(200).json({
      nutritions,
    });
  } catch (error) {
    next(error);
  }
});



module.exports = router;

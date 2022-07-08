const security = require("../middleware/security");
const { authedUserIsExerciseOwner } = require("../middleware/permissions");
const Exercise = require("../models/exercise");
const User = require('../models/user')
const express = require("express");
const router = express.Router();

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
      const exerciseData = req.body;

      // create entry
      await Exercise.create(user.email, exerciseData);

      // fetch again all the exercises associated with email so the user can be
      // redirected in the frontend with the new information
      const exercises = await Exercise.fetch(email);

      // send new table with exercises
      return res.status(201).json({
        exercises,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/id/:id",
  security.requireAuthenticatedUser,
  authedUserIsExerciseOwner,
  async (req, res, next) => {
    try {
      //retrieve id in params
      const id = req.params.id;
      // fetch the exercise item by id
      const exercise = await Exercise.fetchById(id);
      // return single exercise item
      return res.status(200).json({
        ...exercise,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    //retrieve email
    const { email } = res.locals.user;

    //fetch all exercise elements associated with email
    const exercises = await Exercise.fetch(email);
    //send back
    return res.status(200).json({
      exercises,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");
const Exercise = require("../models/exercise");
const Nutrition = require("../models/nutrition");
const { ForbiddenError } = require("../utils/errors");

const router = express.Router();

const authedUserIsExerciseOwner = async (req, res, next) => {
  try {
    const { user } = res.locals;
    //retrieve id in params
    const id = req.params.id;
    // fetch the nutrition item by id
    const exercise = await Exercise.fetchById(id);
    // compare if both emails match
    // if not keep following the pipeline
    if (exercise.userEmail !== user.email) {
      throw new ForbiddenError("You are not authorized to see this exercise item!");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const authedUserIsNutritionOwner = async (req, res, next) => {
  try {
    const { user } = res.locals;
    //retrieve id in params
    const id = req.params.id;
    // fetch the nutrition item by id
    const nutrition = await Nutrition.fetchById(id);
    // compare if both emails match
    // if not keep following the pipeline
    if (nutrition.userEmail !== user.email) {
      throw new ForbiddenError("Permission error: You are not authorized to see this nutrition item!");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};



module.exports = {
  authedUserIsNutritionOwner,
  authedUserIsExerciseOwner
};

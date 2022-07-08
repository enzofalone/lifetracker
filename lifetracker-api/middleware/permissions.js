const express = require("express");
const Nutrition = require("../models/nutrition");
const { ForbiddenError } = require("../utils/errors");

const router = express.Router();

const authedUserIsNutritionOwner = async (req, res, next) => {
  try {
    const { user } = res.locals;
    //retrieve id in params
    const id = req.params.id;
    // fetch the nutrition item by id
    const nutrition = await Nutrition.fetchById(id);
    console.log("permissions", nutrition.userEmail, user.email);
    // compare if both emails match
    // if not keep following the pipeline
    if (nutrition.userEmail !== user.email) {
      throw new ForbiddenError("You are not authorized to see this nutrition item!");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  authedUserIsNutritionOwner,
};

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Nutrition {
  // function that fetches all nutrition based on user's email
  static async fetch(email) {
    const result = await db.query(
      `SELECT id, name, category, quantity, calories, image 
            FROM nutrition 
            WHERE user_email=$1
            ORDER BY id DESC`,
      [email]
    );

    return result.rows;
  }

  // function that fetches by Id one nutrition item
  static async fetchById(id) {
    console.log(id);
    const parsedId = Number.parseInt(id);
    // check for invalid param
    if (typeof(parsedId) !== "number" || typeof(parsedId) === NaN)
      throw new BadRequestError("Parameter is not a valid ID");

    const result = await db.query(`SELECT id, name, category, quantity, calories, image 
    FROM nutrition 
    WHERE id=$1`, [id]);
    console.log(result.rows);
    if (result?.rows) {
      return result.rows[0];
    } else {
      throw new NotFoundError("No nutrition items found with provided ID");
    }
  }

  // function that creates new nutritions
  static async create(email, data) {
    // check that all field keys and values exist
    const requiredFields = [
      "name",
      "category",
      "quantity",
      "calories",
      "image",
    ];
    const stringFields = ["name", "category", "image"];
    requiredFields.forEach((field) => {
      if (!data.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field}!`);
      }
    });

    stringFields.forEach((field) => {
      if (data[field].length <= 0) {
        throw new BadRequestError(`Missing ${field}`);
      }
    });

    // field error handling
    if (data.quantity <= 0) {
      throw new BadRequestError(`Quantity can't be 0`);
    }

    if (data.calories <= 0) {
      throw new BadRequestError(`Calories can't be 0`);
    }

    // perform query if all fields are valid
    const result = await db.query(
      `INSERT INTO nutrition (
                name,
                category,
                quantity,
                calories,
                image,
                user_email
            )
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING id, name, category, quantity, calories, image, user_email;`,
      [
        data.name,
        data.category,
        Number(data.quantity),
        Number(data.calories),
        data.image,
        email,
      ]
    );

    return result.rows[0];
  }
}

module.exports = Nutrition;

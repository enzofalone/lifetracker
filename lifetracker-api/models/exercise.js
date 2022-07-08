const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");
class Exercise {
    static async fetch(email) {
        const result = await db.query(
          `SELECT id, name, category, duration, intensity, created_at 
                FROM exercise
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
    
        const result = await db.query(`SELECT id, name, category, duration, intensity, created_at, user_email AS "userEmail" 
        FROM exercise 
        WHERE id=$1`, [id]);
        
        if (result?.rows) {
          return result.rows[0];
        } else {
          throw new NotFoundError("No exercise entries found with provided ID");
        }
      }
    
      // function that creates new nutritions
      static async create(email, data) {
        // check that all field keys and values exist
        const requiredFields = [
          "name",
          "category",
          "intensity",
          "duration",
        ];
        const stringFields = ["name", "category"];

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
        if (data.duration <= 0) {
          throw new BadRequestError(`Duration can't be 0`);
        }
    
        if (data.intensity <= 0) {
          throw new BadRequestError(`Intensity can't be 0`);
        }
    
        // perform query if all fields are valid
        const result = await db.query(
          `INSERT INTO exercise (
                    name,
                    category,
                    intensity,
                    duration,
                    user_email
                )
                VALUES ($1,$2,$3,$4,$5)
                RETURNING id, name, category, intensity, duration, user_email as "userEmail";`,
          [
            data.name,
            data.category,
            Number(data.intensity),
            Number(data.duration),
            email,
          ]
        );
    
        return result.rows[0];
      }
}

module.exports = Exercise
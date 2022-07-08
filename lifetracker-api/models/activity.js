const db = require('../db')

class Activity {
    // fetch a query averaging data
    static async get(email) {
        const queryAvg = `SELECT AVG(calories) AS calories, category FROM nutrition WHERE user_email=$1 GROUP BY category LIMIT 6;`;

        const resultAvg = await db.query(queryAvg,[email]);

        const queryTotal = `
        SELECT SUM(calories) 
               AS calories, 
               TO_CHAR(created_at :: DATE, 'dd/mm/yyyy') AS "createdAt"
        FROM nutrition 
        WHERE user_email=$1  
        GROUP BY "createdAt" 
        LIMIT 6;`;
        
        const resultTotal = await db.query(queryTotal,[email]);

        return {avgCaloriesPerCategory: resultAvg.rows[0] || 0, totalCaloriesPerDay: resultTotal.rows || 0}
    }
}

module.exports = Activity
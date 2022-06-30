require('dotenv').config();
require('colors');

//select default port in .env or use 3001 (development port)
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

//get secret key in .env
const SECRET_KEY = process.env.SECRET_KEY;

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || 'postgres'
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : 'postgres';
    const dbHost = process.env.DATABASE_HOST || 'localhost';
    const dbPort = process.env.DATABASE_PORT || 5433;
    const dbName = process.env.DATABASE_NAME || 'lifetracker'

    // if the DATABASE_URL environment variable, use that,
    // otherwise create the db connection string ourselves
    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}
// set work factor for hashing
const BCRYPT_WORK_FACTOR = 10;

console.log("App Config".red)
console.log("PORT:".blue, PORT)
console.log("SECRET_KEY:".blue, SECRET_KEY);
console.log("Database URI:".blue, getDatabaseUri())
console.log("---")

module.exports = {
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
    SECRET_KEY
}
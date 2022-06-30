const {
    BadRequestError,
    UnauthorizedError
} = require('../utils/errors');
const db = require('../db');
const bcrypt = require('bcrypt');
const {BCRYPT_WORK_FACTOR} = require('../config');

class User {
    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
        }
    }

    static async login(credentials) {
        const requiredFields = ['email', 'password'];
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field}!`)
            }
        })
        const user = await User.fetchUserByEmail(credentials.email);

        if(user) {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if(isValid) {
                return this.makePublicUser(user);
            }
        }

        throw new UnauthorizedError("Invalid email/password combo");
    }

    static async register(credentials) {
        const requiredFields = ['email', 'password', 'firstName', 'lastName'];
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field}!`)
            }
        })

        if(credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Email is not valid:", credentials.email);
        }

        // duplicate error handling
        const existingUser = await User.fetchUserByEmail(credentials.email);

        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }

        // hash user password before sending to db
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);
        
        // lowercase email
        const lowercasedEmail = credentials.email.toLowerCase();

        //create a new user in the db to save all their info
        const result = await db.query(
            `INSERT INTO users (
                email,
                password,
                first_name,
                last_name
            )
            VALUES ($1,$2,$3,$4)
            RETURNING id, email, first_name, last_name;`,
            [lowercasedEmail, hashedPassword, credentials.firstName, credentials.lastName]);

        // get only result
        const user = result.rows[0];
        // return to be sent to frontend
        return this.makePublicUser(user);
    }

    static async fetchUserByEmail(email) {
        if (!email) throw new BadRequestError("Missing email: fetchUserByEmail");

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()]);

        const user = result.rows[0];
        return user
    }
}

module.exports = User
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { NotFoundError } = require('./utils/errors');
const { PORT } = require('./config');
const authRoutes = require('./routes/auth');
const security = require('./middleware/security');

const app = express()

// enable cross-origin resources
app.use(cors());

// parse to json
app.use(express.json());

//log request info
app.use(morgan('tiny'));

// set up routes for auth/app functionality
app.use('/auth', authRoutes);

//check if a token exists in the auth header, if it does, attach the decoded user to res.locals
app.use(security.extractUserFromJwt);

// generic error handling (404)
app.use((req, res, next) => {
    return next(new NotFoundError());
})

// generic error handling
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: { message, status }
    })
})

// init server at PORT
app.listen(PORT, () => {
    console.log(`😊Server running on http://localhost:${PORT}`);
})
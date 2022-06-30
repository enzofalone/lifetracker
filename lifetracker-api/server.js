const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { NotFoundError } = require('./utils/errors');
const { PORT } = require('./config');
const authRoutes = require('./routes/auth');


const app = express()

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// set up routes for auth/app functionality
app.use('/auth', authRoutes);

// generic error handling (404)
app.use((req, res, next) => {
    return next(new NotFoundError());
})

// error handling
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
// Importing necessary modules and packages
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import helmet from 'helmet';
import hpp from 'hpp';
import multer from 'multer';
import xss from 'xss';

// Importing configuration and middleware
import corsOptions from './configs/corsConfigs.js';
import sessionConfigs from './configs/sessionConfigs.js';
import { ErrorHandler, errorMiddleware } from './middlewares/errorHandler.js';
import logger from './middlewares/logger.js';

// Importing routes
import routes from './routes/routes.js';

//--------------------------------------------------
// Application setup
//--------------------------------------------------

// Initialize Express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Set Express to trust the first proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Configure rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3000,
});
app.use(limiter);

// CORS middleware
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '2mb' }));
app.use(
    express.urlencoded({
        limit: '100mb',
        extended: true,
    })
);

// xss Middleware to sanitize incoming request data to protect against XSS attacks
app.use((req, _res, next) => {
    const sanitize = (obj) => {
        const result = {};
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = sanitize(obj[key]); // Recursively sanitize objects
            } else if (typeof obj[key] === 'string') {
                result[key] = xss(obj[key]); // Sanitize strings
            } else {
                result[key] = obj[key]; // Copy other types as is
            }
        });
        return result;
    };

    // Apply the sanitize function and reassign sanitized objects to req properties
    if (req.body) req.body = sanitize(req.body);
    if (req.query) req.query = sanitize(req.query);
    if (req.params) req.params = sanitize(req.params);

    next();
});

// Cookie and session middleware
app.use(cookieParser());
app.use(session(sessionConfigs));

// Security middleware against NoSQL injections and HTTP Parameter Pollution
app.use(ExpressMongoSanitize());
app.use(hpp());

// File upload middleware
app.use(multer().any());

// Custom logger middleware
app.use(logger);

// Application routes/endpoints
app.use(routes);

//--------------------------------------------------
// Handle errors
//--------------------------------------------------

// Middleware to handle routes not found
app.all('*', (req, _res, next) => {
    const err = new ErrorHandler(
        'Resources not found on this server!',
        404,
        `This ${req.originalUrl} might be due to missing data or an incorrect URL.`
    );
    next(err);
});

// Global error handling middleware
app.use(errorMiddleware);

export default app;

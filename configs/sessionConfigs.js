import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import { mongoDB } from './dbConnection.js';

// Load environment variables from .env file
dotenv.config();

const sessionConfigs = {
    secret: process.env.SESSION_SECRET || 'your_random_session_secret_here',
    resave: true,
    saveUninitialized: true,

    store: MongoStore.create({
        mongoUrl: mongoDB,
        collectionName: 'sessions',
    }),
    cookie: {
        maxAge: 2419200000,
        // production only
        // secure: true, // Uncomment for production over HTTPS
        // sameSite: 'none', // Uncomment for production when allowing cross-site cookie usage
    },
};

export default sessionConfigs;

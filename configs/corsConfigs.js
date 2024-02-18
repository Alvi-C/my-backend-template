import dotenv from 'dotenv';

dotenv.config();

// Define whitelist of allowed origins for CORS
const whitelist = [
    'https://www.yoursite.com',
    'http://localhost:5173',
    process.env.FRONTEND_URL, // FRONTEND_URL is defined in .env file
].filter(Boolean); // This removes any falsy values from the array

// Set up CORS options
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            // If origin is in whitelist or it's not provided, allow the request
            callback(null, true);
        } else {
            // If origin is not in whitelist, reject the request
            callback(
                new Error(
                    'The CORS policy for this site does not allow access from the specified Origin. Please contact the site administrator.'
                )
            );
        }
    },
    methods: 'GET,POST,PUT,PATCH,DELETE', // Add allowed methods. customize it according to your requirements
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200, // Set success status code for OPTIONS requests
};

export default corsOptions;

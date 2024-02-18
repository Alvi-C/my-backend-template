export class ErrorHandler extends Error {
    constructor(message, statusCode, details = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // To identify operational errors
        this.details = details; // Additional details about the error
        Error.captureStackTrace(this, this.constructor);
    }
}

// Define a function for logging errors with my preferred style
const logError = (err) => {
    // Start of error block
    console.log('🌼------------------- Error Details -------------------🌼');

    // Common error details
    console.log(`🔥 Name: ${err.name}`);
    console.log(`🔥 Message: ${err.message}`);

    // Distinguishing between operational and programming errors
    if (err.isOperational) {
        console.log(`🔥🔥🔥 Type: Operational Error`);
        console.log(`🔥🔥🔥 Details: ${err.details || 'No additional details provided.'}`);
        console.log(
            `🔥🔥🔥 Suggestion: ${err.suggestion || 'Follow standard operational error handling procedures.'}`
        );
    } else {
        console.log(`🔥🔥🔥 Type: Programming Error`);
        // Extracting and logging the first line of the stack trace for file and line information
        const [errorOrigin] = err.stack.match(/at .*(\n|$)/);
        console.log(`🔥🔥🔥 Origin: ${errorOrigin.trim()}`);
        console.log(`🔥🔥🔥 Action: Please investigate and fix the underlying code issue.`);
    }

    // Always log the full stack for in-depth analysis; consider this for development mode only
    console.log('🌼------------------- Stack Trace ---------------------🌼');
    console.log(err.stack);

    // End of error block
    console.log('🌼------------------ Error Details End ----------------🌼');
};

export const errorMiddleware = (err, req, res, _next) => {
    // Use the logError function to log the error
    logError(err);

    // Clone the error object to avoid mutating the original error
    const error = { ...err };
    error.statusCode = err.statusCode || 500;
    error.message = err.message || 'Internal Server Error';

    // Respond with the error
    return res.status(error.statusCode).json({
        status: error.statusCode,
        success: false,
        message: error.message,
    });
};

const logger = (req, _res, next) => {
    console.log(
        `
🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴🌴
Req-method: ${req.method} - Req-url: ${req.url} - Req-path: ${req.headers.origin || 'server origin'}
            - Time-of-req: ${new Date().toLocaleTimeString().underline}
🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
`.bgWhite.green
    );
    next();
};

export default logger;

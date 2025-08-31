import rateLimit from 'express-rate-limit'

export const rateLimitMiddleware = rateLimit({
    windowMs: 5 * 60 * 1000, // 10 minutes
    max: 500,
    standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


export const customRateLimit = (config) => { return rateLimit(config); };
import { ENV } from '../config/env.js';

/**
 * Global error handling middleware
 * Must be registered after all other routes and middleware
 */
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });

    // Unique constraint violation
    if (err.code === '23505') {
        return res.status(409).json({
            success: false,
            error: 'This favorite already exists',
        });
    }

    // Foreign key constraint violation
    if (err.code === '23503') {
        return res.status(400).json({
            success: false,
            error: 'Invalid reference',
        });
    }

    // Database connection error
    if (err.code === 'ECONNREFUSED' || err.code === 'PROTOCOL_ERROR') {
        return res.status(503).json({
            success: false,
            error: 'Database service temporarily unavailable',
        });
    }

    // Default error response
    const statusCode = err.statusCode || 500;
    const message = ENV.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message;

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(ENV.NODE_ENV !== 'production' && { stack: err.stack }),
    });
};

/**
 * Middleware to catch 404 errors
 */
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
    });
};

/**
 * Async error wrapper for route handlers
 * Usage: router.post('/', asyncHandler(controller))
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

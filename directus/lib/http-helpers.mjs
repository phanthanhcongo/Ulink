import { AppError } from './errors.mjs';

/**
 * Read the request body from either Express-parsed `req.body`
 * or Directus's legacy `req.payload`.
 */
export function readBody(req) {
  return req.body ?? req.payload ?? {};
}

/**
 * Send a structured JSON error response.
 *
 * Accepts either an AppError instance or (status, code, message) args.
 *
 * Response shape:
 *   { error: <code>, message: <string>, details?: <any> }
 */
export function sendError(res, errorOrStatus, code, message, details) {
  if (errorOrStatus instanceof AppError) {
    const err = errorOrStatus;
    res.status(err.status);
    const body = { error: err.code, message: err.message };
    if (err.details) body.details = err.details;
    return res.json(body);
  }

  // Legacy call signature: sendError(res, 422, 'INVALID', 'Bad input')
  res.status(errorOrStatus);
  const body = { error: code, message };
  if (details) body.details = details;
  return res.json(body);
}

/**
 * Express-style error handler for custom endpoints.
 *
 * Wrap each route handler so unhandled throws automatically
 * produce a well-formatted JSON error.
 */
export function catchRoute(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      const status = err.status ?? err.statusCode ?? 500;
      const code = err.code ?? 'INTERNAL_ERROR';
      const message = err.message ?? 'An unexpected error occurred.';
      
      if (status >= 500) {
        console.error(`[${req.route?.path ?? req.path}]`, err);
      }
      
      return sendError(res, status, code, message);
    }
  };
}

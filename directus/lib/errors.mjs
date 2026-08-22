/**
 * Application-level error base class.
 *
 * Every custom endpoint and hook that needs to throw a typed
 * error should use AppError (or a subclass) so the response
 * shape is consistent and the HTTP adapter can format it once.
 *
 * Shape:
 *   { status, code, message, details? }
 *
 * `code` is a machine-readable UPPER_SNAKE string that the
 * frontend can switch on for i18n. `message` is human-readable
 * and used as a fallback.
 */
export class AppError extends Error {
  constructor(status, code, message, details = undefined) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.statusCode = status;          // compat — some Directus internals read this
    this.code = code;
    this.details = details;
  }
}

/** 400 Bad Request */
export class BadRequestError extends AppError {
  constructor(code, message, details) {
    super(400, code, message, details);
    this.name = 'BadRequestError';
  }
}

/** 401 Unauthorized */
export class UnauthorizedError extends AppError {
  constructor(code = 'UNAUTHORIZED', message = 'Authentication required.') {
    super(401, code, message);
    this.name = 'UnauthorizedError';
  }
}

/** 403 Forbidden */
export class ForbiddenError extends AppError {
  constructor(message = 'Not allowed.') {
    super(403, 'FORBIDDEN', message);
    this.name = 'ForbiddenError';
  }
}

/** 409 Conflict */
export class ConflictError extends AppError {
  constructor(message) {
    super(409, 'CONFLICT', message);
    this.name = 'ConflictError';
  }
}

/** 422 Validation Error */
export class ValidationError extends AppError {
  constructor(code, message, details) {
    super(422, code, message, details);
    this.name = 'ValidationError';
  }
}

/** 429 Rate Limited */
export class RateLimitedError extends AppError {
  constructor(message = 'Too many requests. Please try again later.') {
    super(429, 'RATE_LIMITED', message);
    this.name = 'RateLimitedError';
  }
}

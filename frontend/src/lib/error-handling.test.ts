import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

// Error response schema
const errorResponseSchema = z.object({
  error: z.object({
    code: z.string().min(1),
    message: z.string().min(1),
    status: z.number().int().positive(),
    details: z.record(z.any()).optional(),
    timestamp: z.string().datetime('invalid_date').optional()
  })
});

// Validation error schema
const validationErrorSchema = z.object({
  error: z.object({
    code: z.literal('VALIDATION_ERROR'),
    message: z.string(),
    status: z.literal(400),
    details: z.object({
      fields: z.array(z.object({
        field: z.string(),
        message: z.string(),
        value: z.any().optional()
      }))
    })
  })
});

// Not found error schema
const notFoundErrorSchema = z.object({
  error: z.object({
    code: z.literal('NOT_FOUND'),
    message: z.string(),
    status: z.literal(404),
    details: z.object({
      resource_type: z.string(),
      resource_id: z.string()
    }).optional()
  })
});

// Unauthorized error schema
const unauthorizedErrorSchema = z.object({
  error: z.object({
    code: z.literal('UNAUTHORIZED'),
    message: z.string(),
    status: z.literal(401),
    details: z.object({
      reason: z.string().optional()
    }).optional()
  })
});

// Rate limit error schema
const rateLimitErrorSchema = z.object({
  error: z.object({
    code: z.literal('RATE_LIMIT_EXCEEDED'),
    message: z.string(),
    status: z.literal(429),
    details: z.object({
      limit: z.number().positive(),
      current: z.number().nonnegative(),
      reset_at: z.string().datetime('invalid_date')
    })
  })
});

test('error - generic validation error', () => {
  const result = errorResponseSchema.safeParse({
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Invalid input provided',
      status: 400
    }
  });

  assert.equal(result.success, true);
});

test('error - validation error with field details', () => {
  const result = validationErrorSchema.safeParse({
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      status: 400,
      details: {
        fields: [
          { field: 'email', message: 'Invalid email format' },
          { field: 'password', message: 'Password too short' }
        ]
      }
    }
  });

  assert.equal(result.success, true);
});

test('error - not found error', () => {
  const result = notFoundErrorSchema.safeParse({
    error: {
      code: 'NOT_FOUND',
      message: 'Resource not found',
      status: 404,
      details: {
        resource_type: 'product',
        resource_id: 'prod-999'
      }
    }
  });

  assert.equal(result.success, true);
});

test('error - unauthorized error', () => {
  const result = unauthorizedErrorSchema.safeParse({
    error: {
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
      status: 401
    }
  });

  assert.equal(result.success, true);
});

test('error - unauthorized with reason', () => {
  const result = unauthorizedErrorSchema.safeParse({
    error: {
      code: 'UNAUTHORIZED',
      message: 'Invalid credentials',
      status: 401,
      details: {
        reason: 'Invalid password'
      }
    }
  });

  assert.equal(result.success, true);
});

test('error - rate limit error', () => {
  const result = rateLimitErrorSchema.safeParse({
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests',
      status: 429,
      details: {
        limit: 100,
        current: 105,
        reset_at: '2024-06-01T10:05:00Z'
      }
    }
  });

  assert.equal(result.success, true);
});

test('error - requires error code', () => {
  const result = errorResponseSchema.safeParse({
    error: {
      code: '',
      message: 'Error message',
      status: 500
    }
  });

  assert.equal(result.success, false);
});

test('error - requires error message', () => {
  const result = errorResponseSchema.safeParse({
    error: {
      code: 'INTERNAL_ERROR',
      message: '',
      status: 500
    }
  });

  assert.equal(result.success, false);
});

test('error - requires positive status code', () => {
  const result = errorResponseSchema.safeParse({
    error: {
      code: 'ERROR',
      message: 'Error',
      status: -1
    }
  });

  assert.equal(result.success, false);
});

test('error - with timestamp', () => {
  const result = errorResponseSchema.safeParse({
    error: {
      code: 'DATABASE_ERROR',
      message: 'Database connection failed',
      status: 500,
      timestamp: '2024-06-01T10:00:00Z'
    }
  });

  assert.equal(result.success, true);
});

test('error - with additional context', () => {
  const result = errorResponseSchema.safeParse({
    error: {
      code: 'OPERATION_FAILED',
      message: 'Operation could not be completed',
      status: 400,
      details: {
        reason: 'Insufficient inventory',
        requested: 100,
        available: 50
      }
    }
  });

  assert.equal(result.success, true);
});

test('error - permission denied error', () => {
  const result = errorResponseSchema.safeParse({
    error: {
      code: 'PERMISSION_DENIED',
      message: 'You do not have permission to perform this action',
      status: 403,
      details: {
        required_role: 'admin',
        current_role: 'member'
      }
    }
  });

  assert.equal(result.success, true);
});

test('error - conflict error', () => {
  const result = errorResponseSchema.safeParse({
    error: {
      code: 'CONFLICT',
      message: 'Resource already exists',
      status: 409,
      details: {
        field: 'email',
        value: 'user@example.com'
      }
    }
  });

  assert.equal(result.success, true);
});

test('error - internal server error', () => {
  const result = errorResponseSchema.safeParse({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      status: 500,
      timestamp: '2024-06-01T10:00:00Z'
    }
  });

  assert.equal(result.success, true);
});

test('error - service unavailable', () => {
  const result = errorResponseSchema.safeParse({
    error: {
      code: 'SERVICE_UNAVAILABLE',
      message: 'Service temporarily unavailable',
      status: 503,
      details: {
        service: 'payment_gateway',
        retry_after: 60
      }
    }
  });

  assert.equal(result.success, true);
});

test('error - multiple validation field errors', () => {
  const result = validationErrorSchema.safeParse({
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Multiple validation errors',
      status: 400,
      details: {
        fields: [
          { field: 'first_name', message: 'Required' },
          { field: 'last_name', message: 'Required' },
          { field: 'email', message: 'Invalid format' },
          { field: 'phone', message: 'Invalid format' }
        ]
      }
    }
  });

  assert.equal(result.success, true);
});

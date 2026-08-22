import { issueOtp, verifyOtp } from './service.js';
import { readBody, sendError, catchRoute } from '../../../lib/http-helpers.mjs';
import { validateEmail, validateOtpCode } from '../../../lib/validation.mjs';
import { ValidationError } from '../../../lib/errors.mjs';

const ALLOWED_PURPOSES = new Set(['register', 'login-2fa']);

export default {
  id: 'otp',
  handler(router, context) {
    router.post('/issue', catchRoute(async (req, res) => {
      const body = readBody(req);
      const { purpose } = body;
      const email = validateEmail(body.email);

      if (!purpose || !ALLOWED_PURPOSES.has(purpose)) {
        throw new ValidationError('INVALID_PURPOSE', 'OTP purpose is missing or unsupported.');
      }

      const result = await issueOtp({ ...context, schema: req.schema }, {
        email,
        purpose
      });
      return res.status(200).json({
        data: {
          sent: true,
          expires_in_seconds: result.expires_in_seconds,
          // Returned only in non-production to support local QA. Directus hides
          // debug code in production unless ALLOW_DEBUG_OTP=true.
          ...(result.debug_code ? { debug_code: result.debug_code } : {})
        }
      });
    }));

    router.post('/verify', catchRoute(async (req, res) => {
      const body = readBody(req);
      const { purpose } = body;
      const email = validateEmail(body.email);
      const code = validateOtpCode(body.code);

      if (!purpose || !ALLOWED_PURPOSES.has(purpose)) {
        throw new ValidationError('INVALID_PURPOSE', 'OTP purpose is missing or unsupported.');
      }

      const result = await verifyOtp({ ...context, schema: req.schema }, {
        email,
        code,
        purpose
      });
      return res.status(200).json({ data: { verified: true, ...(result.verified_token ? { verified_token: result.verified_token } : {}) } });
    }));
  }
};

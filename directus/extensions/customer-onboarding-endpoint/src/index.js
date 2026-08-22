import { createCustomerAccount } from './service.js';
import { readBody, sendError, catchRoute } from '../../../lib/http-helpers.mjs';

export default {
  id: 'customer-onboarding',
  handler(router, context) {
    router.post('/register', catchRoute(async (req, res) => {
      const body = readBody(req);

      const result = await createCustomerAccount(
        {
          ...context,
          schema: req.schema
        },
        body
      );
      return res.status(201).json({ data: result });
    }));
  }
};

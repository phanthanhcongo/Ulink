import { ADMIN_ROLE_ID, SALES_ROLE_ID } from '../../../lib/constants.mjs';
import { runCommercialImport } from './service.js';
import { readBody, catchRoute } from '../../../lib/http-helpers.mjs';
import { ForbiddenError, BadRequestError } from '../../../lib/errors.mjs';

const ALLOWED_ROLES = new Set([ADMIN_ROLE_ID, SALES_ROLE_ID]);

export default {
  id: 'commercial-import',
  handler(router, context) {
    router.post('/preview', catchRoute(async (req, res) => {
      const accountability = req.accountability ?? {};
      if (!accountability.user || !ALLOWED_ROLES.has(accountability.role)) {
        throw new ForbiddenError('Not allowed to run commercial imports.');
      }

      const body = readBody(req);
      try {
        const result = await runCommercialImport(context, {
          mode: 'preview',
          collection: body.collection,
          csvText: body.csvText,
          allowPartial: body.allowPartial === true
        });

        return res.json({ data: result });
      } catch (error) {
        throw new BadRequestError('IMPORT_PREVIEW_FAILED', error.message || 'Commercial import preview failed.');
      }
    }));

    router.post('/commit', catchRoute(async (req, res) => {
      const accountability = req.accountability ?? {};
      if (!accountability.user || !ALLOWED_ROLES.has(accountability.role)) {
        throw new ForbiddenError('Not allowed to run commercial imports.');
      }

      const body = readBody(req);
      try {
        const result = await runCommercialImport(context, {
          mode: 'commit',
          collection: body.collection,
          csvText: body.csvText,
          allowPartial: body.allowPartial === true
        });

        return res.json({ data: result });
      } catch (error) {
        throw new BadRequestError('IMPORT_COMMIT_FAILED', error.message || 'Commercial import commit failed.');
      }
    }));
  }
};

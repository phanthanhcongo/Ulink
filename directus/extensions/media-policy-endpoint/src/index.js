import { ADMIN_ROLE_ID, EDITOR_ROLE_ID, SALES_ROLE_ID } from '../../../lib/constants.mjs';
import { hardDeleteFile, softDeleteFile } from '../../media-policy-hook/src/service.js';
import { readBody, catchRoute } from '../../../lib/http-helpers.mjs';
import { ForbiddenError, BadRequestError, AppError } from '../../../lib/errors.mjs';

const SOFT_DELETE_ROLES = new Set([ADMIN_ROLE_ID, EDITOR_ROLE_ID, SALES_ROLE_ID]);

export default {
  id: 'media-policy',
  handler(router, context) {
    router.post('/soft-delete', catchRoute(async (req, res) => {
      const accountability = req.accountability ?? {};
      if (!accountability.user || !SOFT_DELETE_ROLES.has(accountability.role)) {
        throw new ForbiddenError('Not allowed to soft delete files.');
      }

      const body = readBody(req);
      const fileId = body.fileId ?? body.id;
      const reason = body.reason ?? null;
      const source = body.source ?? 'media-policy-endpoint';

      if (!fileId) {
        throw new BadRequestError('MISSING_FIELDS', 'fileId is required.');
      }

      try {
        const schema = await context.getSchema?.();
        const result = await softDeleteFile(
          {
            ...context,
            schema,
            accountability
          },
          {
            fileId,
            actorId: accountability.user,
            reason,
            source
          }
        );

        return res.json({ data: result });
      } catch (error) {
        throw new AppError(500, 'INTERNAL_ERROR', error.message);
      }
    }));

    router.post('/hard-delete', catchRoute(async (req, res) => {
      const accountability = req.accountability ?? {};
      if (!accountability.user || (!accountability.admin && accountability.role !== ADMIN_ROLE_ID)) {
        throw new ForbiddenError('Only admin can hard delete files manually.');
      }

      const body = readBody(req);
      const fileId = body.fileId ?? body.id;
      const reason = body.reason ?? null;
      const source = body.source ?? 'media-policy-endpoint';
      const confirmHardDelete = body.confirmHardDelete === true;
      const confirmFileId = body.confirmFileId ?? null;

      if (!fileId) {
        throw new BadRequestError('MISSING_FIELDS', 'fileId is required.');
      }

      if (!confirmHardDelete || confirmFileId !== fileId) {
        throw new BadRequestError('INVALID_CONFIRMATION', 'Manual hard delete requires confirmHardDelete=true and confirmFileId to match fileId.');
      }

      try {
        const schema = await context.getSchema?.();
        const result = await hardDeleteFile(
          {
            ...context,
            schema,
            accountability
          },
          {
            fileId,
            actorId: accountability.user,
            reason,
            source
          }
        );

        return res.json({ data: result });
      } catch (error) {
        throw new AppError(500, 'INTERNAL_ERROR', error.message);
      }
    }));
  }
};

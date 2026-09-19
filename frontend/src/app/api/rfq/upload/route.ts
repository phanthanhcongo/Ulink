import { NextResponse } from 'next/server';

import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { getCurrentUser, getRequestCookieHeader } from '@/lib/auth-helpers';

const DIRECTUS_URL = getDirectusUrl();

/**
 * Get an admin access token by logging in with admin credentials.
 * Falls back to DIRECTUS_TOKEN env if admin login fails.
 */
async function getAdminToken(): Promise<string> {
  // Try admin login first (has full permissions including file upload)
  const email = process.env.DIRECTUS_ADMIN_EMAIL;
  const password = process.env.DIRECTUS_ADMIN_PASSWORD;

  if (email && password) {
    try {
      const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data?.access_token) {
          return json.data.access_token;
        }
      }
    } catch {
      // Fall through to DIRECTUS_TOKEN
    }
  }

  // Fallback to static token
  return process.env.DIRECTUS_TOKEN || '';
}

/**
 * POST /api/rfq/upload
 * Uploads attached files to Directus and links them to an RFQ.
 *
 * Expects: multipart/form-data with:
 *   - rfq_id: string (the RFQ record ID)
 *   - files: File[] (one or more files)
 */
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'unauthorized', message: 'Authentication required.' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const rfqId = formData.get('rfq_id') as string;
    const files = formData.getAll('files') as File[];

    if (!rfqId) {
      return NextResponse.json(
        { error: 'bad_request', message: 'rfq_id is required.' },
        { status: 400 }
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'bad_request', message: 'No files provided.' },
        { status: 400 }
      );
    }

    // Get admin token with full permissions
    const token = await getAdminToken();

    // Upload each file to Directus /files
    const uploadedFileIds: string[] = [];
    const uploadedFileNames: string[] = [];

    for (const file of files) {
      const uploadForm = new FormData();
      uploadForm.append('file', file);
      uploadForm.append('title', `RFQ-${rfqId}_${file.name}`);

      const uploadRes = await fetch(`${DIRECTUS_URL}/files`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: uploadForm
      });

      if (uploadRes.ok) {
        const result = await uploadRes.json();
        if (result.data?.id) {
          uploadedFileIds.push(result.data.id);
          uploadedFileNames.push(file.name);
        }
      } else {
        const errText = await uploadRes.text();
        console.error('Directus file upload failed:', uploadRes.status, errText);
      }
    }

    // Update the RFQ record with attachment info
    if (uploadedFileIds.length > 0) {
      try {
        const attachments = uploadedFileIds.map((id, i) => ({
          directus_files_id: id,
          filename: uploadedFileNames[i]
        }));

        const updateRes = await fetch(`${DIRECTUS_URL}/items/rfq_requests/${rfqId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ attachments })
        });

        if (!updateRes.ok) {
          console.error('Failed to update RFQ with attachments:', updateRes.status, await updateRes.text());
        }
      } catch (updateErr) {
        console.error('Failed to update RFQ with attachments:', updateErr);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        uploaded: uploadedFileIds.length,
        file_ids: uploadedFileIds,
        file_names: uploadedFileNames
      }
    });
  } catch (err) {
    console.error('RFQ upload handler failed:', err);
    return NextResponse.json(
      { error: 'internal_server_error', message: 'File upload failed.' },
      { status: 500 }
    );
  }
}

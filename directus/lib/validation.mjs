import { VERIFIED_TOKEN_PREFIX } from './constants.mjs';
import { ValidationError } from './errors.mjs';

// ── Regex Patterns ──────────────────────────────────────────────
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export const OTP_CODE_RE = /^\d{6}$/;

// ── Normalizers ─────────────────────────────────────────────────

export function normalizeEmail(value) {
  return String(value ?? '').trim().toLowerCase();
}

export function normalizeString(value) {
  return String(value ?? '').trim();
}

// ── Validators (throw on failure) ───────────────────────────────

export function validateEmail(value) {
  const email = normalizeEmail(value);
  if (!email) {
    throw new ValidationError('INVALID_EMAIL', 'Email is required.');
  }
  if (!EMAIL_RE.test(email)) {
    throw new ValidationError('INVALID_EMAIL', 'Invalid email format.');
  }
  return email;
}

export function validatePassword(value) {
  const password = normalizeString(value);
  if (!password) {
    throw new ValidationError('MISSING_PASSWORD', 'Password is required.');
  }
  if (!PASSWORD_RE.test(password)) {
    throw new ValidationError(
      'PASSWORD_POLICY',
      'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.'
    );
  }
  return password;
}

export function validateOtpCode(value) {
  const code = normalizeString(value);
  if (!code || !OTP_CODE_RE.test(code)) {
    throw new ValidationError('INVALID_CODE', 'OTP must be 6 digits.');
  }
  return code;
}

export function requireField(value, fieldName) {
  const normalized = normalizeString(value);
  if (!normalized) {
    throw new ValidationError('MISSING_FIELD', `${fieldName} is required.`);
  }
  return normalized;
}

export function validateVerifiedToken(value) {
  const token = normalizeString(value);
  if (!token || !token.startsWith(VERIFIED_TOKEN_PREFIX)) {
    throw new ValidationError(
      'EMAIL_UNVERIFIED',
      'Email verification is required.'
    );
  }
  return token;
}

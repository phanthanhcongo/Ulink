'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Building2,
  Globe
} from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { register, AuthError } from '@/lib/auth';
import { SocialAuth } from '@/components/auth/social-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { cn } from '@/lib/utils';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone numbers are digits-only (no spaces, dashes, parentheses or leading
// '+'). The minimum length of 6 mirrors the server-side rule in
// src/lib/validators.ts. Keep the two in sync.
const PHONE_RE = /^\d{6,}$/;
// Server enforces this — same regex in src/lib/validators.ts and Directus
// customer-onboarding-endpoint/service.js. Keep in sync.
const PASSWORD_RE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

type Fields = 'company_name' | 'contact_name' | 'email' | 'phone' | 'password' | 'confirm_password';

// OTP verification in the registration flow is currently disabled — accounts
// are created directly on submit. This key is kept around so any leftover
// state from a previous session does not leak into the new flow.
const REGISTER_DRAFT_KEY = 'register_draft_v1';

interface RegisterDraft {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  /**
   * Whether the user explicitly accepted the terms of service. The backend
   * stamps a consent record (consented_at) on the customer row at the moment
   * the account is created.
   */
  agree: true;
  /** ISO-8601 timestamp of the moment the user consented (submit time). */
  agree_at: string;
}

export function RegisterForm() {
  const t = useTranslations('auth');
  const router = useRouter();

  const [values, setValues] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<Fields | 'agree', string>>>({});

  function set(field: Fields, value: string) {
    // Phone field is digits-only — strip everything else at input time so the
    // user can't even type a non-digit character (which would also fail the
    // PHONE_RE validation below with a phoneInvalid error).
    const sanitized = field === 'phone' ? value.replace(/\D/g, '') : value;
    setValues((v) => ({ ...v, [field]: sanitized }));
  }

  function validate() {
    const e: Partial<Record<Fields | 'agree', string>> = {};
    if (!values.company_name.trim()) e.company_name = t('companyRequired');
    if (!values.contact_name.trim()) e.contact_name = t('contactRequired');
    if (!values.email) e.email = t('emailRequired');
    else if (values.email.length > 254) e.email = t('emailTooLong');
    else if (!EMAIL_RE.test(values.email)) e.email = t('emailInvalid');
    if (!values.phone) e.phone = t('phoneRequired');
    else if (!PHONE_RE.test(values.phone)) e.phone = t('phoneInvalid');
    if (!values.password) e.password = t('passwordRequired');
    else if (values.password.length > 128) e.password = t('passwordTooLong');
    else if (!PASSWORD_RE.test(values.password)) e.password = t('passwordPolicy');
    if (values.confirm_password !== values.password) e.confirm_password = t('passwordMismatch');
    if (!agree) e.agree = t('agreeRequired');
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setFormError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      // OTP step is currently disabled — call /api/auth/register directly.
      // The legacy draft key is cleared so a stale draft from a previous
      // OTP-enabled session can't bleed into the new flow.
      try {
        sessionStorage.removeItem(REGISTER_DRAFT_KEY);
      } catch {
        /* ignore */
      }
      try {
        sessionStorage.removeItem('verified_tokens');
      } catch {
        /* ignore */
      }
      try {
        sessionStorage.removeItem('verified_token');
      } catch {
        /* ignore */
      }

      await register({
        company_name: values.company_name.trim(),
        contact_name: values.contact_name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
        confirm_password: values.confirm_password,
        // Stamp the consent at submit time so the timestamp is bound to the
        // moment the user actually agreed (which may differ from when the
        // checkbox was first ticked, if they paused to fill the form).
        agree: true,
        agree_at: new Date().toISOString()
      });
      // Account created — the /api/auth/register route does NOT set a session
      // cookie (no auto-login). Send the user to /login so they sign in
      // explicitly with the credentials they just chose.
      router.push('/login');
    } catch (err) {
      if (err instanceof AuthError) {
        if (err.code === 'email_taken' || err.status === 409) {
          setFormError(t('emailAlreadyRegistered'));
        } else if (err.code === 'agree_required') {
          setFormError(t('agreeRequired'));
        } else if (err.code === 'password_mismatch' || err.code === 'password_policy') {
          setFormError(t('passwordPolicy'));
        } else if (err.status === 422) {
          // Map raw Directus validation messages to user-friendly translations.
          // The server returns messages like 'Validation failed for field "email"...'
          // which should never be shown verbatim.
          const rawMsg = err.message?.toLowerCase() ?? '';
          if (rawMsg.includes('email')) {
            setErrors((cur) => ({ ...cur, email: t('emailInvalid') }));
          } else if (rawMsg.includes('password')) {
            setErrors((cur) => ({ ...cur, password: t('passwordPolicy') }));
          } else if (rawMsg.includes('phone')) {
            setErrors((cur) => ({ ...cur, phone: t('phoneInvalid') }));
          } else {
            setFormError(t('registerFailed'));
          }
        } else {
          setFormError(err.message || t('registerFailed'));
        }
      } else {
        setFormError(t('errorNetwork'));
      }
    } finally {
      setLoading(false);
    }
  }

  const field = (
    name: Fields,
    opts: {
      label: string;
      placeholder: string;
      type?: string;
      icon: typeof Mail;
      autoComplete?: string;
    }
  ) => {
    const Icon = opts.icon;
    const err = errors[name];
    return (
      <div>
        <label htmlFor={name} className="mb-1.5 block text-xs font-semibold text-slate-700">
          {opts.label} <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Icon
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors"
            aria-hidden="true"
          />
          <Input
            id={name}
            name={name}
            type={opts.type ?? 'text'}
            autoComplete={opts.autoComplete}
            value={values[name]}
            onChange={(e) => set(name, e.target.value)}
            placeholder={opts.placeholder}
            invalid={!!err}
            className="bg-slate-50/50 pl-11 hover:bg-white focus:bg-white rounded-[5px]"
          />
        </div>
        {err && (
          <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-rose-500">
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-4 flex justify-end">
          <LocaleSwitcher />
        </div>

        <div className="relative mb-6 flex items-center border-b border-slate-100">
          <Link
            href="/login"
            className="flex-1 py-3 text-center text-sm font-medium text-slate-400 transition-colors hover:text-slate-700"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="relative flex-1 border-b-2 border-brand py-3 text-center text-sm font-bold text-brand transition-colors"
          >
            Đăng ký tài khoản
          </Link>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {t('tabRegister')}
          </h2>
          <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
            {t('registerSubtitle')}
          </p>
        </div>

        <form className="mt-6 space-y-3.5" onSubmit={onSubmit} noValidate>
          {formError && (
            <p
              role="alert"
              className="rounded-[5px] border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
            >
              {formError}
            </p>
          )}

          {field('company_name', {
            label: t('companyLabel'),
            placeholder: t('companyPlaceholder'),
            icon: Building2,
            autoComplete: 'organization'
          })}
          {field('contact_name', {
            label: t('contactLabel'),
            placeholder: t('contactPlaceholder'),
            icon: User,
            autoComplete: 'name'
          })}
          {field('email', {
            label: t('emailLabel'),
            placeholder: t('emailPlaceholder'),
            icon: Mail,
            type: 'email',
            autoComplete: 'email'
          })}
          {field('phone', {
            label: t('phoneLabel'),
            placeholder: t('phonePlaceholder'),
            icon: Phone,
            type: 'tel',
            autoComplete: 'tel'
          })}

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-slate-700">
              {t('passwordLabel')} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors"
                aria-hidden="true"
              />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={values.password}
                onChange={(e) => set('password', e.target.value)}
                placeholder={t('passwordPlaceholder')}
                invalid={!!errors.password}
                className="bg-slate-50/50 pl-11 pr-11 hover:bg-white focus:bg-white rounded-[5px]"
              />
              <Button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                variant="ghost"
                size="icon"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-[5px] text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1.5 text-xs font-medium text-rose-500">
                {errors.password}
              </p>
            )}
            <p className="mt-1 text-[11px] text-slate-500">{t('passwordPolicyHint')}</p>
          </div>

          {field('confirm_password', {
            label: t('confirmPasswordLabel'),
            placeholder: t('confirmPasswordPlaceholder'),
            icon: Lock,
            type: showPassword ? 'text' : 'password',
            autoComplete: 'new-password'
          })}

          {/* Terms */}
          <div>
            <label className="flex items-start gap-2.5 text-xs text-slate-500">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-brand rounded-[5px]"
                aria-invalid={!!errors.agree}
              />
              <span>{t('agreeTerms')}</span>
            </label>
            {errors.agree && <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.agree}</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            fullWidth
            className="group py-3.5 text-sm font-bold shadow-brand/20 hover:shadow-lg hover:shadow-brand/30 active:scale-[0.99] rounded-[5px]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>{t('registerCreating')}</span>
              </>
            ) : (
              <>
                <span>{t('registerButton')}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('haveAccount')}{' '}
          <Link href="/login" className="font-medium text-brand hover:underline">
            {t('loginNow')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export { REGISTER_DRAFT_KEY, type RegisterDraft };

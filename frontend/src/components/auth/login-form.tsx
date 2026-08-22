'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { AuthError, isAdminUser } from '@/lib/auth';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  return (
    <Suspense fallback={null}>
      <LoginFormInner />
    </Suspense>
  );
}

function LoginFormInner() {
  const t = useTranslations('auth');
  const router = useRouter();
  const search = useSearchParams();
  const { login } = useAuth();

  const reason = search.get('reason');
  const reasonBanner =
    reason === 'password-changed'
      ? { kind: 'success' as const, key: 'loginAfterPasswordChange' }
      : null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const next: { email?: string; password?: string } = {};
    if (!email) next.email = t('emailRequired');
    else if (!EMAIL_RE.test(email)) next.email = t('emailInvalid');
    if (!password) next.password = t('passwordRequired');
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const loggedInUser = await login(email, password);
      const nextRaw = search.get('next');
      let targetPath = '/';
      if (loggedInUser && isAdminUser(loggedInUser)) {
        targetPath =
          typeof nextRaw === 'string' && nextRaw.startsWith('/admin') ? nextRaw : '/admin';
      } else {
        targetPath =
          typeof nextRaw === 'string' &&
            nextRaw.startsWith('/') &&
            !nextRaw.startsWith('//') &&
            !nextRaw.startsWith('/\\')
            ? nextRaw
            : '/';
      }
      router.push(targetPath);
      router.refresh();
    } catch (err) {
      if (err instanceof AuthError && err.code === 'account_locked') {
        setFormError(t('accountLockedContactAdmin'));
      } else if (err instanceof AuthError && err.code === 'network_error') {
        setFormError(t('errorNetwork'));
      } else {
        setFormError(t('errorInvalidCredentials'));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-4 flex justify-end">
          <LocaleSwitcher />
        </div>

        <div className="relative mb-6 flex items-center border-b border-slate-100">
          <Link
            href="/login"
            className="relative flex-1 border-b-2 border-brand py-3 text-center text-sm font-bold text-brand transition-colors"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="flex-1 py-3 text-center text-sm font-medium text-slate-400 transition-colors hover:text-slate-700"
          >
            Đăng ký tài khoản
          </Link>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Chào mừng bạn trở lại!
          </h2>
          <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
            Vui lòng nhập thông tin để đăng nhập hệ thống B2B của ULINK INDUSTRIES.
          </p>
        </div>

        {reasonBanner && (
          <div
            role="status"
            className="mt-4 flex items-start gap-2.5 rounded-[5px] border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs text-emerald-800"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span className="font-medium">{t(reasonBanner.key)}</span>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          {formError && (
            <div
              role="alert"
              className="rounded-[5px] border border-rose-200 bg-rose-50/80 p-3.5 text-xs font-medium leading-relaxed text-rose-700"
            >
              {formError}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700">
              Email Doanh Nghiệp <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors"
                aria-hidden="true"
              />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vd: contact@company.com"
                invalid={!!fieldErrors.email}
                className="bg-slate-50/50 pl-11 hover:bg-white focus:bg-white rounded-[5px]"
              />
            </div>
            {fieldErrors.email && (
              <p className="mt-1.5 text-xs font-medium text-rose-500">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <div className="mb-1.5">
              <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                Mật khẩu <span className="text-rose-500">*</span>
              </label>
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn"
                invalid={!!fieldErrors.password}
                className="bg-slate-50/50 pl-11 pr-11 hover:bg-white focus:bg-white rounded-[5px]"
              />
              <Button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                variant="ghost"
                size="icon"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-[5px] text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="mt-2 flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-brand transition-colors hover:text-brand-strong hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            {fieldErrors.password && (
              <p className="mt-1.5 text-xs font-medium text-rose-500">{fieldErrors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            fullWidth
            className="group py-3.5 text-sm font-bold shadow-brand/20 hover:shadow-lg hover:shadow-brand/30 active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Đang đăng nhập...</span>
              </>
            ) : (
              <>
                <span>Đăng nhập</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-6 text-center">
        <p className="text-xs text-slate-500">
          Bạn gặp khó khăn khi đăng nhập? Vui lòng liên hệ hotline{' '}
          <a href="tel:19006868" className="font-bold text-brand hover:underline">
            1900 6868
          </a>{' '}
          để được hỗ trợ.
        </p>
      </div>
    </div>
  );
}

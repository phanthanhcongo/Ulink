'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Save, Send, Eye, EyeOff } from 'lucide-react';

interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password?: string;
  mail_from: string;
  enabled: boolean;
}

export default function MailSettingsPage() {
  const [config, setConfig] = useState<MailConfig>({
    host: '', port: 587, secure: false, username: '', password: '', mail_from: '', enabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [testEmail, setTestEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetch('/api/admin/mail-settings')
      .then((r) => r.json())
      .then((d) => { if (d.data) setConfig({ ...d.data, password: '' }); })
      .catch(() => setMessage({ type: 'error', text: 'Không tải được cấu hình' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/mail-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error('Lưu thất bại');
      setMessage({ type: 'success', text: 'Đã lưu cấu hình mail thành công!' });
      setConfig((prev) => ({ ...prev, password: '' }));
    } catch {
      setMessage({ type: 'error', text: 'Không lưu được cấu hình' });
    } finally {
      setSaving(false);
    }
  };

  const handleTestMail = async () => {
    if (!testEmail) { setMessage({ type: 'error', text: 'Nhập email để test' }); return; }
    setTesting(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/mail-settings/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: testEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Gửi mail test thất bại');
      setMessage({ type: 'success', text: 'Email test đã gửi thành công!' });
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Gửi thất bại' });
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2163F5]" />
      </div>
    );
  }

  return (
    <div className="admin-page max-w-3xl">
      <div className="mb-6 md:mb-8">
        <span className="admin-page-eyebrow">Cài đặt hệ thống</span>
        <h1 className="admin-page-title flex items-center gap-2.5">
          <Mail className="w-6 h-6 text-[#2163F5]" />
          Cấu hình Mail SMTP
        </h1>
        <p className="admin-page-lead">Quản lý cấu hình gửi mail OTP, thông báo cho khách hàng</p>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-[6px] text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="admin-panel admin-panel-pad space-y-5">
        {/* Enabled toggle */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4E9F0]">
          <div>
            <label className="font-semibold text-[#162233]">Sử dụng cấu hình từ database</label>
            <p className="text-sm text-slate-500 mt-0.5">Nếu tắt sẽ dùng cấu hình từ file .env</p>
          </div>
          <button
            onClick={() => setConfig((p) => ({ ...p, enabled: !p.enabled }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${config.enabled ? 'bg-[#2163F5]' : 'bg-slate-300'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${config.enabled ? 'translate-x-6' : ''}`} />
          </button>
        </div>

        <div className={config.enabled ? '' : 'opacity-50 pointer-events-none'}>
          <div className="admin-form-group">
            {/* Host */}
            <div className="admin-input-group">
              <label className="admin-input-label">SMTP Host</label>
              <input
                type="text"
                value={config.host}
                onChange={(e) => setConfig((p) => ({ ...p, host: e.target.value }))}
                placeholder="smtp.gmail.com"
                className="admin-input"
              />
            </div>

            {/* Port + Secure */}
            <div className="admin-form-row">
              <div className="admin-form-col admin-input-group">
                <label className="admin-input-label">Port</label>
                <input
                  type="number"
                  value={config.port}
                  onChange={(e) => setConfig((p) => ({ ...p, port: Number(e.target.value) }))}
                  className="admin-input"
                />
              </div>
              <div className="admin-form-col admin-input-group">
                <label className="admin-input-label">SSL/TLS</label>
                <select
                  value={config.secure ? 'true' : 'false'}
                  onChange={(e) => setConfig((p) => ({ ...p, secure: e.target.value === 'true' }))}
                  className="admin-select"
                >
                  <option value="false">STARTTLS (port 587)</option>
                  <option value="true">SSL/TLS (port 465)</option>
                </select>
              </div>
            </div>

            {/* Username */}
            <div className="admin-input-group">
              <label className="admin-input-label">Username (Email)</label>
              <input
                type="email"
                value={config.username}
                onChange={(e) => setConfig((p) => ({ ...p, username: e.target.value }))}
                placeholder="your-email@gmail.com"
                className="admin-input"
              />
            </div>

            {/* Password */}
            <div className="admin-input-group">
              <label className="admin-input-label">Password / App Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={config.password ?? ''}
                  onChange={(e) => setConfig((p) => ({ ...p, password: e.target.value }))}
                  placeholder="Để trống nếu không đổi"
                  className="admin-input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* From */}
            <div className="admin-input-group">
              <label className="admin-input-label">Mail From</label>
              <input
                type="text"
                value={config.mail_from}
                onChange={(e) => setConfig((p) => ({ ...p, mail_from: e.target.value }))}
                placeholder='ULINK <no-reply@ulink.com>'
                className="admin-input"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-[#E4E9F0]">
          <button
            onClick={handleSave}
            disabled={saving}
            className="admin-button admin-button-primary"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Đang lưu...' : 'Lưu cấu hình'}
          </button>
        </div>
      </div>

      {/* Test email section */}
      <div className="admin-panel admin-panel-pad mt-6 space-y-4">
        <h2 className="text-lg font-bold text-[#162233]">Gửi mail test</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="email-nhan@example.com"
            className="admin-input flex-1"
          />
          <button
            onClick={handleTestMail}
            disabled={testing}
            className="admin-button bg-green-600 text-white hover:bg-green-700 shadow-sm disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {testing ? 'Đang gửi...' : 'Gửi test'}
          </button>
        </div>
      </div>
    </div>
  );
}

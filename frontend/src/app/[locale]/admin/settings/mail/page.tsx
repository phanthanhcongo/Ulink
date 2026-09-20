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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Cấu hình Mail SMTP</h1>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow border p-6 space-y-4">
        {/* Enabled toggle */}
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <label className="font-medium text-gray-900">Sử dụng cấu hình từ database</label>
            <p className="text-sm text-gray-500">Nếu tắt sẽ dùng cấu hình từ file .env</p>
          </div>
          <button
            onClick={() => setConfig((p) => ({ ...p, enabled: !p.enabled }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${config.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${config.enabled ? 'translate-x-6' : ''}`} />
          </button>
        </div>

        <div className={config.enabled ? '' : 'opacity-50 pointer-events-none'}>
          {/* Host */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
            <input
              type="text"
              value={config.host}
              onChange={(e) => setConfig((p) => ({ ...p, host: e.target.value }))}
              placeholder="smtp.gmail.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Port + Secure */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Port</label>
              <input
                type="number"
                value={config.port}
                onChange={(e) => setConfig((p) => ({ ...p, port: Number(e.target.value) }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">SSL/TLS</label>
              <select
                value={config.secure ? 'true' : 'false'}
                onChange={(e) => setConfig((p) => ({ ...p, secure: e.target.value === 'true' }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="false">STARTTLS (port 587)</option>
                <option value="true">SSL/TLS (port 465)</option>
              </select>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-1 mt-4">
            <label className="block text-sm font-medium text-gray-700">Username (Email)</label>
            <input
              type="email"
              value={config.username}
              onChange={(e) => setConfig((p) => ({ ...p, username: e.target.value }))}
              placeholder="your-email@gmail.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-1 mt-4">
            <label className="block text-sm font-medium text-gray-700">Password / App Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={config.password ?? ''}
                onChange={(e) => setConfig((p) => ({ ...p, password: e.target.value }))}
                placeholder="Để trống nếu không đổi"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* From */}
          <div className="space-y-1 mt-4">
            <label className="block text-sm font-medium text-gray-700">Mail From</label>
            <input
              type="text"
              value={config.mail_from}
              onChange={(e) => setConfig((p) => ({ ...p, mail_from: e.target.value }))}
              placeholder='ULINK <no-reply@ulink.com>'
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Đang lưu...' : 'Lưu cấu hình'}
          </button>
        </div>
      </div>

      {/* Test email section */}
      <div className="bg-white rounded-lg shadow border p-6 mt-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Gửi mail test</h2>
        <div className="flex gap-3">
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="email-nhan@example.com"
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleTestMail}
            disabled={testing}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {testing ? 'Đang gửi...' : 'Gửi test'}
          </button>
        </div>
      </div>
    </div>
  );
}

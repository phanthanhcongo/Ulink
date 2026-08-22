'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}
export function ConfirmModal({
  isOpen,
  title = 'Xác nhận hành động',
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  onConfirm,
  onCancel,
  type = 'warning'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in select-none">
      <div
        className="w-full max-w-md bg-white rounded-[3px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-800 flex items-center gap-2">
            <AlertTriangle
              className={cn(
                'h-5 w-5',
                type === 'danger' && 'text-rose-500',
                type === 'warning' && 'text-amber-500',
                type === 'info' && 'text-blue-500'
              )}
            />
            {title}
          </h3>
          <button
            onClick={onCancel}
            className="p-1 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-3 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-[3px] border border-slate-200 text-xs font-bold text-slate-550 hover:bg-slate-100 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              'inline-flex items-center justify-center px-4 py-2 rounded-[3px] text-xs font-bold text-white shadow-sm transition-colors',
              type === 'danger' && 'bg-rose-600 hover:bg-rose-700',
              type === 'warning' && 'bg-amber-600 hover:bg-amber-700',
              type === 'info' && 'bg-blue-600 hover:bg-blue-700'
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

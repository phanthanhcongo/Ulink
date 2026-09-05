'use client';

import React from 'react';
import { X, Clock } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function ComingSoonModal({ isOpen, onClose, title }: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-[3px] p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-5 animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-full p-1.5 bg-slate-50 hover:bg-slate-100 transition-all duration-200"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[3px] bg-blue-50 text-blue-600 border border-blue-100 shadow-xs relative">
          <Clock className="h-7 w-7 stroke-[2.2] animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="inline-block text-caption-responsive font-bold uppercase tracking-tight text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Coming Soon
          </span>
          <h3 className="text-card-title text-slate-900 pt-1">
            Tính năng Tải Tài liệu đang cập nhật
          </h3>
          <p className="text-caption-responsive text-slate-500 font-semibold leading-relaxed px-2">
            Tài liệu <strong className="text-slate-800 font-bold">&quot;{title}&quot;</strong> đang trong quá trình chuẩn bị bản PDF chính thức. Vui lòng liên hệ hotline hỗ trợ kinh doanh B2B để nhận tệp trực tiếp!
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-caption-responsive font-bold shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-98 min-h-[44px]"
          >
            Đã hiểu & Đóng lại
          </button>
        </div>
      </div>
    </div>
  );
}

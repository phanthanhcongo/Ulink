'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Link2, Check, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export type EventSidebarProps = {
  title: string;
  slug: string;
  organizerName: string;
  startTime?: string;
  endTime?: string;
  timezone?: string;
  date: string;
  price?: string;
  registrationStatus: string;
};

export function EventSidebar({
  title,
  slug,
  organizerName,
  startTime = '09:00 AM',
  endTime = '11:30 AM',
  timezone = 'UTC+07:00',
  date,
  price = 'Miễn phí',
  registrationStatus
}: EventSidebarProps) {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  // Extract month name and day number from Vietnamese date string (e.g., "Thứ Bảy, 15 tháng 11, 2026")
  // Or fallback if parsing fails.
  const getCalendarDate = () => {
    try {
      const match = date.match(/(\d+)\s+tháng\s+(\d+)/);
      if (match) {
        const day = match[1];
        const monthNum = match[2];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const month = months[parseInt(monthNum, 10) - 1] || 'EVENT';
        return { day, month };
      }
    } catch (e) {
      // ignore
    }
    return { day: '15', month: 'NOV' }; // default fallback
  };

  const calDate = getCalendarDate();

  return (
    <div className="sticky top-6 rounded-[3px] bg-[#0E2142] text-white p-6 sm:p-8 shadow-2xl border border-slate-800">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-xl font-extrabold leading-snug tracking-tight text-white pr-4">
          {title}
        </h3>

        {/* Calendar Badge */}
        <div className="bg-slate-800/80 rounded-[3px] border border-slate-700 p-2 text-center shrink-0 min-w-[56px]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{calDate.month}</p>
          <p className="text-lg font-black text-white mt-1 leading-none">{calDate.day}</p>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-800 pt-4 space-y-4">
        {/* Event By */}
        <div>
          <span className="text-xs uppercase tracking-widest text-slate-400">Event By</span>
          <p className="text-sm font-semibold text-slate-200 mt-1">{organizerName}</p>
        </div>

        {/* Start / End Time Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-slate-400">Start Time</span>
            <p className="text-sm font-bold text-slate-200 mt-1">{startTime}</p>
            <span className="text-[10px] text-slate-500">{timezone}</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-slate-400">End Time</span>
            <p className="text-sm font-bold text-slate-200 mt-1">{endTime}</p>
            <span className="text-[10px] text-slate-500">{timezone}</span>
          </div>
        </div>

        {/* Event Status */}
        <div>
          <span className="text-xs uppercase tracking-widest text-slate-400 block">Event Status</span>
          <span className="inline-block mt-1 text-xs font-black tracking-widest text-emerald-400 uppercase">
            {registrationStatus}
          </span>
        </div>

        {/* Ticket Price */}
        <div className="border-t border-slate-800 pt-4 flex items-center gap-3">
          <Calendar className="h-5 w-5 text-emerald-400 shrink-0" />
          <span className="text-lg font-bold text-slate-200">{price}</span>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <Link
            href={`/events/${slug}/register`}
            className="flex w-full items-center justify-center rounded-[3px] bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] py-3 text-sm font-bold text-white transition-all shadow-md shadow-emerald-950/20 font-sans"
          >
            Đăng ký ngay
          </Link>
        </div>

        {/* Share Section */}
        <div className="border-t border-slate-800 pt-5 mt-6">
          <span className="text-xs text-slate-400 block font-semibold mb-3">Share this event on</span>
          <div className="flex gap-4 mb-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>

          {/* Copy Link Input */}
          <div className="flex items-center gap-2 rounded-[3px] bg-slate-900 border border-slate-800 p-2 pl-3">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs text-slate-400 outline-none w-full truncate border-none select-all"
            />
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-[3px] hover:bg-slate-800 active:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
              title="Copy link"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Link2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

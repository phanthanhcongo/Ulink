'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, ShoppingCart, CreditCard, FileText, Clock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { parseOrderNotes } from '@/lib/order-notes';

const money = (n: number) => new Intl.NumberFormat('vi-VN').format(Number(n || 0)) + 'đ';

const statusLabel: Record<string, string> = {
  pending: 'Chờ xử lý', confirmed: 'Đã xác nhận', processing: 'Đang xử lý',
  shipped: 'Đã giao', completed: 'Hoàn tất', cancelled: 'Đã hủy',
  payment_required: 'Chờ thanh toán', payment_failed: 'TT thất bại', payment_expired: 'TT hết hạn'
};

const statusColor: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800', confirmed: 'bg-emerald-100 text-emerald-800',
  processing: 'bg-blue-100 text-blue-800', shipped: 'bg-indigo-100 text-indigo-800',
  completed: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800',
  payment_required: 'bg-yellow-100 text-yellow-800', payment_failed: 'bg-red-100 text-red-800',
  payment_expired: 'bg-slate-100 text-slate-600'
};

const paymentStatusLabel: Record<string, string> = { none: 'Chưa thanh toán', pending: 'Đang chờ', success: 'Thành công', failed: 'Thất bại', expired: 'Hết hạn' };
const paymentStatusColor: Record<string, string> = { none: 'bg-slate-100 text-slate-600', pending: 'bg-amber-100 text-amber-800', success: 'bg-emerald-100 text-emerald-800', failed: 'bg-red-100 text-red-800', expired: 'bg-slate-100 text-slate-600' };

const eventTypeLabel: Record<string, string> = { created: 'Tạo payment', webhook_received: 'Webhook nhận', status_changed: 'Đổi trạng thái', error: 'Lỗi' };

export default function OrderDetailClient({ order, payments, auditLog, error, locale }: {
  order: any; payments: any[]; auditLog: any[]; error: string; locale: string;
}) {
  if (error) {
    return (
      <div className="admin-page space-y-5">
        <a href={`/${locale}/admin/orders`} className="inline-flex items-center gap-2 text-sm text-brand hover:underline">
          <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
        </a>
        <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      </div>
    );
  }

  const meta = parseOrderNotes(order.notes);
  const buyer = meta.buyer || {};
  const ps = order.payment_status || 'none';

  return (
    <div className="admin-page space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <a href={`/${locale}/admin/orders`} className="text-slate-400 hover:text-brand transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </a>
          <ShoppingCart className="h-7 w-7 text-brand" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Đơn hàng {order.code}</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Ngày đặt: {order.order_date ? new Date(order.order_date).toLocaleDateString('vi-VN') : '—'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusColor[order.status] || 'bg-slate-100 text-slate-600'}`}>
            {statusLabel[order.status] || order.status}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${paymentStatusColor[ps] || 'bg-slate-100 text-slate-600'}`}>
            {paymentStatusLabel[ps] || ps}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Order info + Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info Card */}
          <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-500" /> Thông tin khách hàng
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wide">Họ tên</span>
                <span className="text-slate-900 font-medium">{order.customer?.company_name || buyer.fullName || 'Khách vãng lai'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wide">Email</span>
                <span className="text-slate-900">{order.customer?.email || buyer.email || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wide">Số điện thoại</span>
                <span className="text-slate-900">{order.customer?.phone || buyer.phone || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wide">Địa chỉ</span>
                <span className="text-slate-900">{buyer.address || '—'}</span>
              </div>
              {buyer.province && (
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wide">Khu vực</span>
                  <span className="text-slate-900">{[buyer.ward, buyer.district, buyer.province].filter(Boolean).join(', ')}</span>
                </div>
              )}
              {buyer.note && (
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wide">Ghi chú</span>
                  <span className="text-slate-900">{buyer.note}</span>
                </div>
              )}
              {meta.paymentMethod && (
                <div>
                  <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wide">Phương thức TT</span>
                  <span className="text-slate-900 font-medium">{meta.paymentMethod === 'vnpay' ? 'VNPay QR' : meta.paymentMethod}</span>
                </div>
              )}
              {meta.shippingMethod && (
                <div>
                  <span className="text-slate-500 block text-xs font-semibold uppercase tracking-wide">Phương thức VC</span>
                  <span className="text-slate-900">{meta.shippingMethod}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Items Card */}
          <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-slate-500" /> Sản phẩm ({(order.items || []).length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-500 uppercase tracking-wide">
                    <th className="text-left py-2 pr-4">SKU</th>
                    <th className="text-left py-2 pr-4">Mô tả</th>
                    <th className="text-right py-2 pr-4">SL</th>
                    <th className="text-right py-2 pr-4">Đơn giá</th>
                    <th className="text-right py-2">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {(order.items || []).map((item: any) => (
                    <tr key={item.id} className="border-b border-slate-50">
                      <td className="py-3 pr-4 font-mono text-xs text-brand font-bold">{item.sku?.sku_code || '—'}</td>
                      <td className="py-3 pr-4">{item.description || '—'}</td>
                      <td className="py-3 pr-4 text-right">{item.qty}</td>
                      <td className="py-3 pr-4 text-right">{money(item.unit_price)}</td>
                      <td className="py-3 text-right font-semibold">{money(item.line_total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Tạm tính</span><span className="font-medium">{money(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Thuế VAT</span><span className="font-medium">{money(order.tax)}</span></div>
              <div className="flex justify-between text-base font-bold border-t border-slate-100 pt-2"><span>Tổng cộng</span><span className="text-brand">{money(order.total)}</span></div>
            </div>
          </div>
        </div>

        {/* Right: Payment info */}
        <div className="space-y-6">
          {/* Payment Records Card */}
          <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-slate-500" /> Thanh toán
            </h2>
            {payments.length === 0 ? (
              <p className="text-sm text-slate-500 italic">Chưa có giao dịch thanh toán.</p>
            ) : (
              <div className="space-y-3">
                {payments.map((p: any) => (
                  <div key={p.id} className="rounded border border-slate-100 p-3 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-slate-600">{p.vnp_txn_ref}</span>
                      <PaymentBadge status={p.status} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block">Số tiền</span>
                        <span className="font-semibold">{money(p.amount)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Phương thức</span>
                        <span className="font-semibold uppercase">{p.payment_method}</span>
                      </div>
                      {p.vnp_trans_id && (
                        <div>
                          <span className="text-slate-400 block">VNPay Trans ID</span>
                          <span className="font-mono">{p.vnp_trans_id}</span>
                        </div>
                      )}
                      {p.response_code && (
                        <div>
                          <span className="text-slate-400 block">Response Code</span>
                          <span className="font-mono">{p.response_code}</span>
                        </div>
                      )}
                      {p.paid_at && (
                        <div className="col-span-2">
                          <span className="text-slate-400 block">Thanh toán lúc</span>
                          <span>{new Date(p.paid_at).toLocaleString('vi-VN')}</span>
                        </div>
                      )}
                      <div className="col-span-2">
                        <span className="text-slate-400 block">Tạo lúc</span>
                        <span>{new Date(p.date_created).toLocaleString('vi-VN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audit Log Card */}
          {auditLog.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-500" /> Nhật ký thanh toán
              </h2>
              <div className="space-y-2">
                {auditLog.map((log: any) => (
                  <div key={log.id} className="flex items-start gap-3 text-xs border-b border-slate-50 pb-2 last:border-0">
                    <AuditIcon type={log.event_type} />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-700">{eventTypeLabel[log.event_type] || log.event_type}</p>
                      {log.status_from && log.status_to && (
                        <p className="text-slate-500">{log.status_from} → {log.status_to}</p>
                      )}
                      <p className="text-slate-400 mt-0.5">{new Date(log.date_created).toLocaleString('vi-VN')} · {log.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    success: 'bg-emerald-100 text-emerald-700',
    failed: 'bg-red-100 text-red-700',
    expired: 'bg-slate-100 text-slate-600'
  };
  const labels: Record<string, string> = { pending: 'Đang chờ', success: 'Thành công', failed: 'Thất bại', expired: 'Hết hạn' };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${colors[status] || 'bg-slate-100 text-slate-500'}`}>
      {labels[status] || status}
    </span>
  );
}

function AuditIcon({ type }: { type: string }) {
  const cls = 'h-4 w-4 mt-0.5 shrink-0';
  switch (type) {
    case 'status_changed': return <CheckCircle2 className={`${cls} text-emerald-500`} />;
    case 'error': return <XCircle className={`${cls} text-red-500`} />;
    case 'webhook_received': return <AlertTriangle className={`${cls} text-amber-500`} />;
    default: return <Clock className={`${cls} text-slate-400`} />;
  }
}

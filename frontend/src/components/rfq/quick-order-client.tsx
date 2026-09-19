'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import {
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Upload,
  Plus,
  FileText,
  X,
  Phone,
  Mail,
  ChevronRight,
  Shield,
  Headphones,
  Truck,
  Award,
  Check,
  Info,
  Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AuthUser } from '@/lib/auth-helpers';
import Image from 'next/image';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { resolveImageUrl } from '@/lib/image-url';
import { getTranslatedName } from '@/lib/i18n-content';
import {
  type CartItem,
  readCart,
  persistCart,
  saveDraft,
  readDraft,
  clearDraft
} from './cart-types';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

/* ───────────────────── types ───────────────────── */

interface SkuItem {
  id: number;
  sku_code: string;
  product_name?: string;
  unit: string;
  pack_size: string;
  hero?: string | null;
}

interface MetaData {
  customer: {
    company_name?: string;
    contact_name?: string;
    email?: string;
    phone?: string;
    address?: string;
    hub?: number;
    industry?: string;
  } | null;
  hubs: Array<{ id: number; name: string; slug: string }>;
  industries: Array<{ id: number; name: string; slug: string }>;
  skus: SkuItem[];
  products?: Array<{
    id: number;
    slug: string;
    name: string;
    hero: string | null;
    translations?: Array<{ languages_code: string; name: string }>;
    skus?: Array<{ unit: string | null }>;
  }>;
}

interface UploadedFile {
  name: string;
  size: number;
  file: File;
}

/* ───────────────────── helpers ──────────────────── */

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getSkuPriceRange(skuCode: string, unit: string) {
  let hash = 0;
  for (let i = 0; i < skuCode.length; i++) {
    hash = skuCode.charCodeAt(i) + ((hash << 5) - hash);
  }
  const basePrice = Math.abs(hash % 150) * 1000 + 15000;
  const highPrice = basePrice + Math.abs(hash % 20) * 1000 + 5000;
  return `${basePrice.toLocaleString('vi-VN')}đ - ${highPrice.toLocaleString('vi-VN')}đ/${unit}`;
}

/* ───────────────────── component ────────────────── */

export function QuickOrderClient({ user }: { user: AuthUser | null }) {
  const t = useTranslations('quickOrderPage');
  const locale = useLocale();

  /* ── cart state ── */
  const [cart, setCart] = useState<CartItem[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);

  interface SubmittedRfqInfo {
    code: string;
    company: string;
    industry: string;
    products: string;
    time: string;
    status: string;
  }
  const [submittedRfq, setSubmittedRfq] = useState<SubmittedRfqInfo | null>(null);

  /* ── form state ── */
  const [formCompany, setFormCompany] = useState('');
  const [formTaxId, setFormTaxId] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formIndustry, setFormIndustry] = useState('');
  const [formDeliveryTime, setFormDeliveryTime] = useState('');
  const [formPaymentMethod, setFormPaymentMethod] = useState('');
  const [formOrderFrequency, setFormOrderFrequency] = useState('');
  const [formMessage, setFormMessage] = useState('');

  /* ── file upload (frontend-only) ── */
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  /* ── status ── */
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdRfqId, setCreatedRfqId] = useState<string | number | null>(null);
  const [draftSavedMsg, setDraftSavedMsg] = useState(false);

  /* ── add product modal state ── */
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkuId, setSelectedSkuId] = useState<number | null>(null);

  // Manual input fields
  const [manualName, setManualName] = useState('');
  const [manualSku, setManualSku] = useState('');
  const [manualSpec, setManualSpec] = useState('');
  const [manualUnit, setManualUnit] = useState('cái');
  const [manualQty, setManualQty] = useState<number>(1);
  const [manualNote, setManualNote] = useState('');
  const [selectedProductToEdit, setSelectedProductToEdit] = useState<number | null>(null);

  // Product name autocomplete dropdown
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const nameDropdownRef = useRef<HTMLDivElement>(null);

  // Quantity modal state
  const [isQtyModalOpen, setIsQtyModalOpen] = useState(false);
  const [qtyModalSku, setQtyModalSku] = useState<SkuItem | null>(null);
  const [qtyModalValue, setQtyModalValue] = useState(1);
  const [qtyModalUnit, setQtyModalUnit] = useState('cái');

  // Filter skus by product name input for autocomplete
  const nameFilteredSkus = useMemo(() => {
    if (!meta?.skus || !manualName.trim()) return [];
    const q = manualName.toLowerCase();
    return meta.skus.filter(
      (sku) =>
        (sku.product_name && sku.product_name.toLowerCase().includes(q)) ||
        sku.sku_code.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [meta?.skus, manualName]);

  // Close name dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (nameDropdownRef.current && !nameDropdownRef.current.contains(e.target as Node)) {
        setShowNameDropdown(false);
      }
    }
    if (showNameDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showNameDropdown]);

  // Filter products by search query
  const filteredSkus = useMemo(() => {
    if (!meta?.skus) return [];
    if (!searchQuery.trim()) {
      return meta.skus;
    }
    const q = searchQuery.toLowerCase();
    return meta.skus.filter(
      (sku) =>
        sku.sku_code.toLowerCase().includes(q) ||
        (sku.product_name && sku.product_name.toLowerCase().includes(q))
    );
  }, [meta?.skus, searchQuery]);

  /* ── load metadata + draft on mount ── */
  useEffect(() => {
    setCart(readCart());

    // Restore draft
    const draft = readDraft();
    if (draft) {
      setFormCompany((draft.company as string) || '');
      setFormTaxId((draft.taxId as string) || '');
      setFormContact((draft.contact as string) || '');
      setFormEmail((draft.email as string) || '');
      setFormPhone((draft.phone as string) || '');
      setFormAddress((draft.address as string) || '');
      setFormIndustry((draft.industry as string) || '');
      setFormDeliveryTime((draft.deliveryTime as string) || '');
      setFormPaymentMethod((draft.paymentMethod as string) || '');
      setFormOrderFrequency((draft.orderFrequency as string) || '');
      setFormMessage((draft.message as string) || '');
    }

    async function fetchMetadata() {
      try {
        const res = await fetch('/api/customer');
        if (res.ok) {
          const data: MetaData = await res.json();
          setMeta(data);

          // Auto-fill form if customer profile exists and no draft
          if (data.customer && !draft) {
            setFormCompany(data.customer.company_name || '');
            setFormContact(data.customer.contact_name || '');
            setFormEmail(data.customer.email || user?.email || '');
            setFormPhone(data.customer.phone || '');
            setFormAddress(data.customer.address || '');
            setFormIndustry(data.customer.industry || '');
          } else if (user && !draft) {
            setFormContact(`${user.last_name ?? ''} ${user.first_name ?? ''}`.trim());
            setFormEmail(user.email);
          }
        }
      } catch (err) {
        console.error('Failed to load metadata', err);
      }
    }

    fetchMetadata();
  }, [user]);

  /* ── cart helpers ── */
  const saveCart = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    persistCart(newCart);
  }, []);

  const handleRemoveItem = useCallback((index: number) => {
    setCart((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      persistCart(updated);
      return updated;
    });
  }, []);

  const handleUpdateCartField = useCallback(
    (index: number, field: keyof CartItem, value: string | number) => {
      setCart((prev) => {
        const updated = prev.map((item, i) => (i === index ? { ...item, [field]: value } : item));
        persistCart(updated);
        return updated;
      });
    },
    []
  );

  /* ── file upload handlers (frontend-only) ── */
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.xlsx', '.png', '.jpg', '.jpeg'];

  const processFiles = useCallback((files: FileList | File[]) => {
    const validFiles: UploadedFile[] = [];
    for (const file of Array.from(files)) {
      if (file.size > MAX_FILE_SIZE) continue;
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) continue;
      validFiles.push({ name: file.name, size: file.size, file });
    }
    if (validFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...validFiles]);
    }
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) processFiles(e.target.files);
      e.target.value = '';
    },
    [processFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleRemoveFile = useCallback((index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /* ── draft save ── */
  const handleSaveDraft = useCallback(() => {
    saveDraft({
      company: formCompany,
      taxId: formTaxId,
      contact: formContact,
      email: formEmail,
      phone: formPhone,
      address: formAddress,
      industry: formIndustry,
      deliveryTime: formDeliveryTime,
      paymentMethod: formPaymentMethod,
      orderFrequency: formOrderFrequency,
      message: formMessage
    });
    setDraftSavedMsg(true);
    setTimeout(() => setDraftSavedMsg(false), 2000);
  }, [
    formCompany,
    formTaxId,
    formContact,
    formEmail,
    formPhone,
    formAddress,
    formIndustry,
    formDeliveryTime,
    formPaymentMethod,
    formOrderFrequency,
    formMessage
  ]);

  /* ── submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const errors: Record<string, string> = {};

    if (!formCompany.trim()) errors.company = t('required');
    if (!formContact.trim()) errors.contact = t('required');

    if (!formEmail.trim()) {
      errors.email = t('required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail.trim())) {
      errors.email = 'Email không đúng định dạng.';
    }

    if (!formPhone.trim()) {
      errors.phone = t('required');
    } else if (!/^[0-9+\s()-]{8,20}$/.test(formPhone.trim().replace(/\s/g, ''))) {
      errors.phone = 'Số điện thoại phải có độ dài từ 8 đến 20 số.';
    }

    if (!formAddress.trim()) errors.address = t('required');
    if (!formIndustry) errors.industry = t('required');

    const validCartItems = cart.filter((item) => item.sku.trim() || item.product_name.trim());
    if (validCartItems.length === 0) {
      setSubmitError(t('cartEmpty'));
      return;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: formCompany.trim(),
          contact: formContact.trim(),
          email: formEmail.trim(),
          phone: formPhone.trim(),
          address: formAddress.trim(),
          industry: formIndustry,
          message: formMessage.trim(),
          items: validCartItems.map((item) => ({
            sku: item.sku.trim() || item.product_name.trim(),
            qty: item.quantity || 1,
            note: item.note || undefined
          })),
          source: 'portal'
        })
      });

      const json = await res.json();

      if (!res.ok) {
        const errObj = json.error || {};
        const errCode = errObj.code || json.error;
        const errMessage = errObj.message || json.message;
        const errDetails = errObj.details || json.details;

        if (errCode === 'UNPROCESSABLE_ENTITY' && errDetails) {
          const fieldErrs: Record<string, string> = {};
          if (errDetails.missingFields) {
            errDetails.missingFields.forEach((f: string) => {
              fieldErrs[f] = t('required');
            });
          }
          if (errDetails.invalidFields) {
            Object.entries(errDetails.invalidFields).forEach(([f, codes]: any) => {
              fieldErrs[f] = `Giá trị không hợp lệ: ${codes.join(', ')}`;
            });
          }
          setFieldErrors(fieldErrs);
          throw new Error(errMessage || 'Dữ liệu yêu cầu không hợp lệ.');
        }
        throw new Error(errMessage || 'Gửi yêu cầu báo giá thất bại.');
      }

      // Success
      const rfqIdNum = json.data?.id || 8947;
      const formattedRfqCode = `RFQ-2026-${String(rfqIdNum).slice(-4).padStart(4, '0')}A`;

      const industryObj = meta?.industries.find((i) => i.slug === formIndustry);
      const industryLabel = industryObj ? industryObj.name : formIndustry;

      const productNames = validCartItems.map((item) => item.product_name || item.sku).join(' & ');

      const now = new Date();
      const timeString = `Hôm nay, lúc ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} (GMT+7)`;

      setSubmittedRfq({
        code: formattedRfqCode,
        company: formCompany.trim() || 'Công ty của Quý khách',
        industry: industryLabel || 'Chưa xác định',
        products: productNames || 'Sản phẩm B2B',
        time: timeString,
        status: 'Đang xử lý kỹ thuật'
      });

      setCreatedRfqId(json.data?.id || null);

      // Upload attached files if any
      if (uploadedFiles.length > 0 && json.data?.id) {
        try {
          const formData = new FormData();
          formData.append('rfq_id', String(json.data.id));
          uploadedFiles.forEach((uf) => {
            formData.append('files', uf.file);
          });
          await fetch('/api/rfq/upload', {
            method: 'POST',
            body: formData
          });
        } catch (uploadErr) {
          console.error('File upload failed (RFQ created OK):', uploadErr);
        }
      }

      setShowSuccess(true);
      saveCart([]);
      clearDraft();

      // Reset form
      if (!meta?.customer) {
        setFormCompany('');
        setFormTaxId('');
        setFormContact('');
        setFormEmail('');
        setFormPhone('');
        setFormAddress('');
        setFormIndustry('');
      }
      setFormDeliveryTime('');
      setFormPaymentMethod('');
      setFormOrderFrequency('');
      setFormMessage('');
      setUploadedFiles([]);
    } catch (err: any) {
      setSubmitError(err.message || 'Gửi yêu cầu báo giá thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── shared input classes ── */
  const inputCls = (err?: string) =>
    cn(
      'w-full rounded-[3px] border  px-3 py-2.5 text-body-regular outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand',
      err ? 'border-rose-500' : 'border-border/80'
    );

  const selectCls = (err?: string) =>
    cn(
      'w-full rounded-[3px] border  px-3 py-2.5 text-body-regular outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand appearance-none',
      err ? 'border-rose-500' : 'border-border/80'
    );

  const sectionHeadCls =
    'flex items-center gap-2 text-body-regular font-semibold text-foreground border-l-[3px] border-brand pl-3';

  /* ───────────────── RENDER ─────────────────── */

  if (showSuccess && submittedRfq) {
    return (
      <div className="w-full max-w-[800px] mx-auto text-center py-6 sm:py-10 space-y-8 text-slate-800 text-left">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-caption-responsive text-muted-foreground justify-center"
        >
          <Link href="/" className="transition-colors hover:text-brand">
            {t('breadcrumbHome')}
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <span className="font-medium text-foreground">{t('breadcrumbRfq')}</span>
        </nav>

        {/* Soft Blue Circle Check Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EBF5FF] shadow-sm border border-blue-100/40">
          <Check className="h-6 w-6 text-[#1D4ED8] stroke-[3]" />
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-4 max-w-2xl mx-auto text-center">
          <h2 className="text-section-title font-bold text-primary tracking-tight">
            Yêu cầu báo giá đã được gửi thành công!
          </h2>
          <p className="text-caption-responsive text-slate-500 font-medium leading-relaxed">
            Cảm ơn Quý khách đã tin tưởng và lựa chọn ULink Industries. Yêu cầu của bạn đã được
            chuyển tới phòng chuyên môn kỹ thuật. Đội ngũ kỹ sư của chúng tôi đang tiến hành rà soát
            các yêu cầu kỹ thuật và sẽ liên hệ phản hồi chi tiết tới Quý khách trong vòng 24 giờ
            tới.
          </p>
        </div>

        {/* Card: Chi tiết yêu cầu */}
        <div className="bg-white border border-slate-200/80 rounded-[3px] p-6 sm:p-8 w-full max-w-[540px] mx-auto text-left shadow-sm space-y-6">
          <h3 className="text-body-regular font-bold text-primary border-b border-slate-100 pb-3 uppercase tracking-wider">
            Chi tiết yêu cầu của Quý khách
          </h3>

          <div className="divide-y divide-slate-100 text-caption-responsive">
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-400 font-medium">Mã số yêu cầu</span>
              <span className="font-bold text-slate-850 font-mono">{submittedRfq.code}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-400 font-medium">Doanh nghiệp</span>
              <span
                className="font-bold text-slate-850 text-right max-w-[240px] truncate"
                title={submittedRfq.company}
              >
                {submittedRfq.company}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-400 font-medium">Ngành nghề</span>
              <span className="font-bold text-slate-850">{submittedRfq.industry}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-400 font-medium">Sản phẩm quan tâm</span>
              <span
                className="font-bold text-slate-850 text-right max-w-[285px] truncate"
                title={submittedRfq.products}
              >
                {submittedRfq.products}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-400 font-medium">Thời gian tiếp nhận</span>
              <span className="font-bold text-slate-850">{submittedRfq.time}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-400 font-medium">Trạng thái</span>
              <span className="font-bold text-emerald-650 bg-emerald-50 px-2.5 py-0.5 rounded text-caption-responsive uppercase tracking-wide">
                {submittedRfq.status}
              </span>
            </div>
          </div>

          {/* Info note */}
          <div className="bg-blue-50/50 text-brand-strong p-3 rounded-[3px] text-caption-responsive font-semibold flex items-start gap-2 border border-blue-100/35">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Một bản sao chi tiết yêu cầu báo giá đã được gửi tự động tới email liên hệ của bạn.
            </p>
          </div>
        </div>

        {/* Action Button: Tạo yêu cầu mới */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => {
              setShowSuccess(false);
              setCreatedRfqId(null);
              setSubmittedRfq(null);
            }}
            className="inline-flex items-center gap-1.5 rounded-[3px] bg-brand px-6 py-3 text-caption-responsive font-bold text-white hover:bg-brand/95 transition-all shadow hover:scale-[1.01]"
          >
            {t('createNew')}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Suggestion block: Có thể Quý khách quan tâm */}
        {meta?.products && meta.products.length > 0 && (
          <div className="w-full text-left pt-12 border-t border-slate-100 mt-12 space-y-6">
            <h3 className="text-card-title font-bold text-primary">
              Có thể Quý khách quan tâm
            </h3>

            {/* Suggested horizontal products grid */}
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
              {meta.products.slice(0, 4).map((product) => {
                const directusUrl = getDirectusUrl();
                const imageUrl = product.hero ? resolveImageUrl(product.hero) : null;
                const translatedName = getTranslatedName(product, locale);
                const unit = product.skus?.[0]?.unit || 'cái';

                return (
                  <Link
                    key={product.id}
                    href={`/solutions/${product.slug}`}
                    className="bg-white border border-slate-150 p-4 rounded-[3px] flex flex-col justify-between hover:shadow-md transition-all group"
                  >
                    <div className="space-y-2">
                      <div className="aspect-square bg-slate-50/60 rounded-[3px] flex items-center justify-center relative overflow-hidden">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={translatedName}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : (
                          <Package className="h-8 w-8 text-slate-200 group-hover:scale-105 transition-transform" />
                        )}
                      </div>
                      <h4 className="text-caption-responsive font-bold text-slate-800 line-clamp-2 leading-tight">
                        {translatedName}
                      </h4>
                    </div>
                    <div className="pt-3 border-t border-slate-50 mt-3 flex items-center justify-between">
                      <span className="text-caption-responsive text-slate-400 font-bold uppercase">{unit}</span>
                      <span className="text-caption-responsive font-bold text-blue-600 group-hover:underline">
                        Xem chi tiết &gt;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 text-left">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-caption-responsive text-muted-foreground"
      >
        <Link href="/" className="transition-colors hover:text-brand">
          {t('breadcrumbHome')}
        </Link>
        <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
        <span className="font-medium text-foreground">{t('breadcrumbRfq')}</span>
      </nav>

      {/* Page Header */}
      <div className="max-w-4xl">
        <p className="text-caption-responsive font-semibold uppercase tracking-[0.2em] text-brand">
          {t('subtitle')}
        </p>
        <h1 className="mt-1 sm:mt-2 text-body-regular sm:text-section-title font-bold tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="mt-2 sm:mt-3 text-caption-responsive sm:text-body-regular leading-relaxed text-muted-foreground max-w-3xl">
          {t('description')}
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-12 pt-2">
        {/* ════════ LEFT: Form ════════ */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6 lg:space-y-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Submit error */}
            {submitError && (
              <div className="rounded-[3px] border border-rose-100 p-3 text-body-regular text-rose-800 flex items-center gap-2 dark:border-rose-900/30">
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* ── Section 1: Business Info ── */}
            <div className="rounded-[3px] border border-border p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-5">
              <h3 className={sectionHeadCls}>{t('sectionBusiness')}</h3>

              {/* Company */}
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-body-regular font-medium text-foreground">
                  {t('companyLabel')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formCompany}
                  onChange={(e) => {
                    setFormCompany(e.target.value);
                    setFieldErrors((p) => ({ ...p, company: '' }));
                  }}
                  className={inputCls(fieldErrors.company)}
                  placeholder={t('companyPlaceholder')}
                />
                {fieldErrors.company && (
                  <span className="text-caption-responsive text-rose-500 font-medium">{fieldErrors.company}</span>
                )}
              </div>

              {/* Tax ID + Contact */}
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-body-regular font-medium text-foreground">{t('taxIdLabel')}</label>
                  <input
                    type="text"
                    value={formTaxId}
                    onChange={(e) => setFormTaxId(e.target.value)}
                    className={inputCls()}
                    placeholder={t('taxIdPlaceholder')}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-body-regular font-medium text-foreground">
                    {t('contactLabel')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formContact}
                    onChange={(e) => {
                      setFormContact(e.target.value);
                      setFieldErrors((p) => ({ ...p, contact: '' }));
                    }}
                    className={inputCls(fieldErrors.contact)}
                    placeholder={t('contactPlaceholder')}
                  />
                  {fieldErrors.contact && (
                    <span className="text-caption-responsive text-rose-500 font-medium">{fieldErrors.contact}</span>
                  )}
                </div>
              </div>

              {/* Phone + Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-body-regular font-medium text-foreground">
                    {t('phoneLabel')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => {
                      setFormPhone(e.target.value);
                      setFieldErrors((p) => ({ ...p, phone: '' }));
                    }}
                    className={inputCls(fieldErrors.phone)}
                    placeholder={t('phonePlaceholder')}
                  />
                  {fieldErrors.phone && (
                    <span className="text-caption-responsive text-rose-500 font-medium">{fieldErrors.phone}</span>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-body-regular font-medium text-foreground">{t('emailLabel')}</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => {
                      setFormEmail(e.target.value);
                      setFieldErrors((p) => ({ ...p, email: '' }));
                    }}
                    className={inputCls(fieldErrors.email)}
                    placeholder={t('emailPlaceholder')}
                  />
                  {fieldErrors.email && (
                    <span className="text-caption-responsive text-rose-500 font-medium">{fieldErrors.email}</span>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-body-regular font-medium text-foreground">{t('addressLabel')}</label>
                <input
                  type="text"
                  value={formAddress}
                  onChange={(e) => {
                    setFormAddress(e.target.value);
                    setFieldErrors((p) => ({ ...p, address: '' }));
                  }}
                  className={inputCls(fieldErrors.address)}
                  placeholder={t('addressPlaceholder')}
                />
                {fieldErrors.address && (
                  <span className="text-caption-responsive text-rose-500 font-medium">{fieldErrors.address}</span>
                )}
              </div>
            </div>

            {/* ── Section 2: Product Table ── */}
            <div className="rounded-[3px] border border-border p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-5">
              <div className="pb-2 sm:pb-3">
                <h3 className={sectionHeadCls}>{t('sectionProducts')}</h3>
              </div>

              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-border/60 rounded-[3px] space-y-4">
                  <p className="text-body-regular text-muted-foreground max-w-md">{t('emptyCart')}</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProductToEdit(null);
                        setSearchQuery('');
                        setSelectedSkuId(null);
                        setManualName('');
                        setManualSku('');
                        setManualSpec('');
                        setManualUnit('cái');
                        setManualQty(1);
                        setManualNote('');
                        setIsAddModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-[3px] bg-brand px-4 py-2 text-caption-responsive font-semibold text-white hover:bg-brand/95 transition-all shadow cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Thêm nhanh sản phẩm
                    </button>
                    <Link
                      href="/solutions/listProduct"
                      className="inline-flex items-center gap-1.5 rounded-[3px] border border-border px-4 py-2 text-caption-responsive font-semibold text-muted-foreground hover:bg-muted/30 transition-all shadow"
                    >
                      {t('viewProducts')}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* Mobile Product Card Stack */}
                  <div className="space-y-3 sm:hidden">
                    {cart.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-200/60 rounded-[3px] p-3 sm:p-4 space-y-2 sm:space-y-3 relative text-left"
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="absolute top-3 right-3 rounded-[3px] p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600 transition-all"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="pr-8">
                          <span className="text-caption-responsive text-muted-foreground font-mono block">
                            #{String(idx + 1).padStart(2, '0')}
                          </span>
                          <h4
                            className="font-bold text-foreground text-body-regular mt-0.5 leading-snug hover:text-brand cursor-pointer transition-colors"
                            onClick={() => {
                              setSelectedProductToEdit(idx);
                              setManualName(item.product_name || '');
                              setManualSku(item.sku === item.product_name ? '' : item.sku);
                              setManualSpec(item.spec || '');
                              setManualUnit(item.unit || 'cái');
                              setManualQty(item.quantity || 1);
                              setManualNote(item.note || '');
                              setSelectedSkuId(null);
                              setIsAddModalOpen(true);
                            }}
                          >
                            {item.product_name || item.sku}
                          </h4>
                          {item.sku && item.product_name && item.sku !== item.product_name && (
                            <span className="text-caption-responsive text-muted-foreground/70 font-mono mt-0.5 block">
                              SKU: {item.sku}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-200/40 text-caption-responsive">
                          <div>
                            <span className="text-muted-foreground block font-medium">
                              {t('colSpec')}
                            </span>
                            <span className="font-semibold text-slate-700 mt-0.5 block">
                              {item.spec || '-'}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block font-medium">
                              {t('colUnit')}
                            </span>
                            <span className="font-semibold text-slate-700 mt-0.5 block">
                              {item.unit || '-'}
                            </span>
                          </div>
                        </div>
                        <div className="pt-2 flex items-center justify-between border-t border-slate-200/40">
                          <span className="text-caption-responsive font-semibold text-foreground">
                            {t('colQuantity')}
                          </span>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity || ''}
                            onChange={(e) =>
                              handleUpdateCartField(
                                idx,
                                'quantity',
                                Math.max(1, parseInt(e.target.value) || 1)
                              )
                            }
                            className="w-24 rounded-[3px] border border-border/80 px-2.5 py-1 text-body-regular outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand font-semibold text-center bg-white"
                            placeholder="1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tablet/Desktop Table View */}
                  <div className="hidden sm:block overflow-x-auto rounded-[3px] border border-slate-200">
                    <table className="w-full border-collapse text-left text-body-regular min-w-[600px]">
                      <thead className="bg-slate-50 text-muted-foreground text-caption-responsive uppercase font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-2 sm:px-3 py-2.5 sm:py-3 w-12 text-center">{t('colIndex')}</th>
                          <th className="px-2 sm:px-3 py-2.5 sm:py-3">{t('colProductSku')}</th>
                          <th className="px-2 sm:px-3 py-2.5 sm:py-3 w-[160px]">{t('colSpec')}</th>
                          <th className="px-2 sm:px-3 py-2.5 sm:py-3 w-[90px]">{t('colUnit')}</th>
                          <th className="px-2 sm:px-3 py-2.5 sm:py-3 w-[130px]">{t('colQuantity')}</th>
                          <th className="px-2 sm:px-3 py-2.5 sm:py-3 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {cart.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-2 sm:px-3 py-3 sm:py-4 text-center text-caption-responsive text-muted-foreground font-mono">
                              {String(idx + 1).padStart(2, '0')}
                            </td>
                            <td className="px-2 sm:px-3 py-3 sm:py-4">
                              <span
                                className="font-bold text-foreground hover:text-brand cursor-pointer transition-colors block text-body-regular leading-snug"
                                onClick={() => {
                                  setSelectedProductToEdit(idx);
                                  setManualName(item.product_name || '');
                                  setManualSku(item.sku === item.product_name ? '' : item.sku);
                                  setManualSpec(item.spec || '');
                                  setManualUnit(item.unit || 'cái');
                                  setManualQty(item.quantity || 1);
                                  setManualNote(item.note || '');
                                  setSelectedSkuId(null);
                                  setIsAddModalOpen(true);
                                }}
                              >
                                {item.product_name || item.sku}
                              </span>
                              {item.sku && item.product_name && item.sku !== item.product_name && (
                                <span className="text-caption-responsive text-muted-foreground/60 font-mono mt-0.5 block">
                                  SKU: {item.sku}
                                </span>
                              )}
                            </td>
                            <td className="px-2 sm:px-3 py-3 sm:py-4 text-body-regular text-slate-600 font-medium">
                              {item.spec || '-'}
                            </td>
                            <td className="px-2 sm:px-3 py-3 sm:py-4 text-body-regular text-slate-700 font-medium">
                              {item.unit || '-'}
                            </td>
                            <td className="px-3 py-3 sm:py-4">
                              <span className="text-brand font-bold text-body-regular">
                                {(item.quantity || 1).toLocaleString('vi-VN')}
                              </span>
                            </td>
                            <td className="px-3 py-3 sm:py-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(idx)}
                                className="rounded-[3px] p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 transition-all"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Add product row link */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProductToEdit(null);
                      setSearchQuery('');
                      setSelectedSkuId(null);
                      setManualName('');
                      setManualSku('');
                      setManualSpec('');
                      setManualUnit('cái');
                      setManualQty(1);
                      setManualNote('');
                      setIsAddModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 text-brand font-semibold text-body-regular hover:text-brand/80 transition-colors cursor-pointer pt-1"
                  >
                    <Plus className="h-4 w-4" />
                    Thêm dòng sản phẩm / Mã hàng khác
                  </button>
                </>
              )}
            </div>

            {/* ── Section 3: Additional Requirements & Delivery ── */}
            <div className="rounded-[3px] border border-border p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-5">
              <h3 className={sectionHeadCls}>{t('sectionShipping')}</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Industry */}
                <div className="space-y-1.5">
                  <label className="text-body-regular font-medium text-foreground">
                    {t('industryLabel')}
                  </label>
                  <div className="relative">
                    <select
                      value={formIndustry}
                      onChange={(e) => {
                        setFormIndustry(e.target.value);
                        setFieldErrors((p) => ({ ...p, industry: '' }));
                      }}
                      className={selectCls(fieldErrors.industry)}
                    >
                      <option value="">{t('industryPlaceholder')}</option>
                      {meta?.industries.map((ind) => (
                        <option key={ind.slug} value={ind.slug}>
                          {ind.name}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rotate-90 pointer-events-none" />
                  </div>
                  {fieldErrors.industry && (
                    <span className="text-caption-responsive text-rose-500 font-medium">
                      {fieldErrors.industry}
                    </span>
                  )}
                </div>

                {/* Delivery Time */}
                <div className="space-y-1.5">
                  <label className="text-body-regular font-medium text-foreground">
                    {t('deliveryTimeLabel')}
                  </label>
                  <div className="relative">
                    <select
                      value={formDeliveryTime}
                      onChange={(e) => setFormDeliveryTime(e.target.value)}
                      className={selectCls()}
                    >
                      <option value="">{t('deliveryTimePlaceholder')}</option>
                      <option value="1-3d">1-3 ngày</option>
                      <option value="7d">Trong vòng 7 ngày</option>
                      <option value="15-30d">Trong vòng 15-30 ngày</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Payment Method */}
                <div className="space-y-1.5">
                  <label className="text-body-regular font-medium text-foreground">
                    {t('paymentMethodLabel')}
                  </label>
                  <div className="relative">
                    <select
                      value={formPaymentMethod}
                      onChange={(e) => setFormPaymentMethod(e.target.value)}
                      className={selectCls()}
                    >
                      <option value="">{t('paymentMethodPlaceholder')}</option>
                      <option value="tt">{t('paymentMethodOpt1')}</option>
                      <option value="lc">{t('paymentMethodOpt2')}</option>
                      <option value="cod">{t('paymentMethodOpt3')}</option>
                      <option value="other">{t('paymentMethodOpt4')}</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rotate-90 pointer-events-none" />
                  </div>
                </div>

                {/* Order Frequency */}
                <div className="space-y-1.5">
                  <label className="text-body-regular font-medium text-foreground">
                    {t('orderFrequencyLabel')}
                  </label>
                  <div className="relative">
                    <select
                      value={formOrderFrequency}
                      onChange={(e) => setFormOrderFrequency(e.target.value)}
                      className={selectCls()}
                    >
                      <option value="">{t('orderFrequencyPlaceholder')}</option>
                      <option value="weekly">{t('orderFrequencyOpt1')}</option>
                      <option value="monthly">{t('orderFrequencyOpt2')}</option>
                      <option value="quarterly">{t('orderFrequencyOpt3')}</option>
                      <option value="once">{t('orderFrequencyOpt4')}</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Special Request */}
              <div className="space-y-1.5">
                <label className="text-body-regular font-medium text-foreground">
                  {t('specialRequestLabel')}
                </label>
                <textarea
                  rows={3}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder={t('specialRequestPlaceholder')}
                  className="w-full rounded-[3px] border border-border/80 px-3 py-2.5 text-body-regular outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand resize-none"
                />
              </div>
            </div>

            {/* ── Section 4: Technical Documents ── */}
            <div className="rounded-[3px] border border-border p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-4">
              <h3 className={sectionHeadCls}>Tài liệu kỹ thuật đính kèm</h3>

              {/* Drag & drop upload area */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-all",
                  dragActive
                    ? "border-[#0F62FE] bg-[#E0EDFF]"
                    : "border-[#DDE1E6] bg-[#F2F4F8] hover:border-[#0F62FE]/50 hover:bg-[#F2F4F8]/80"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                  <svg className="h-8 w-8 text-[#697077]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <p className="text-sm font-medium text-[#21272A]">
                    Kéo thả hoặc click để tải lên tệp tin của bạn
                  </p>
                  <p className="text-xs text-[#697077]">
                    Hỗ trợ định dạng PDF, DOCX, XLSX, PNG, JPG (Dung lượng tối đa: 10MB)
                  </p>
                </div>
              </div>

              {/* Uploaded files list */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white border border-[#DDE1E6] rounded-lg"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-lg bg-[#F2F4F8] flex items-center justify-center shrink-0">
                          <svg className="h-5 w-5 text-[#697077]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#21272A] truncate">{file.name}</p>
                          <p className="text-xs text-[#697077]">{(file.size / (1024 * 1024)).toFixed(1)} MB · Tải lên hoàn tất</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="text-rose-400 hover:text-rose-600 transition-colors cursor-pointer p-1 shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Actions ── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-border/80 px-5 py-3 text-body-regular font-semibold text-foreground hover:bg-muted/40 transition-all w-full sm:w-auto"
              >
                {draftSavedMsg ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {t('draftSaved')}
                  </>
                ) : (
                  t('saveDraft')
                )}
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-brand px-6 py-3 text-body-regular font-semibold text-white shadow hover:bg-brand/90 transition-all disabled:opacity-50 w-full sm:w-auto"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? t('submitting') : t('submitRfq')}
              </button>
            </div>
          </form>
        </div>

        {/* ════════ RIGHT: Sidebar ════════ */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-4 sm:space-y-6">
            {/* Why ULink */}
            <div className="rounded-[3px] border border-border p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-5">
              <h3 className="text-card-title font-bold text-foreground">{t('sidebarWhyTitle')}</h3>

              {[
                {
                  icon: Shield,
                  titleKey: 'sidebarBenefit1Title' as const,
                  descKey: 'sidebarBenefit1Desc' as const,
                  color: 'text-orange-500'
                },
                {
                  icon: Headphones,
                  titleKey: 'sidebarBenefit2Title' as const,
                  descKey: 'sidebarBenefit2Desc' as const,
                  color: 'text-blue-500'
                },
                {
                  icon: Truck,
                  titleKey: 'sidebarBenefit3Title' as const,
                  descKey: 'sidebarBenefit3Desc' as const,
                  color: 'text-emerald-500'
                },
                {
                  icon: Award,
                  titleKey: 'sidebarBenefit4Title' as const,
                  descKey: 'sidebarBenefit4Desc' as const,
                  color: 'text-purple-500'
                }
              ].map(({ icon: Icon, titleKey, descKey, color }, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className={cn('mt-0.5 shrink-0', color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-body-regular font-semibold text-foreground">{t(titleKey)}</p>
                    <p className="text-caption-responsive text-muted-foreground leading-relaxed mt-0.5">
                      {t(descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RFQ Process */}
            <div className="rounded-[3px] border border-border p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-4">
              <h3 className="text-card-title font-bold text-foreground">{t('sidebarProcessTitle')}</h3>

              <div className="space-y-3">
                {[
                  { step: 1, key: 'sidebarStep1' as const, color: 'bg-brand text-white' },
                  { step: 2, key: 'sidebarStep2' as const, color: 'bg-blue-500 text-white' },
                  { step: 3, key: 'sidebarStep3' as const, color: 'bg-emerald-500 text-white' },
                  { step: 4, key: 'sidebarStep4' as const, color: 'bg-orange-500 text-white' }
                ].map(({ step, key, color }) => (
                  <div key={step} className="flex items-start gap-3">
                    <div
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-caption-responsive font-bold',
                        color
                      )}
                    >
                      {step}
                    </div>
                    <p className="text-body-regular text-foreground leading-relaxed pt-0.5">{t(key)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgent Support */}
            <div className="rounded-[3px] border border-border p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-4">
              <h3 className="text-card-title font-bold text-foreground">{t('sidebarUrgentTitle')}</h3>
              <p className="text-caption-responsive text-muted-foreground leading-relaxed">
                {t('sidebarUrgentDesc')}
              </p>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-caption-responsive text-muted-foreground">Hotline:</span>
                  <a
                    href={`tel:${t('sidebarHotline').replace(/\s/g, '')}`}
                    className="text-card-title font-bold text-brand hover:underline"
                  >
                    {t('sidebarHotline')}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-caption-responsive text-muted-foreground">Email:</span>
                  <a
                    href={`mailto:${t('sidebarEmail')}`}
                    className="text-body-regular font-medium text-brand hover:underline"
                  >
                    {t('sidebarEmail')}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPhoneModalOpen(true)}
                className="flex items-center justify-center gap-2 w-full rounded-[3px] bg-blue-600 px-4 py-2.5 text-body-regular font-semibold text-white hover:bg-blue-700 transition-all cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                {t('sidebarCtaCall')}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4">
          {/* Outer blue wrapper — Figma: 5px padding, bg #1769E2, rounded 16px */}
          <div className="bg-[#1769E2] rounded-2xl p-[5px] w-full max-w-sm sm:max-w-[720px] max-h-[95vh] sm:max-h-[90vh] animate-in fade-in zoom-in-95 duration-250">
            {/* Inner modal card — Figma: bg #FFF, rounded 12px, shadow */}
            <div className="bg-white rounded-xl shadow-[0px_12px_24px_-2px_rgba(0,0,0,0.1)] border border-[#DDE1E6] flex flex-col max-h-[calc(95vh-10px)] sm:max-h-[calc(90vh-10px)] text-slate-800">

              {/* Header — Figma: padding 20px 24px, border-bottom #F2F4F8 */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[#F2F4F8]">
                <h3 className="text-base sm:text-lg font-semibold text-[#001D6C]">
                  {selectedProductToEdit !== null ? 'Chỉnh sửa sản phẩm báo giá' : 'Thêm sản phẩm vào danh sách báo giá'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Scrollable Content — Figma: padding 24px, gap 24px */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 scrollbar-thin">

                {/* Search input (only if not editing) */}
                {selectedProductToEdit === null && (
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Tìm kiếm găng tay, khăn lau, túi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-md border-[1.5px] border-[#0F62FE] pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-1 focus:ring-[#0F62FE] font-normal text-[#21272A] placeholder:text-[#21272A]/60"
                      />
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#21272A]/50">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-xs text-[#697077] font-normal">
                      Hoặc nhập thông tin sản phẩm thủ công bên dưới nếu không tìm thấy
                    </p>
                  </div>
                )}

                {/* Searched Product List (only if not editing) — Figma: gap 8px */}
                {selectedProductToEdit === null && filteredSkus.length > 0 && (
                  <div className="space-y-2 max-h-[150px] sm:max-h-[240px] overflow-y-auto pr-1">
                    {filteredSkus.map((sku) => {
                      const isSelected = selectedSkuId === sku.id;
                      const priceRange = getSkuPriceRange(sku.sku_code, sku.unit);

                      return (
                        <div
                          key={sku.id}
                          onClick={() => {
                            setQtyModalSku(sku);
                            // Compute MOQ from sku hash
                            let h = 0;
                            for (let i = 0; i < sku.sku_code.length; i++) h = sku.sku_code.charCodeAt(i) + ((h << 5) - h);
                            const moqVal = Math.abs(h % 10) * 100 + 500;
                            setQtyModalValue(moqVal);
                            setQtyModalUnit(sku.unit || 'cái');
                            setIsQtyModalOpen(true);
                          }}
                          className={cn(
                            "flex items-center justify-between p-3 bg-white border rounded-lg cursor-pointer transition-all hover:border-[#0F62FE] hover:shadow-sm gap-4",
                            isSelected ? "border-[#0F62FE] border-[1.5px] bg-[#F2F4F8]" : "border-[#DDE1E6]"
                          )}
                        >
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            {/* Thumbnail — Figma: 48x48, rounded 4px */}
                            <div className="h-10 sm:h-12 w-10 sm:w-12 bg-slate-50 border border-slate-200 rounded flex items-center justify-center text-slate-400 font-mono text-xs uppercase font-bold shrink-0 relative overflow-hidden">
                              {sku.hero ? (
                                <Image
                                  src={resolveImageUrl(sku.hero) || '/images/banners/login-hero.webp'}
                                  alt={sku.product_name || ""}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              ) : (
                                sku.sku_code.slice(0, 3)
                              )}
                            </div>
                            <div className="text-left min-w-0 flex-1 space-y-0.5">
                              <h4 className="text-sm font-semibold text-[#001D6C] leading-tight line-clamp-1">
                                {sku.product_name}
                              </h4>
                              <p className="text-xs text-[#697077] font-normal truncate">
                                SKU: {sku.sku_code}{sku.pack_size ? ` · Quy cách: ${sku.pack_size}` : ''} · MOQ: {(() => { let h = 0; for (let i = 0; i < sku.sku_code.length; i++) h = sku.sku_code.charCodeAt(i) + ((h << 5) - h); return (Math.abs(h % 10) * 100 + 500).toLocaleString('vi-VN'); })()} {sku.unit}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                            <span className={cn(
                              "text-sm font-semibold text-right hidden sm:inline",
                              isSelected ? "text-[#0F62FE]" : "text-[#21272A]"
                            )}>
                              {priceRange}
                            </span>
                            {/* Radio circle — Figma: 20x20 rounded full */}
                            <div className={cn(
                              "h-5 w-5 rounded-full border flex items-center justify-center transition-all shrink-0",
                              isSelected ? "border-[#0F62FE] bg-[#0F62FE] text-white" : "border-[#C1C7CD] bg-white"
                            )}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Divider — Figma: line + text + line, gap 16px */}
                {selectedProductToEdit === null && (
                  <div className="relative flex items-center gap-4">
                    <div className="flex-grow border-t border-[#DDE1E6]"></div>
                    <span className="text-xs text-[#697077] font-normal whitespace-nowrap">
                      Hoặc nhập thủ công
                    </span>
                    <div className="flex-grow border-t border-[#DDE1E6]"></div>
                  </div>
                )}

                {/* Form fields — Figma: gap 16px, labels 14px medium, inputs rounded-md border #DDE1E6 */}
                <div className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 relative" ref={nameDropdownRef}>
                      <label className="text-sm font-medium text-[#21272A] flex items-center gap-0.5">
                        Tên sản phẩm <span className="text-[#FF3B30]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Gõ để tìm sản phẩm..."
                        value={manualName}
                        onChange={(e) => {
                          setManualName(e.target.value);
                          setShowNameDropdown(true);
                        }}
                        onFocus={() => { if (manualName.trim()) setShowNameDropdown(true); }}
                        autoComplete="off"
                        className="w-full rounded-md border border-[#DDE1E6] px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] font-normal text-[#21272A] placeholder:text-[#A2A9B0]"
                      />
                      {/* Autocomplete dropdown */}
                      {showNameDropdown && nameFilteredSkus.length > 0 && (
                        <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white border border-[#DDE1E6] rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
                          {nameFilteredSkus.map((sku) => (
                            <button
                              key={sku.id}
                              type="button"
                              onClick={() => {
                                setManualName(sku.product_name || sku.sku_code);
                                setManualSku(sku.sku_code);
                                setManualSpec(sku.pack_size || '');
                                setManualUnit(sku.unit || 'cái');
                                setShowNameDropdown(false);
                              }}
                              className="w-full text-left px-4 py-2.5 hover:bg-[#F2F4F8] transition-colors flex items-center gap-3 border-b border-[#F2F4F8] last:border-b-0 cursor-pointer"
                            >
                              <div className="h-8 w-8 bg-slate-50 border border-slate-200 rounded flex items-center justify-center shrink-0 relative overflow-hidden">
                                {sku.hero ? (
                                  <Image
                                    src={resolveImageUrl(sku.hero) || '/images/banners/login-hero.webp'}
                                    alt={sku.product_name || ''}
                                    fill
                                    className="object-cover"
                                    sizes="32px"
                                  />
                                ) : (
                                  <span className="text-[10px] font-bold text-slate-400 uppercase">{sku.sku_code.slice(0, 3)}</span>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-[#001D6C] truncate">{sku.product_name}</p>
                                <p className="text-xs text-[#697077] truncate">SKU: {sku.sku_code}{sku.pack_size ? ` · ${sku.pack_size}` : ''} · {sku.unit}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#21272A]">
                        Mã SKU (nếu có)
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: UL-NG-1001"
                        value={manualSku}
                        onChange={(e) => setManualSku(e.target.value)}
                        className="w-full rounded-md border border-[#DDE1E6] px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] font-normal text-[#21272A] placeholder:text-[#A2A9B0]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#21272A]">
                      Quy cách / Thông số kỹ thuật
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Size L, Màu xanh dương, hộp 100 chiếc"
                      value={manualSpec}
                      onChange={(e) => setManualSpec(e.target.value)}
                      className="w-full rounded-md border border-[#DDE1E6] px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] font-normal text-[#21272A] placeholder:text-[#A2A9B0]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#21272A]">
                        Đơn vị tính
                      </label>
                      <select
                        value={manualUnit}
                        onChange={(e) => setManualUnit(e.target.value)}
                        className="w-full rounded-md border border-[#DDE1E6] px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] font-normal text-[#21272A] bg-white appearance-none"
                      >
                        <option value="cái">Cái</option>
                        <option value="đôi">Đôi</option>
                        <option value="cuộn">Cuộn</option>
                        <option value="hộp">Hộp</option>
                        <option value="thùng">Thùng</option>
                        <option value="gói">Gói</option>
                        <option value="mét">Mét</option>
                        <option value="kg">Kg</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#21272A] flex items-center gap-0.5">
                        Số lượng yêu cầu <span className="text-[#FF3B30]">*</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        required
                        placeholder="Nhập số lượng"
                        value={manualQty || ''}
                        onChange={(e) => setManualQty(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full rounded-md border border-[#DDE1E6] px-4 py-2.5 text-sm outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] font-normal text-[#21272A] placeholder:text-[#A2A9B0]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#21272A]">
                      Ghi chú yêu cầu đặc biệt
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Yêu cầu đóng gói riêng biệt 50 hộp/thùng carton..."
                      value={manualNote}
                      onChange={(e) => setManualNote(e.target.value)}
                      className="w-full rounded-md border border-[#DDE1E6] px-4 py-4 text-sm outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] resize-none font-normal text-[#21272A] placeholder:text-[#A2A9B0]"
                    />
                  </div>
                </div>

              </div>

              {/* Footer — Figma: padding 16px 24px, border-top #F2F4F8, gap 12px */}
              <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-[#F2F4F8]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 sm:px-6 py-2.5 rounded-md border-[1.5px] border-[#0F62FE] bg-white text-sm font-semibold text-[#0F62FE] hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  {selectedProductToEdit !== null ? 'Hủy' : 'Sửa'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!manualName.trim()) {
                      alert('Vui lòng nhập tên sản phẩm.');
                      return;
                    }
                    const itemToSave: CartItem = {
                      sku: manualSku.trim() || manualName.trim(),
                      product_name: manualName.trim(),
                      spec: manualSpec.trim(),
                      unit: manualUnit,
                      quantity: manualQty || 1,
                      note: manualNote.trim()
                    };

                    const newCart = [...cart];
                    if (selectedProductToEdit !== null) {
                      newCart[selectedProductToEdit] = itemToSave;
                    } else {
                      newCart.push(itemToSave);
                    }
                    saveCart(newCart);
                    setIsAddModalOpen(false);
                  }}
                  className="px-5 sm:px-6 py-2.5 rounded-md bg-[#0F62FE] text-white text-sm font-semibold shadow hover:bg-[#0353E9] transition-all cursor-pointer"
                >
                  {selectedProductToEdit !== null ? 'Cập nhật' : 'Lưu'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
      {/* Quantity Modal — Figma: popup-quantity */}
      {isQtyModalOpen && qtyModalSku && (() => {
        const sku = qtyModalSku;
        const priceRange = getSkuPriceRange(sku.sku_code, sku.unit);
        // Derive MOQ & price tiers from hash
        let hash = 0;
        for (let i = 0; i < sku.sku_code.length; i++) hash = sku.sku_code.charCodeAt(i) + ((hash << 5) - hash);
        const moq = Math.abs(hash % 10) * 100 + 500;
        const basePrice = Math.abs(hash % 150) * 1000 + 15000;
        const tier1Hi = moq + 499;
        const tier2Lo = tier1Hi + 1;
        const tier2Hi = tier2Lo + 3999;
        const tier3Lo = tier2Hi + 1;
        const price1 = basePrice;
        const price2 = Math.round(basePrice * 0.92);
        const unitCap = (sku.unit || 'cái').charAt(0).toUpperCase() + (sku.unit || 'cái').slice(1);

        return (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4">
            <div className="bg-[#1769E2] rounded-2xl p-[5px] pb-2.5 w-full max-w-[480px] animate-in fade-in zoom-in-95 duration-250">
              <div className="bg-white rounded-xl shadow-[0px_12px_24px_-2px_rgba(0,0,0,0.1)] border border-[#DDE1E6] flex flex-col text-slate-800">

                {/* Header */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-[#F2F4F8]">
                  <h3 className="text-base sm:text-lg font-semibold text-[#001D6C]">Nhập số lượng đặt hàng</h3>
                  <button type="button" onClick={() => setIsQtyModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1">
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 space-y-5">
                  {/* Product summary */}
                  <div className="bg-[#F2F4F8] rounded-lg p-4 space-y-1">
                    <p className="text-sm font-semibold text-[#001D6C]">{sku.product_name}</p>
                    <p className="text-xs text-[#697077]">SKU: {sku.sku_code} · Đơn vị tính cơ bản: {unitCap}</p>
                  </div>

                  {/* Quantity input row */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#21272A] flex items-center gap-0.5">
                      Số lượng yêu cầu <span className="text-[#FF3B30]">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {/* Stepper */}
                      <div className="flex items-center flex-1 border border-[#DDE1E6] rounded-lg overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => setQtyModalValue(Math.max(moq, qtyModalValue - 1))}
                          className="w-11 h-11 flex items-center justify-center bg-[#F2F4F8] border-r border-[#DDE1E6] text-lg font-semibold text-[#21272A] hover:bg-slate-200 transition-colors cursor-pointer select-none"
                        >—</button>
                        <input
                          type="text"
                          value={qtyModalValue.toLocaleString('vi-VN')}
                          onChange={(e) => {
                            const v = parseInt(e.target.value.replace(/\./g, '')) || moq;
                            setQtyModalValue(Math.max(moq, v));
                          }}
                          className="flex-1 text-center py-2.5 text-base font-semibold text-[#21272A] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setQtyModalValue(qtyModalValue + 1)}
                          className="w-11 h-11 flex items-center justify-center bg-[#F2F4F8] border-l border-[#DDE1E6] text-lg font-semibold text-[#21272A] hover:bg-slate-200 transition-colors cursor-pointer select-none"
                        >+</button>
                      </div>
                      {/* Unit dropdown */}
                      <select
                        value={qtyModalUnit}
                        onChange={(e) => setQtyModalUnit(e.target.value)}
                        className="w-[120px] h-11 rounded-md border border-[#DDE1E6] px-4 text-sm font-medium text-[#21272A] bg-white outline-none focus:border-[#0F62FE] appearance-none cursor-pointer"
                      >
                        <option value="cái">Cái</option>
                        <option value="đôi">Đôi</option>
                        <option value="cuộn">Cuộn</option>
                        <option value="hộp">Hộp</option>
                        <option value="thùng">Thùng</option>
                        <option value="gói">Gói</option>
                        <option value="mét">Mét</option>
                        <option value="kg">Kg</option>
                      </select>
                    </div>
                  </div>

                  {/* MOQ info box */}
                  <div className="bg-[#E0EDFF] border border-[#0F62FE] rounded-lg p-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE] shrink-0"></span>
                      <p className="text-[13px] font-semibold text-[#001D6C]">Số lượng tối thiểu (MOQ): {moq.toLocaleString('vi-VN')} {unitCap}</p>
                    </div>
                    <p className="text-xs text-[#001D6C] pl-3.5">* Đơn giá ưu đãi tốt nhất áp dụng tự động cho các đơn hàng từ {tier2Lo.toLocaleString('vi-VN')} {unitCap} trở lên.</p>
                  </div>

                  {/* Price tier table */}
                  {(() => {
                    const activeTier = qtyModalValue >= tier3Lo ? 3 : qtyModalValue >= tier2Lo ? 2 : 1;
                    const activeRow = "flex justify-between items-center px-4 py-3 bg-[#F2F4F8] border-y border-[#0F62FE] transition-all";
                    const normalRow = "flex justify-between px-4 py-3 border-b border-[#F2F4F8] last:border-b-0 transition-all";
                    return (
                      <div className="border border-[#DDE1E6] rounded-lg overflow-hidden">
                        <div className="flex justify-between px-4 py-2.5 bg-[#F2F4F8]">
                          <span className="text-xs font-semibold text-[#697077]">Số lượng đặt</span>
                          <span className="text-xs font-semibold text-[#697077]">Đơn giá ước tính</span>
                        </div>
                        {/* Row 1 */}
                        <div className={activeTier === 1 ? activeRow : normalRow}>
                          <div className="flex items-center gap-2">
                            <span className={`text-[13px] ${activeTier === 1 ? 'font-semibold text-[#0F62FE]' : 'text-[#697077]'}`}>
                              {moq.toLocaleString('vi-VN')} - {tier1Hi.toLocaleString('vi-VN')} {unitCap}
                            </span>
                            {activeTier === 1 && <span className="bg-[#0F62FE] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">Hiện tại</span>}
                          </div>
                          <span className={`text-[13px] ${activeTier === 1 ? 'font-semibold text-[#0F62FE]' : 'text-[#21272A]'}`}>
                            {price1.toLocaleString('vi-VN')}đ/{unitCap}
                          </span>
                        </div>
                        {/* Row 2 */}
                        <div className={activeTier === 2 ? activeRow : normalRow}>
                          <div className="flex items-center gap-2">
                            <span className={`text-[13px] ${activeTier === 2 ? 'font-semibold text-[#0F62FE]' : 'text-[#697077]'}`}>
                              {tier2Lo.toLocaleString('vi-VN')} - {tier2Hi.toLocaleString('vi-VN')} {unitCap}
                            </span>
                            {activeTier === 2 && <span className="bg-[#0F62FE] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">Hiện tại</span>}
                          </div>
                          <span className={`text-[13px] ${activeTier === 2 ? 'font-semibold text-[#0F62FE]' : 'text-[#21272A]'}`}>
                            {price2.toLocaleString('vi-VN')}đ/{unitCap}
                          </span>
                        </div>
                        {/* Row 3 */}
                        <div className={activeTier === 3 ? activeRow : normalRow}>
                          <div className="flex items-center gap-2">
                            <span className={`text-[13px] ${activeTier === 3 ? 'font-semibold text-[#0F62FE]' : 'text-[#697077]'}`}>
                              Trên {tier3Lo.toLocaleString('vi-VN')} {unitCap}
                            </span>
                            {activeTier === 3 && <span className="bg-[#0F62FE] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">Hiện tại</span>}
                          </div>
                          <span className={`text-[13px] ${activeTier === 3 ? 'font-semibold text-[#0F62FE]' : 'font-medium text-[#0F62FE]'}`}>
                            {activeTier === 3 ? 'Liên hệ hỗ trợ' : 'Liên hệ hỗ trợ'}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-5 sm:px-6 py-3 sm:py-4 border-t border-[#F2F4F8]">
                  <button
                    type="button"
                    onClick={() => setIsQtyModalOpen(false)}
                    className="px-6 py-2.5 rounded-md border-[1.5px] border-[#2E408F] bg-white text-sm font-semibold text-[#2E408F] hover:bg-blue-50 transition-colors cursor-pointer"
                  >Sửa</button>
                  <button
                    type="button"
                    onClick={() => {
                      const itemToSave: CartItem = {
                        sku: sku.sku_code,
                        product_name: sku.product_name || sku.sku_code,
                        spec: sku.pack_size || '',
                        unit: qtyModalUnit,
                        quantity: qtyModalValue,
                        note: ''
                      };
                      const newCart = [...cart];
                      newCart.push(itemToSave);
                      saveCart(newCart);
                      setIsQtyModalOpen(false);
                      setIsAddModalOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-md bg-[#1769E2] text-white text-sm font-semibold shadow hover:bg-[#0353E9] transition-all cursor-pointer"
                  >Lưu</button>
                </div>

              </div>
            </div>
          </div>
        );
      })()}
      {/* Hotline Phone Modal */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[3px] shadow-2xl border border-slate-200 w-full max-w-[420px] p-6 text-center text-slate-800 animate-in zoom-in-95 duration-200 relative">

            <button
              type="button"
              onClick={() => setIsPhoneModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 border border-rose-100 mb-4 animate-bounce">
              <Phone className="h-6 w-6 text-rose-600" />
            </div>

            <h3 className="text-card-title font-bold text-slate-900 mb-2">
              Hotline Hỗ Trợ 24/7
            </h3>

            <p className="text-caption-responsive text-slate-400 font-medium leading-relaxed mb-6">
              Đội ngũ chuyên viên tư vấn của ULink Industries luôn sẵn sàng phục vụ Quý khách hàng doanh nghiệp.
            </p>

            <div className="bg-slate-50 border border-slate-100 rounded-[3px] p-4 mb-6">
              <a
                href={`tel:${t('sidebarHotline').replace(/\s/g, '')}`}
                className="text-section-title font-black text-brand tracking-tight hover:underline block"
              >
                {t('sidebarHotline')}
              </a>
              <span className="text-caption-responsive text-slate-400 uppercase tracking-widest font-bold mt-1 block">
                Bấm số trên để thực hiện cuộc gọi
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(t('sidebarHotline'));
                  alert('Đã sao chép số điện thoại Hotline vào bộ nhớ tạm.');
                }}
                className="flex-1 py-2.5 rounded-[3px] border border-slate-200 bg-white text-caption-responsive font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
              >
                Sao chép số
              </button>
              <a
                href={`tel:${t('sidebarHotline').replace(/\s/g, '')}`}
                className="flex-1 py-2.5 rounded-[3px] bg-blue-600 text-white text-caption-responsive font-bold shadow hover:bg-blue-700 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5" />
                Gọi ngay
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

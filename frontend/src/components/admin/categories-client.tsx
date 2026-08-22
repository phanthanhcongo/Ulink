'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useTransition, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Plus, Search, FolderTree, AlertTriangle, Edit, Trash, Folder, X, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConfirmModal } from './confirm-modal';
import { saveCategory, deleteCategory } from '@/app/[locale]/admin/categories/actions';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  parent?: { id: number; name: string } | null;
  status: 'published' | 'draft' | 'archived';
}

interface CategoriesClientProps {
  initialCategories: Category[];
  error?: string;
}

export function CategoriesClient({ initialCategories, error }: CategoriesClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Partial<Category> | null>(null);
  const [formError, setFormError] = useState('');
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    type?: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    message: '',
    onConfirm: () => {}
  });

  // Tree collapse states
  const [collapsedIds, setCollapsedIds] = useState<Record<number, boolean>>({});

  const toggleCollapse = (id: number) => {
    setCollapsedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const hasChildren = (id: number) => {
    return categories.some((c) => {
      const pId = c.parent && typeof c.parent === 'object' ? c.parent.id : c.parent;
      return pId === id;
    });
  };

  // Helper to build hierarchy
  const buildHierarchicalList = React.useCallback((
    flatList: Category[],
    parentId: number | null = null,
    level = 0
  ): Array<Category & { level: number }> => {
    const result: Array<Category & { level: number }> = [];
    const children = flatList.filter((cat) => {
      const pId = cat.parent && typeof cat.parent === 'object' ? cat.parent.id : cat.parent;
      if (parentId === null) {
        return !pId;
      }
      return pId === parentId;
    });

    children.sort((a, b) => a.name.localeCompare(b.name));

    for (const child of children) {
      result.push({ ...child, level });
      const grandChildren = buildHierarchicalList(flatList, child.id, level + 1);
      result.push(...grandChildren);
    }
    return result;
  }, []);

  // Helper to check if any ancestor is collapsed
  const isCategoryHidden = React.useCallback((
    cat: Category,
    flatList: Category[]
  ): boolean => {
    let current = cat;
    while (current.parent) {
      const parentId = typeof current.parent === 'object' ? current.parent.id : Number(current.parent);
      if (collapsedIds[parentId]) {
        return true;
      }
      const parentObj = flatList.find((c) => c.id === parentId);
      if (!parentObj) break;
      current = parentObj;
    }
    return false;
  }, [collapsedIds]);

  // Filter and build tree
  const displayCategories = useMemo(() => {
    if (searchQuery.trim() !== '') {
      return categories
        .filter((cat) => {
          const q = searchQuery.toLowerCase();
          return (
            cat.name.toLowerCase().includes(q) ||
            cat.slug.toLowerCase().includes(q) ||
            (cat.description && cat.description.toLowerCase().includes(q))
          );
        })
        .map((cat) => ({ ...cat, level: 0 }));
    } else {
      const allHierarchical = buildHierarchicalList(categories);
      return allHierarchical.filter((cat) => !isCategoryHidden(cat, categories));
    }
  }, [categories, searchQuery, collapsedIds, buildHierarchicalList, isCategoryHidden]);

  // Handle Archive Category (Soft delete)
  const handleArchiveCategory = (id: number) => {
    setConfirmState({
      isOpen: true,
      title: 'Lưu trữ danh mục',
      message: 'Bạn có chắc chắn muốn lưu trữ danh mục này?',
      type: 'danger',
      onConfirm: () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteCategory(id);
          if (res.success) {
            setCategories((prev) => prev.filter((c) => c.id !== id));
            toast.success('Đã xóa danh mục thành công.');
          } else {
            toast.error('Không thể xóa danh mục: ' + res.error);
          }
        });
      }
    });
  };

  // Submit Create or Update Category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!activeCategory?.name || !activeCategory?.slug) {
      setFormError('Vui lòng điền tên danh mục và slug.');
      return;
    }

    startTransition(async () => {
      const res = await saveCategory({
        id: activeCategory.id,
        name: activeCategory.name!,
        slug: activeCategory.slug!,
        parent: activeCategory.parent?.id || null,
        description: activeCategory.description || undefined,
        status: activeCategory.status || 'published'
      });

      if (res.success) {
        setModalOpen(false);
        setActiveCategory(null);
        setFormError('');
        window.location.reload(); // Reload to fetch updated hierarchical data
      } else {
        setFormError(res.error || 'Không thể lưu danh mục. Vui lòng thử lại.');
      }
    });
  };

  return (
    <div className="admin-page">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <span className="text-xs uppercase text-slate-400 font-extrabold tracking-wider">
            Cơ cấu sản phẩm
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mt-1">
            Quản lý Danh mục
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
            Tạo và sắp xếp cấu trúc danh mục sản phẩm phòng sạch, chống tĩnh điện theo dạng cha-con.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveCategory({ status: 'published', parent: null });
            setModalOpen(true);
            setFormError('');
          }}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[3px] bg-blue-600 px-5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors shrink-0"
        >
          <Plus className="h-4 w-4" />
          Tạo danh mục mới
        </button>
      </div>

      {/* Error Alert Banner */}
      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-[3px] text-rose-800 text-xs sm:text-sm font-semibold flex items-start gap-2.5 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-extrabold text-rose-900 block mb-1">
              Đã xảy ra lỗi khi tải dữ liệu danh mục từ API
            </span>
            <pre className="font-mono text-[11px] bg-white/60 p-2.5 rounded-[3px] mt-2 overflow-x-auto border border-rose-100/50 max-h-40 whitespace-pre-wrap select-all">
              {error}
            </pre>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white border border-slate-100 rounded-[3px] p-5 shadow-sm mb-8">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm danh mục theo tên, slug, mô tả..."
            className="w-full pl-10 pr-4 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white border border-slate-100 rounded-[3px] shadow-sm overflow-hidden">
        {displayCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FolderTree className="h-12 w-12 text-slate-300 mb-3" />
            <span className="text-sm font-extrabold text-primary">
              Không tìm thấy danh mục nào
            </span>
            <span className="text-xs text-slate-400 mt-1">
              Thử thay đổi từ khóa tìm kiếm hoặc tạo một danh mục mới.
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-3">Tên Danh mục</th>
                  <th className="px-6 py-3">Đường dẫn (Slug)</th>
                  <th className="px-6 py-3">Mô tả</th>
                  <th className="px-6 py-3">Danh mục cha</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {displayCategories.map((cat) => {
                  const categoryHasChildren = hasChildren(cat.id);
                  const isCollapsed = collapsedIds[cat.id] ?? false;

                  return (
                    <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                      {/* Name with level indentation and collapse trigger */}
                      <td className="px-6 py-3.5 font-extrabold text-primary">
                        <div
                          className="flex items-center gap-1.5"
                          style={{ paddingLeft: `${cat.level * 20}px` }}
                        >
                          {categoryHasChildren ? (
                            <button
                              type="button"
                              onClick={() => toggleCollapse(cat.id)}
                              className="p-1 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-colors cursor-pointer shrink-0"
                            >
                              {isCollapsed ? (
                                <ChevronRight className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5" />
                              )}
                            </button>
                          ) : (
                            <span className="w-5.5 shrink-0" />
                          )}

                          {cat.level > 0 && (
                            <span className="text-slate-300 font-normal select-none shrink-0 mr-0.5">└─</span>
                          )}

                          <Folder className={cn(
                            "h-4 w-4 shrink-0",
                            cat.level === 0 ? "text-blue-500" : "text-sky-400"
                          )} />
                          <span className="truncate max-w-[200px]" title={cat.name}>{cat.name}</span>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-6 py-3.5 font-mono text-[11px] text-slate-500 select-all">
                        {cat.slug}
                      </td>

                      {/* Description */}
                      <td className="px-6 py-3.5 max-w-xs truncate text-slate-550">
                        {cat.description || '---'}
                      </td>

                      {/* Parent */}
                      <td className="px-6 py-3.5">
                        {cat.parent ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-[3px] bg-slate-100 text-[10px] font-bold text-slate-600">
                            {cat.parent.name}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Không có (Gốc)</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-3.5">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold',
                            cat.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700'
                              : cat.status === 'draft'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-rose-50 text-rose-700'
                          )}
                        >
                          {cat.status === 'published'
                            ? 'Đã xuất bản'
                            : cat.status === 'draft'
                              ? 'Bản thảo'
                              : 'Lưu trữ'}
                        </span>
                      </td>

                      {/* Actions with group-hover visibility */}
                      <td className="px-6 py-3.5 text-right">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-end gap-1.5">
                          {/* Add child */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveCategory({
                                status: 'published',
                                parent: { id: cat.id, name: cat.name }
                              });
                              setModalOpen(true);
                              setFormError('');
                            }}
                            className="p-1 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Thêm danh mục con"
                          >
                            <Plus className="h-4 w-4" />
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveCategory({
                                id: cat.id,
                                name: cat.name,
                                slug: cat.slug,
                                description: cat.description,
                                parent: cat.parent
                                  ? { id: cat.parent.id, name: cat.parent.name }
                                  : null,
                                status: cat.status
                              });
                              setModalOpen(true);
                              setFormError('');
                            }}
                            className="p-1 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-colors"
                            title="Sửa danh mục"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          {/* Delete/Archive */}
                          <button
                            type="button"
                            onClick={() => handleArchiveCategory(cat.id)}
                            className="p-1 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Lưu trữ (Xóa)"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Create or Edit Category */}
      {modalOpen && activeCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-[3px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-extrabold text-primary">
                {activeCategory.id ? 'Cập nhật danh mục' : 'Tạo danh mục mới'}
              </h2>
              <button
                onClick={() => {
                   setModalOpen(false);
                   setActiveCategory(null);
                   setFormError('');
                 }}
                className="p-1 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-[3px] text-xs font-bold text-rose-600 flex items-center gap-2 animate-in fade-in duration-200">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
              {/* Category Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Tên danh mục *</label>
                <input
                  type="text"
                  required
                  value={activeCategory.name || ''}
                  onChange={(e) => {
                    const name = e.target.value;
                    // Auto-slugify on create
                    const slug = activeCategory.id
                      ? activeCategory.slug || ''
                      : name
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)+/g, '');
                    setActiveCategory({ ...activeCategory, name, slug });
                  }}
                  placeholder="Ví dụ: Găng tay phòng sạch, Quần áo..."
                  className="px-3.5 py-2 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              {/* Slug */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Slug (Đường dẫn tĩnh) *
                </label>
                <input
                  type="text"
                  required
                  value={activeCategory.slug || ''}
                  readOnly
                  placeholder="Tự động tạo từ tên..."
                  className="px-3.5 py-2 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none bg-slate-50 cursor-not-allowed text-slate-450 select-none"
                />
              </div>

              {/* Parent Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Danh mục cha</label>
                <select
                  value={activeCategory.parent?.id || ''}
                  onChange={(e) => {
                    const id = e.target.value ? Number(e.target.value) : null;
                    const name = categories.find((c) => c.id === id)?.name || '';
                    setActiveCategory({
                      ...activeCategory,
                      parent: id ? { id, name } : null
                    });
                  }}
                  className="px-3.5 py-2 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                >
                  <option value="">Không có (Danh mục cấp cao nhất)</option>
                  {categories
                    .filter((c) => c.id !== activeCategory.id) // Cannot be parent of itself
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Mô tả ngắn</label>
                <textarea
                  rows={3}
                  value={activeCategory.description || ''}
                  onChange={(e) =>
                    setActiveCategory({ ...activeCategory, description: e.target.value })
                  }
                  placeholder="Mô tả sơ lược về danh mục sản phẩm này..."
                  className="px-3.5 py-2 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Trạng thái phát hành
                </label>
                <select
                  value={activeCategory.status || 'published'}
                  onChange={(e) =>
                    setActiveCategory({
                      ...activeCategory,
                      status: e.target.value as 'published' | 'draft' | 'archived'
                    })
                  }
                  className="px-3.5 py-2 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none bg-white"
                >
                  <option value="published">Đã xuất bản (Công khai)</option>
                  <option value="draft">Bản thảo (Nháp)</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 mt-4 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setFormError('');
                    setActiveCategory(null);
                  }}
                  className="px-4 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-[3px] bg-blue-600 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Đang lưu...' : 'Lưu danh mục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        type={confirmState.type}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}


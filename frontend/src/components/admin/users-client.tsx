'use client';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import React, { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import {
  Search,
  Users,
  Shield,
  Plus,
  Edit2,
  Trash2,
  Mail,
  User,
  ShieldAlert,
  Lock,
  X,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConfirmModal } from './confirm-modal';
import { saveUserAction, deleteUserAction } from '@/app/[locale]/admin/users/actions';

interface UserRole {
  id: string;
  name: string;
}

interface UserItem {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  status: 'active' | 'suspended' | 'invited' | 'draft';
  role?: UserRole | null;
}

interface UserFormState {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  roleId: string;
  status: UserItem['status'];
}

interface UsersClientProps {
  initialUsers: UserItem[];
  roles: UserRole[];
  error?: string;
}

export function UsersClient({ initialUsers, roles, error }: UsersClientProps) {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isPending, startTransition] = useTransition();

  // CRUD Form State
  const [formOpen, setFormOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<UserFormState | null>(null);
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

  // Filter users
  const filteredUsers = users.filter((u) => {
    const fullName = `${u.first_name || ''} ${u.last_name || ''}`.toLowerCase();
    const email = u.email.toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = fullName.includes(q) || email.includes(q);
    const matchesRole = roleFilter === 'all' || u.role?.id === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleOpenCreateForm = () => {
    setActiveUser({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      roleId: roles[0]?.id || '',
      status: 'active'
    });
    setFormOpen(true);
    setFormError('');
  };

  const handleOpenEditForm = (u: UserItem) => {
    setActiveUser({
      id: u.id,
      first_name: u.first_name || '',
      last_name: u.last_name || '',
      email: u.email,
      password: '', // Để trống mật khẩu khi sửa
      roleId: u.role?.id || '',
      status: u.status
    });
    setFormOpen(true);
    setFormError('');
  };

  const handleDeleteUser = (id: string) => {
    setConfirmState({
      isOpen: true,
      title: 'Xóa tài khoản người dùng',
      message: 'Bạn có chắc chắn muốn xóa tài khoản này không? Thao tác này không thể hoàn tác.',
      type: 'danger',
      onConfirm: () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteUserAction(id);
          if (res.success) {
            setUsers((prev) => prev.filter((u) => u.id !== id));
            toast.success('Đã xóa tài khoản người dùng thành công.');
          } else {
            toast.error('Không thể xóa tài khoản: ' + res.error);
          }
        });
      }
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUser) return;

    setFormError('');
    if (
      !activeUser.first_name ||
      !activeUser.last_name ||
      !activeUser.email ||
      !activeUser.roleId
    ) {
      setFormError('Vui lòng nhập đầy đủ các thông tin bắt buộc.');
      return;
    }

    if (!activeUser.id && !activeUser.password) {
      setFormError('Vui lòng nhập mật khẩu cho tài khoản mới.');
      return;
    }

    startTransition(async () => {
      const res = await saveUserAction({
        id: activeUser.id,
        first_name: activeUser.first_name,
        last_name: activeUser.last_name,
        email: activeUser.email,
        password: activeUser.password || undefined,
        roleId: activeUser.roleId,
        status: activeUser.status || 'active'
      });

      if (res.success) {
        setFormOpen(false);
        setActiveUser(null);
        setFormError('');
        window.location.reload();
      } else {
        setFormError(res.error || 'Thao tác thất bại. Vui lòng thử lại.');
      }
    });
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <span className="text-xs uppercase text-slate-400 font-extrabold tracking-wider">
            Hệ thống phân quyền & Bảo mật
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mt-1">
            Quản lý Tài khoản (Users)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
            Xem, tạo mới và phân quyền các nhóm tài khoản Administrator, Editor, Salesmen và Khách
            hàng B2B truy cập hệ thống.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateForm}
          className="inline-flex h-10 items-center justify-center gap-1.5 px-4 rounded-[3px] bg-blue-600 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors shrink-0 animate-fade-in"
        >
          <Plus className="h-4 w-4" />
          Thêm tài khoản mới
        </button>
      </div>

      {/* Error Alert Banner */}
      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-[3px] text-rose-800 text-xs sm:text-sm font-semibold flex items-start gap-2.5 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-extrabold text-rose-900 block mb-1">
              Đã xảy ra lỗi khi tải dữ liệu người dùng từ Directus API
            </span>
            <pre className="font-mono text-[11px] bg-white/60 p-2.5 rounded-[3px] mt-2 overflow-x-auto border border-rose-100/50 max-h-40 whitespace-pre-wrap select-all">
              {error}
            </pre>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white border border-slate-100 rounded-[3px] p-5 sm:p-6 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên người dùng, email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-[3px] border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none bg-white shadow-sm"
          >
            <option value="all">Tất cả vai trò</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User Table List */}
      <div className="bg-white border border-slate-100 rounded-[3px] shadow-sm overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="h-12 w-12 text-slate-300 mb-3" />
            <span className="text-sm font-extrabold text-primary">
              Không tìm thấy người dùng nào
            </span>
            <span className="text-xs text-slate-400 mt-1">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-2.5 sticky left-0 bg-slate-50 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">Họ và Tên</th>
                  <th className="px-4 py-2.5">Địa chỉ Email</th>
                  <th className="px-4 py-2.5">Vai trò (Role)</th>
                  <th className="px-4 py-2.5">Trạng thái</th>
                  <th className="px-4 py-2.5 text-right sticky right-0 bg-slate-50 z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.05)]">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {filteredUsers.map((u) => {
                  const roleName = u.role?.name || 'Chưa phân vai trò';
                  const roleLower = roleName.toLowerCase();
                  const isSystemAdmin = roleLower.includes('admin');
                  const isManager = roleLower.includes('manager') || roleLower.includes('sales') || roleLower.includes('editor');

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/30 transition-colors group">
                      {/* Name (Sticky) */}
                      <td className="px-4 py-3 sticky left-0 bg-white group-hover:bg-slate-50/80 transition-colors shadow-[2px_0_5px_rgba(0,0,0,0.03)] z-10">
                        <span className="font-extrabold text-primary leading-tight">
                          {`${u.first_name || ''} ${u.last_name || ''}`.trim() || 'No Name'}
                        </span>
                      </td>

                      {/* Email (Truncated) */}
                      <td className="px-4 py-3">
                        <span className="text-slate-650 font-medium max-w-[200px] truncate select-all block font-mono" title={u.email}>
                          {u.email}
                        </span>
                      </td>

                      {/* Role with Color coding */}
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold border shadow-xs select-none',
                            isSystemAdmin && 'bg-rose-50 text-rose-700 border-rose-100',
                            isManager && 'bg-amber-50 text-amber-700 border-amber-100',
                            !isSystemAdmin && !isManager && 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          )}
                        >
                          {roleName}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[10px] font-bold border shadow-sm select-none',
                            u.status === 'active' && 'bg-emerald-50 text-emerald-700 border-emerald-100',
                            u.status === 'suspended' && 'bg-rose-50 text-rose-750 border-rose-100',
                            u.status === 'invited' && 'bg-blue-50 text-blue-700 border-blue-100',
                            u.status === 'draft' && 'bg-slate-50 text-slate-600 border-slate-200'
                          )}
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-[3px] shrink-0',
                              u.status === 'active' && 'bg-emerald-500',
                              u.status === 'suspended' && 'bg-rose-500',
                              u.status === 'invited' && 'bg-blue-500 animate-pulse',
                              u.status === 'draft' && 'bg-slate-400'
                            )}
                          />
                          <span>
                            {u.status === 'active'
                              ? 'Hoạt động'
                              : u.status === 'suspended'
                                ? 'Đã khóa'
                                : u.status === 'invited'
                                  ? 'Đang mời'
                                  : 'Bản nháp'}
                          </span>
                        </span>
                      </td>

                      {/* Actions (Sticky) */}
                      <td className="px-4 py-3 text-right sticky right-0 bg-white group-hover:bg-slate-50/80 transition-colors shadow-[-2px_0_5px_rgba(0,0,0,0.03)] z-10">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditForm(u)}
                            className="p-1 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Sửa tài khoản"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1 rounded-[3px] hover:bg-slate-100 text-rose-500 hover:text-rose-700 transition-colors"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="h-4 w-4" />
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

      {/* Modal: Create or Edit User Form */}
      {formOpen && activeUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-lg bg-white rounded-[3px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-primary flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  {activeUser.id ? 'Cập nhật tài khoản' : 'Thêm tài khoản mới'}
                </h2>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  Thiết lập thông tin đăng nhập và phân quyền nhóm người dùng.
                </p>
              </div>
              <button
                onClick={() => {
                  setFormOpen(false);
                  setActiveUser(null);
                  setFormError('');
                }}
                className="p-1.5 rounded-[3px] hover:bg-slate-100 text-slate-400 hover:text-slate-655"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleFormSubmit} className="flex flex-col">
              <div className="p-6 flex flex-col gap-4 bg-white">
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-[3px] text-xs font-bold text-rose-600 flex items-center gap-2 animate-in fade-in duration-200">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">
                      Họ *
                    </label>
                    <input
                      type="text"
                      required
                      value={activeUser.first_name || ''}
                      onChange={(e) => setActiveUser({ ...activeUser, first_name: e.target.value })}
                      placeholder="Nguyễn"
                      className="px-3.5 py-2 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand shadow-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">
                      Tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={activeUser.last_name || ''}
                      onChange={(e) => setActiveUser({ ...activeUser, last_name: e.target.value })}
                      placeholder="Văn A"
                      className="px-3.5 py-2 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand shadow-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider flex items-center gap-1">
                    <Mail className="h-3 w-3 text-slate-400" />
                    Địa chỉ Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={activeUser.email || ''}
                    onChange={(e) => setActiveUser({ ...activeUser, email: e.target.value })}
                    placeholder="email@company.com"
                    className="px-3.5 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand shadow-sm"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider flex items-center gap-1">
                    <Lock className="h-3 w-3 text-slate-400" />
                    Mật khẩu {activeUser.id ? '(Tùy chọn)' : '*'}
                  </label>
                  <input
                    type="password"
                    required={!activeUser.id}
                    value={activeUser.password || ''}
                    onChange={(e) => setActiveUser({ ...activeUser, password: e.target.value })}
                    placeholder={
                      activeUser.id
                        ? 'Để trống nếu không muốn đổi mật khẩu...'
                        : 'Nhập mật khẩu an toàn...'
                    }
                    className="px-3.5 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand shadow-sm"
                  />
                </div>

                 {/* Role grid selector */}
                 <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider flex items-center gap-1.5">
                     <ShieldAlert className="h-3.5 w-3.5 text-slate-400" />
                     Vai trò hệ thống (Role) *
                   </label>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-0.5">
                     {roles.map((r) => {
                       const isSelected = activeUser.roleId === r.id;
                       return (
                         <div
                           key={r.id}
                           onClick={() => setActiveUser({ ...activeUser, roleId: r.id })}
                           className={cn(
                             'p-3.5 rounded-[3px] border-2 text-left cursor-pointer transition-all flex flex-col gap-1.5 select-none hover:border-blue-400 hover:bg-blue-50/10',
                             isSelected
                               ? 'border-blue-600 bg-blue-50/20 shadow-xs'
                               : 'border-slate-200 bg-white'
                           )}
                         >
                           <div className="flex items-center justify-between">
                             <span className="text-xs font-extrabold text-primary">
                               {r.name}
                             </span>
                             <span
                               className={cn(
                                 'h-3.5 w-3.5 rounded-[3px] border flex items-center justify-center shrink-0',
                                 isSelected
                                   ? 'border-blue-600 bg-blue-600'
                                   : 'border-slate-350 bg-white'
                               )}
                             >
                               {isSelected && <span className="h-1.5 w-1.5 rounded-[3px] bg-white" />}
                             </span>
                           </div>
                           <span className="text-[10px] text-slate-400 font-semibold leading-tight">
                             Cấp quyền quản trị viên thuộc nhóm {r.name.toLowerCase()}.
                           </span>
                         </div>
                       );
                     })}
                   </div>
                 </div>

                {/* Status dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">
                    Trạng thái tài khoản
                  </label>
                  <select
                    value={activeUser.status || 'active'}
                    onChange={(e) =>
                      setActiveUser({
                        ...activeUser,
                        status: e.target.value as UserItem['status']
                      })
                    }
                    className="px-3.5 py-2.5 rounded-[3px] border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none bg-white shadow-sm"
                  >
                    <option value="active">Hoạt động (Active)</option>
                    <option value="suspended">Khóa tài khoản (Suspended)</option>
                    <option value="invited">Chờ kích hoạt (Invited)</option>
                    <option value="draft">Bản nháp (Draft)</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => {
                    setFormOpen(false);
                    setActiveUser(null);
                  }}
                  className="px-5 py-2.5 rounded-[3px] border border-slate-200 text-xs sm:text-sm font-bold text-slate-550 hover:bg-slate-100 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-[3px] bg-blue-600 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isPending ? 'Đang lưu...' : 'Lưu tài khoản'}
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


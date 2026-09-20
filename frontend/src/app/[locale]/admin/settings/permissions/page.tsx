'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Shield, Check, X, Loader2, ChevronDown, ChevronRight, Settings2 } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  icon: string | null;
  description: string | null;
  admin_access: boolean;
}

interface Permission {
  id: number;
  role: string | null;
  collection: string;
  action: string;
  fields: string[] | null;
  permissions: Record<string, unknown> | null;
}

const ACTIONS = ['create', 'read', 'update', 'delete'] as const;
const ACTION_LABELS: Record<string, string> = {
  create: 'Tạo mới',
  read: 'Xem',
  update: 'Sửa',
  delete: 'Xóa',
};
const ADMIN_ROLE_ID = '78c7d3ca-5d25-487f-bd87-cf42e9edce13';

const FILTER_PRESETS = [
  { label: 'Không giới hạn', value: '{}', desc: 'Truy cập tất cả dữ liệu' },
  { label: 'Chỉ dữ liệu của mình', value: '{"user_created":{"_eq":"$CURRENT_USER"}}', desc: 'Chỉ xem/sửa dữ liệu do mình tạo' },
  { label: 'Chỉ dữ liệu đã xuất bản', value: '{"status":{"_eq":"published"}}', desc: 'Chỉ truy cập bản ghi có trạng thái "published"' },
  { label: 'Tuỳ chỉnh...', value: '__custom__', desc: 'Tự nhập điều kiện lọc nâng cao' },
];

// --- Detail Modal ---
function PermissionDetailModal({
  perm,
  collection,
  action,
  roleId,
  onClose,
  onSaved,
  onDeleted,
}: {
  perm: Permission | null;
  collection: string;
  action: string;
  roleId: string;
  onClose: () => void;
  onSaved: (p: Permission) => void;
  onDeleted: (id: number) => void;
}) {
  const [allFields, setAllFields] = useState(
    !perm?.fields || (perm.fields.length === 1 && perm.fields[0] === '*')
  );
  const [customFields, setCustomFields] = useState(
    perm?.fields && !(perm.fields.length === 1 && perm.fields[0] === '*')
      ? perm.fields.join(', ')
      : ''
  );

  const permJson = perm?.permissions ? JSON.stringify(perm.permissions) : '{}';
  const matchedPreset = FILTER_PRESETS.find((p) => p.value !== '__custom__' && p.value === permJson);
  const [filterPreset, setFilterPreset] = useState(matchedPreset ? matchedPreset.value : '__custom__');
  const [customFilter, setCustomFilter] = useState(
    perm?.permissions ? JSON.stringify(perm.permissions, null, 2) : '{}'
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');

    const parsedFields = allFields
      ? ['*']
      : customFields.split(',').map((f) => f.trim()).filter(Boolean);
    if (parsedFields.length === 0) parsedFields.push('*');

    let parsedFilter: Record<string, unknown> = {};
    const filterValue = filterPreset === '__custom__' ? customFilter : filterPreset;
    try {
      parsedFilter = JSON.parse(filterValue);
    } catch {
      setError('Điều kiện lọc không hợp lệ');
      setSaving(false);
      return;
    }

    try {
      if (perm) {
        const res = await fetch('/api/admin/permissions', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: perm.id, fields: parsedFields, permissions: parsedFilter }),
        });
        if (!res.ok) throw new Error('Cập nhật thất bại');
        onSaved({ ...perm, fields: parsedFields, permissions: parsedFilter });
      } else {
        const res = await fetch('/api/admin/permissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: roleId, collection, action, fields: parsedFields, permissions: parsedFilter }),
        });
        if (!res.ok) throw new Error('Tạo thất bại');
        const data = await res.json();
        if (data.data) onSaved(data.data);
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!perm) return;
    setSaving(true);
    try {
      await fetch(`/api/admin/permissions?id=${perm.id}`, { method: 'DELETE' });
      onDeleted(perm.id);
      onClose();
    } catch {
      setError('Xóa thất bại');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/30 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[6px] shadow-xl w-full max-w-md admin-panel-pad space-y-5 border border-[#E4E9F0]" onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 className="text-lg font-bold text-[#162233]">
            {perm ? 'Chỉnh sửa quyền' : 'Cấp quyền mới'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Quyền <strong>{ACTION_LABELS[action] ?? action}</strong> trên bảng <strong>{collection}</strong>
          </p>
        </div>

        {/* Fields section */}
        <div className="space-y-3">
          <label className="admin-input-label">Phạm vi cột dữ liệu</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 rounded-[6px] border border-[#E4E9F0] cursor-pointer hover:bg-[#F5F8FC] transition"
              onClick={() => setAllFields(true)}>
              <input type="radio" checked={allFields} onChange={() => setAllFields(true)} className="text-[#2163F5]" />
              <div>
                <div className="text-sm font-semibold text-[#162233]">Tất cả các cột</div>
                <div className="text-xs text-slate-500">Truy cập toàn bộ thông tin trong bảng</div>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-[6px] border border-[#E4E9F0] cursor-pointer hover:bg-[#F5F8FC] transition"
              onClick={() => setAllFields(false)}>
              <input type="radio" checked={!allFields} onChange={() => setAllFields(false)} className="mt-0.5 text-[#2163F5]" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#162233]">Chỉ một số cột</div>
                <div className="text-xs text-slate-500 mb-2">Giới hạn truy cập vào các cột cụ thể</div>
                {!allFields && (
                  <input
                    type="text"
                    value={customFields}
                    onChange={(e) => setCustomFields(e.target.value)}
                    placeholder="Nhập tên cột, cách nhau bằng dấu phẩy"
                    className="admin-input"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Filter section */}
        <div className="space-y-3">
          <label className="admin-input-label">Giới hạn dữ liệu</label>
          <div className="space-y-2">
            {FILTER_PRESETS.map((preset) => (
              <label
                key={preset.value}
                className={`flex items-start gap-3 p-3 rounded-[6px] border cursor-pointer hover:bg-[#F5F8FC] transition ${
                  filterPreset === preset.value ? 'border-[#2163F5] bg-[#EFF6FF]' : 'border-[#E4E9F0]'
                }`}
                onClick={() => setFilterPreset(preset.value)}
              >
                <input
                  type="radio"
                  checked={filterPreset === preset.value}
                  onChange={() => setFilterPreset(preset.value)}
                  className="mt-0.5 text-[#2163F5]"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-[#162233]">{preset.label}</div>
                  <div className="text-xs text-slate-500">{preset.desc}</div>
                  {preset.value === '__custom__' && filterPreset === '__custom__' && (
                    <textarea
                      value={customFilter}
                      onChange={(e) => setCustomFilter(e.target.value)}
                      rows={3}
                      placeholder='{"field": {"_eq": "value"}}'
                      className="admin-input mt-2 font-mono text-xs"
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 rounded-[6px] p-2">{error}</p>}

        <div className="flex gap-3 pt-4 border-t border-[#E4E9F0]">
          <button
            onClick={handleSave}
            disabled={saving}
            className="admin-button admin-button-primary flex-1"
          >
            {saving ? 'Đang lưu...' : perm ? 'Lưu thay đổi' : 'Cấp quyền'}
          </button>
          {perm && (
            <button
              onClick={handleDelete}
              disabled={saving}
              className="admin-button admin-button-danger"
            >
              Thu hồi
            </button>
          )}
          <button
            onClick={onClose}
            className="admin-button admin-button-secondary"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function PermissionsPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [search, setSearch] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [showSystem, setShowSystem] = useState(false);
  const [editModal, setEditModal] = useState<{ collection: string; action: string } | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [roleRes, permRes, colRes] = await Promise.all([
        fetch('/api/admin/permissions?type=roles'),
        fetch('/api/admin/permissions?type=permissions'),
        fetch('/api/admin/permissions?type=collections'),
      ]);
      const roleData = await roleRes.json();
      const permData = await permRes.json();
      const colData = await colRes.json();

      const allRoles: Role[] = roleData.data ?? [];
      const r = allRoles.filter((role) => {
        if (role.admin_access) return false;
        if (role.name === 'Administrator') return false;
        if (role.id === ADMIN_ROLE_ID) return false;
        if (role.description?.includes('$t:admin')) return false;
        return true;
      });
      setRoles(r);
      setPermissions(permData.data ?? []);

      const cols = (colData.data ?? [])
        .filter((c: { collection: string; meta?: { hidden?: boolean } }) => !c.meta?.hidden)
        .map((c: { collection: string }) => c.collection)
        .sort();
      setCollections(cols);

      if (!selectedRole && r.length > 0) {
        setSelectedRole(r[0].id);
      }
    } catch {
      setMessage({ type: 'error', text: 'Không tải được dữ liệu' });
    } finally {
      setLoading(false);
    }
  }, [selectedRole]);

  useEffect(() => { fetchAll(); }, []);

  const findPermission = (roleId: string, collection: string, action: string): Permission | undefined =>
    permissions.find((p) => p.role === roleId && p.collection === collection && p.action === action);

  const quickToggle = async (collection: string, action: string) => {
    if (!selectedRole) return;
    const key = `${collection}:${action}`;
    setToggling(key);
    setMessage(null);

    const existing = findPermission(selectedRole, collection, action);
    try {
      if (existing) {
        const res = await fetch(`/api/admin/permissions?id=${existing.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Xóa thất bại');
        setPermissions((prev) => prev.filter((p) => p.id !== existing.id));
      } else {
        const res = await fetch('/api/admin/permissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: selectedRole, collection, action, fields: ['*'], permissions: {} }),
        });
        if (!res.ok) throw new Error('Tạo thất bại');
        const data = await res.json();
        if (data.data) setPermissions((prev) => [...prev, data.data]);
      }
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Lỗi' });
    } finally {
      setToggling(null);
    }
  };

  const toggleAllForCollection = async (collection: string) => {
    if (!selectedRole) return;
    const allExist = ACTIONS.every((a) => findPermission(selectedRole, collection, a));
    for (const action of ACTIONS) {
      const existing = findPermission(selectedRole, collection, action);
      if (allExist && existing) {
        await fetch(`/api/admin/permissions?id=${existing.id}`, { method: 'DELETE' });
        setPermissions((prev) => prev.filter((p) => p.id !== existing.id));
      } else if (!allExist && !existing) {
        const res = await fetch('/api/admin/permissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: selectedRole, collection, action, fields: ['*'], permissions: {} }),
        });
        const data = await res.json();
        if (data.data) setPermissions((prev) => [...prev, data.data]);
      }
    }
  };

  const selectedRoleObj = roles.find((r) => r.id === selectedRole);
  const countPerms = (roleId: string) => permissions.filter((p) => p.role === roleId).length;

  const filteredCollections = collections.filter((c) => {
    if (!showSystem && c.startsWith('directus_')) return false;
    if (search && !c.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const grouped: Record<string, string[]> = {};
  for (const col of filteredCollections) {
    const parts = col.split('_');
    const prefix = parts.length > 1 ? parts[0] : '_other';
    if (!grouped[prefix]) grouped[prefix] = [];
    grouped[prefix].push(col);
  }
  const groupKeys = Object.keys(grouped).sort();

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group); else next.add(group);
      return next;
    });
  };

  const handleModalSaved = (p: Permission) => {
    setPermissions((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = p; return next; }
      return [...prev, p];
    });
  };

  const handleModalDeleted = (id: number) => {
    setPermissions((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#2163F5]" />
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="mb-6 md:mb-8">
        <span className="admin-page-eyebrow">Cài đặt hệ thống</span>
        <h1 className="admin-page-title flex items-center gap-2.5">
          <Shield className="w-6 h-6 text-[#2163F5]" />
          Quản lý Phân quyền
        </h1>
        <p className="admin-page-lead">Cấu hình quyền truy cập cho từng vai trò trong hệ thống</p>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-[6px] text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      {/* Role tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`admin-button ${
              role.id === selectedRole
                ? 'admin-button-primary'
                : 'admin-button-secondary'
            }`}
          >
            {role.name}
            <span className={`text-xs ${role.id === selectedRole ? 'text-white/70' : 'text-slate-400'}`}>
              ({countPerms(role.id)})
            </span>
          </button>
        ))}
      </div>

      {selectedRoleObj && (
        <div className="bg-[#EFF6FF] border border-[#D8E6F5] rounded-[6px] p-3 mb-5 text-sm">
          <strong className="text-[#162233]">{selectedRoleObj.name}</strong>
          {selectedRoleObj.description && !selectedRoleObj.description.startsWith('$t:') && (
            <span className="text-slate-600"> — {selectedRoleObj.description}</span>
          )}
        </div>
      )}

      {/* Search + system toggle */}
      <div className="admin-filter-bar mb-5">
        <div className="admin-filter-group flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm bảng dữ liệu..."
            className="admin-input"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer whitespace-nowrap">
          <input
            type="checkbox"
            checked={showSystem}
            onChange={(e) => setShowSystem(e.target.checked)}
            className="rounded-[3px]"
          />
          Hiện bảng hệ thống
        </label>
      </div>

      {/* Permissions matrix */}
      <div className="admin-panel admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr className="admin-table-head">
              <th className="admin-table-cell text-left min-w-[220px]">Bảng dữ liệu</th>
              {ACTIONS.map((action) => (
                <th key={action} className="admin-table-cell text-center w-[100px]">
                  {ACTION_LABELS[action]}
                </th>
              ))}
              <th className="admin-table-cell text-center w-[80px]">Tất cả</th>
            </tr>
          </thead>
          <tbody>
            {groupKeys.map((group) => {
              const cols = grouped[group];
              const isCollapsed = collapsedGroups.has(group);
              const showGroupHeader = group !== '_other' && cols.length > 1;

              return (
                <React.Fragment key={group}>
                  {showGroupHeader && (
                    <tr
                      className="bg-slate-50 cursor-pointer hover:bg-slate-100 transition"
                      onClick={() => toggleGroup(group)}
                    >
                      <td colSpan={6} className="admin-table-cell font-semibold text-slate-500 text-xs uppercase tracking-wide">
                        <span className="inline-flex items-center gap-1">
                          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          {group} ({cols.length})
                        </span>
                      </td>
                    </tr>
                  )}
                  {!isCollapsed && cols.map((collection) => (
                    <tr key={collection} className="admin-table-row">
                      <td className="admin-table-cell font-medium text-[#162233]">{collection}</td>
                      {ACTIONS.map((action) => {
                        const perm = findPermission(selectedRole, collection, action);
                        const isToggling = toggling === `${collection}:${action}`;

                        return (
                          <td key={action} className="admin-table-cell text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => quickToggle(collection, action)}
                                disabled={isToggling}
                                className={`w-8 h-8 rounded-[6px] flex items-center justify-center transition ${
                                  isToggling
                                    ? 'bg-slate-100'
                                    : perm
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-slate-100 text-slate-300 hover:bg-red-50 hover:text-red-400'
                                }`}
                                title={perm ? 'Có quyền — click để thu hồi' : 'Không có quyền — click để cấp'}
                              >
                                {isToggling ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : perm ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <X className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => setEditModal({ collection, action })}
                                className="w-6 h-6 rounded-[3px] flex items-center justify-center text-slate-300 hover:text-[#2163F5] hover:bg-[#EFF6FF] transition"
                                title="Tuỳ chỉnh chi tiết"
                              >
                                <Settings2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        );
                      })}
                      <td className="admin-table-cell text-center">
                        <button
                          onClick={() => toggleAllForCollection(collection)}
                          className="text-xs font-semibold text-[#2163F5] hover:text-[#1852D6] hover:underline"
                        >
                          {ACTIONS.every((a) => findPermission(selectedRole, collection, a)) ? 'Bỏ hết' : 'Cấp hết'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-6 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-[4px] bg-green-100 inline-flex items-center justify-center"><Check className="w-3 h-3 text-green-700" /></span>
          Có quyền
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-[4px] bg-slate-100 inline-flex items-center justify-center"><X className="w-3 h-3 text-slate-300" /></span>
          Không có quyền
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Settings2 className="w-3.5 h-3.5 text-slate-400" />
          Tuỳ chỉnh chi tiết
        </span>
      </div>

      {/* Detail modal */}
      {editModal && (
        <PermissionDetailModal
          perm={findPermission(selectedRole, editModal.collection, editModal.action) ?? null}
          collection={editModal.collection}
          action={editModal.action}
          roleId={selectedRole}
          onClose={() => setEditModal(null)}
          onSaved={handleModalSaved}
          onDeleted={handleModalDeleted}
        />
      )}
    </div>
  );
}

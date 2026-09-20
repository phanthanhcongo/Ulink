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
const ADMIN_ROLE_ID = '78c7d3ca-5d25-487f-bd87-cf42e9edce13';

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
  const [fields, setFields] = useState(perm?.fields?.join(', ') ?? '*');
  const [filter, setFilter] = useState(perm?.permissions ? JSON.stringify(perm.permissions, null, 2) : '{}');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');

    let parsedFilter: Record<string, unknown> = {};
    try {
      parsedFilter = JSON.parse(filter);
    } catch {
      setError('Filter JSON không hợp lệ');
      setSaving(false);
      return;
    }

    const parsedFields = fields
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);
    if (parsedFields.length === 0) parsedFields.push('*');

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-gray-900">
          {perm ? 'Chỉnh sửa' : 'Tạo'} Permission
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Collection:</span>
            <span className="ml-2 font-mono font-medium">{collection}</span>
          </div>
          <div>
            <span className="text-gray-500">Action:</span>
            <span className="ml-2 font-medium uppercase">{action}</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Fields <span className="text-gray-400 font-normal">(dùng * cho tất cả, phân cách bằng dấu phẩy)</span>
          </label>
          <input
            type="text"
            value={fields}
            onChange={(e) => setFields(e.target.value)}
            placeholder="* hoặc field1, field2, field3"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-400">Dùng !field_name để loại trừ (vd: *, !password)</p>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Filter (JSON) <span className="text-gray-400 font-normal">— bộ lọc row-level</span>
          </label>
          <textarea
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            rows={4}
            placeholder='{ "status": { "_eq": "published" } }'
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-400">
            Để {'{}'} nếu không cần filter. Ví dụ: {`{"user": {"_eq": "$CURRENT_USER"}}`}
          </p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3 pt-2 border-t">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
          >
            {saving ? 'Đang lưu...' : perm ? 'Cập nhật' : 'Tạo Permission'}
          </button>
          {perm && (
            <button
              onClick={handleDelete}
              disabled={saving}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50 text-sm font-medium"
            >
              Xóa
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm"
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

  // Quick toggle: click checkbox area
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
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Phân quyền</h1>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      {/* Role tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
              role.id === selectedRole
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {role.name}
            <span className={`ml-2 text-xs ${role.id === selectedRole ? 'text-blue-200' : 'text-gray-400'}`}>
              ({countPerms(role.id)})
            </span>
          </button>
        ))}
      </div>

      {selectedRoleObj && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 text-sm">
          <strong>{selectedRoleObj.name}</strong>
          {selectedRoleObj.description && !selectedRoleObj.description.startsWith('$t:') && (
            <span className="text-gray-600"> — {selectedRoleObj.description}</span>
          )}
        </div>
      )}

      {/* Search + system toggle */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm collection..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={showSystem}
            onChange={(e) => setShowSystem(e.target.checked)}
            className="rounded"
          />
          Hiện bảng hệ thống (directus_*)
        </label>
      </div>

      {/* Permissions matrix */}
      <div className="bg-white rounded-lg shadow border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 font-medium text-gray-700 min-w-[250px]">Collection</th>
              {ACTIONS.map((action) => (
                <th key={action} className="text-center px-3 py-3 font-medium text-gray-700 w-[120px] uppercase text-xs">
                  {action}
                </th>
              ))}
              <th className="text-center px-3 py-3 font-medium text-gray-700 w-[80px]">All</th>
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
                      className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
                      onClick={() => toggleGroup(group)}
                    >
                      <td colSpan={6} className="px-4 py-2 font-medium text-gray-600 text-xs uppercase tracking-wide">
                        <span className="inline-flex items-center gap-1">
                          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          {group} ({cols.length})
                        </span>
                      </td>
                    </tr>
                  )}
                  {!isCollapsed && cols.map((collection) => (
                    <tr key={collection} className="border-b hover:bg-blue-50/30 transition">
                      <td className="px-4 py-2 font-mono text-xs text-gray-800">{collection}</td>
                      {ACTIONS.map((action) => {
                        const perm = findPermission(selectedRole, collection, action);
                        const isToggling = toggling === `${collection}:${action}`;

                        return (
                          <td key={action} className="text-center px-3 py-2">
                            <div className="flex items-center justify-center gap-1">
                              {/* Toggle button */}
                              <button
                                onClick={() => quickToggle(collection, action)}
                                disabled={isToggling}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                                  isToggling
                                    ? 'bg-gray-100'
                                    : perm
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-gray-100 text-gray-300 hover:bg-red-50 hover:text-red-400'
                                }`}
                                title={perm ? 'Có quyền — click để xóa' : 'Không có quyền — click để thêm'}
                              >
                                {isToggling ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : perm ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <X className="w-4 h-4" />
                                )}
                              </button>
                              {/* Detail/edit button */}
                              <button
                                onClick={() => setEditModal({ collection, action })}
                                className="w-6 h-6 rounded flex items-center justify-center text-gray-300 hover:text-blue-600 hover:bg-blue-50 transition"
                                title="Cấu hình chi tiết (fields, filter)"
                              >
                                <Settings2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        );
                      })}
                      <td className="text-center px-3 py-2">
                        <button
                          onClick={() => toggleAllForCollection(collection)}
                          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
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
      <div className="mt-4 flex flex-wrap gap-6 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-5 h-5 rounded bg-green-100 inline-flex items-center justify-center"><Check className="w-3 h-3 text-green-700" /></span>
          Có quyền
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-5 h-5 rounded bg-gray-100 inline-flex items-center justify-center"><X className="w-3 h-3 text-gray-300" /></span>
          Không có quyền
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Settings2 className="w-3.5 h-3.5 text-gray-400" />
          Cấu hình chi tiết (fields, filter)
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

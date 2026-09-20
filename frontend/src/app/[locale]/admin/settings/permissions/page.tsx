'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Shield, Check, X, Loader2, ChevronDown, ChevronRight } from 'lucide-react';

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

      // Filter out admin roles
      const allRoles: Role[] = roleData.data ?? [];
      const r = allRoles.filter((role) => {
        if (role.admin_access) return false;
        if (role.name === 'Administrator') return false;
        if (role.id === ADMIN_ROLE_ID) return false;
        // Also filter system admin by description
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

  // Directus v10: permissions use `role` directly (null = public)
  const findPermission = (roleId: string, collection: string, action: string): Permission | undefined => {
    return permissions.find(
      (p) => p.role === roleId && p.collection === collection && p.action === action
    );
  };

  const togglePermission = async (collection: string, action: string) => {
    if (!selectedRole) return;
    const key = `${collection}:${action}`;
    setToggling(key);
    setMessage(null);

    const existing = findPermission(selectedRole, collection, action);

    try {
      if (existing) {
        const res = await fetch(`/api/admin/permissions?id=${existing.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Xóa permission thất bại');
        setPermissions((prev) => prev.filter((p) => p.id !== existing.id));
      } else {
        const res = await fetch('/api/admin/permissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role: selectedRole,
            collection,
            action,
            fields: ['*'],
            permissions: {},
          }),
        });
        if (!res.ok) throw new Error('Tạo permission thất bại');
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

  const toggleAllForAction = async (action: string) => {
    if (!selectedRole) return;
    const filtered = filteredCollections;
    const allExist = filtered.every((c) => findPermission(selectedRole, c, action));

    for (const collection of filtered) {
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

  const countPerms = (roleId: string) =>
    permissions.filter((p) => p.role === roleId).length;

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
                <th key={action} className="text-center px-3 py-3 font-medium text-gray-700 w-[100px]">
                  <button
                    onClick={() => toggleAllForAction(action)}
                    className="hover:text-blue-600 transition uppercase text-xs"
                    title={`Toggle tất cả ${action}`}
                  >
                    {action}
                  </button>
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
                  {!isCollapsed && cols.map((collection) => {
                    const hasFilter = ACTIONS.some((a) => {
                      const p = findPermission(selectedRole, collection, a);
                      return p?.permissions && Object.keys(p.permissions).length > 0;
                    });

                    return (
                      <tr key={collection} className="border-b hover:bg-blue-50/30 transition">
                        <td className="px-4 py-2 font-mono text-xs text-gray-800">
                          {collection}
                          {hasFilter && (
                            <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">
                              filter
                            </span>
                          )}
                        </td>
                        {ACTIONS.map((action) => {
                          const perm = findPermission(selectedRole, collection, action);
                          const isToggling = toggling === `${collection}:${action}`;
                          const hasRowFilter = perm?.permissions && Object.keys(perm.permissions).length > 0;
                          const hasFieldLimit = perm?.fields && !perm.fields.includes('*');

                          return (
                            <td key={action} className="text-center px-3 py-2">
                              <button
                                onClick={() => togglePermission(collection, action)}
                                disabled={isToggling}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition ${
                                  isToggling
                                    ? 'bg-gray-100'
                                    : perm
                                    ? hasRowFilter || hasFieldLimit
                                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-gray-100 text-gray-300 hover:bg-red-50 hover:text-red-400'
                                }`}
                                title={
                                  perm
                                    ? hasRowFilter
                                      ? `Filter: ${JSON.stringify(perm.permissions)}`
                                      : hasFieldLimit
                                      ? `Fields: ${perm.fields?.join(', ')}`
                                      : 'Full access — click để xóa'
                                    : 'Không có quyền — click để thêm'
                                }
                              >
                                {isToggling ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : perm ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <X className="w-4 h-4" />
                                )}
                              </button>
                            </td>
                          );
                        })}
                        <td className="text-center px-3 py-2">
                          <button
                            onClick={() => toggleAllForCollection(collection)}
                            className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {ACTIONS.every((a) => findPermission(selectedRole, collection, a))
                              ? 'Bỏ hết'
                              : 'Cấp hết'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-green-100 inline-flex items-center justify-center"><Check className="w-3 h-3 text-green-700" /></span>
          Full access
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-yellow-100 inline-flex items-center justify-center"><Check className="w-3 h-3 text-yellow-700" /></span>
          Có filter / giới hạn fields
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-gray-100 inline-flex items-center justify-center"><X className="w-3 h-3 text-gray-300" /></span>
          Không có quyền
        </span>
      </div>
    </div>
  );
}

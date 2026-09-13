'use client';

import { useTransition } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteInventoryStock, updateInventoryStock } from '@/app/[locale]/admin/inventory/actions';

export default function InventoryCrud({ stock }: { stock: any[] }) {
  const [pending, startTransition] = useTransition();
  const edit = (item: any) => {
    const quantityOnHand = Number(window.prompt('Tồn thực tế mới', String(item.quantity_on_hand)));
    const reorderLevel = Number(window.prompt('Mức cảnh báo mới', String(item.reorder_level || 0)));
    if (!Number.isFinite(quantityOnHand) || !Number.isFinite(reorderLevel)) return;
    startTransition(async () => { await updateInventoryStock(item.id, { quantityOnHand, reorderLevel }); window.location.reload(); });
  };
  const remove = (item: any) => {
    if (!window.confirm(`Xóa tồn ${item.sku?.sku_code || ''} tại ${item.hub?.name || ''}?`)) return;
    startTransition(async () => { await deleteInventoryStock(item.id); window.location.reload(); });
  };
  return <div className="admin-panel overflow-x-auto"><div className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">CRUD tồn kho {pending && <span className="ml-2 text-blue-600">Đang xử lý...</span>}</div><table className="admin-table min-w-[850px]"><thead><tr className="admin-table-head"><th className="admin-table-cell">SKU / Hub</th><th className="admin-table-cell">Tồn thực tế</th><th className="admin-table-cell">Mức cảnh báo</th><th className="admin-table-cell text-right">Thao tác</th></tr></thead><tbody>{stock.map(item => <tr key={item.id} className="admin-table-row"><td className="admin-table-cell">{item.sku?.sku_code || '-'}<div className="text-xs text-slate-400">{item.hub?.name || '-'}</div></td><td className="admin-table-cell font-bold">{item.quantity_on_hand}</td><td className="admin-table-cell">{item.reorder_level}</td><td className="admin-table-cell text-right"><button disabled={pending} onClick={() => edit(item)} className="mr-3 text-blue-600" title="Sửa"><Pencil className="inline h-4 w-4" /></button><button disabled={pending} onClick={() => remove(item)} className="text-red-500" title="Xóa"><Trash2 className="inline h-4 w-4" /></button></td></tr>)}</tbody></table></div>;
}

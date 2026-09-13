import test from 'node:test';
import assert from 'node:assert/strict';
import { aggregateDashboardOrders, aggregateStockByHub } from './dashboard-charts';

test('fills a 30-day order trend with zero values for missing days', () => {
  const result = aggregateDashboardOrders([{ order_date: '2026-09-13T10:00:00Z', total: 120000, status: 'confirmed' }], new Date('2026-09-13T12:00:00Z'));
  assert.equal(result.trend.length, 30);
  assert.equal(result.trend.at(-1)?.orders, 1);
  assert.equal(result.trend.at(-1)?.revenue, 120000);
  assert.equal(result.trend.slice(0, -1).every(x => x.orders === 0 && x.revenue === 0), true);
});

test('aggregates stock quantities by hub', () => {
  assert.deepEqual(aggregateStockByHub([{ hub: { name: 'Hà Nội' }, quantity_on_hand: 4 }, { hub: { name: 'Hà Nội' }, quantity_on_hand: 6 }, { hub: { name: 'Đà Nẵng' }, quantity_on_hand: 3 }]), [{ name: 'Hà Nội', quantity: 10 }, { name: 'Đà Nẵng', quantity: 3 }]);
});

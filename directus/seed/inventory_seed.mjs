/**
 * Seed: Inventory Stock
 * Creates an initial inventory balance row for every existing SKU at every hub.
 * Moved from migration 2026-09-13-add-inventory-management.sql
 * — seed data (especially with random values) does not belong in migrations.
 */

export default async function seedInventoryStock(knex) {
  // Cross-join product_skus × regional_hubs, skip existing rows
  await knex.raw(`
    INSERT INTO inventory_stock (sku, hub, quantity_on_hand, quantity_reserved, reorder_level)
    SELECT ps.id, rh.id, floor(random() * 901 + 100)::integer, 0, 0
    FROM product_skus ps
    CROSS JOIN regional_hubs rh
    ON CONFLICT (sku, hub) DO NOTHING;
  `);

  const { rows } = await knex.raw('SELECT count(*) AS cnt FROM inventory_stock');
  console.log(`  ✔ inventory_stock: ${rows[0].cnt} rows`);
}

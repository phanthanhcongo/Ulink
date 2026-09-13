-- Inventory by SKU and regional hub.
CREATE TABLE IF NOT EXISTS inventory_stock (
  id SERIAL PRIMARY KEY,
  sku INTEGER NOT NULL REFERENCES product_skus(id) ON DELETE CASCADE,
  hub INTEGER NOT NULL REFERENCES regional_hubs(id) ON DELETE CASCADE,
  quantity_on_hand INTEGER NOT NULL DEFAULT 0 CHECK (quantity_on_hand >= 0),
  quantity_reserved INTEGER NOT NULL DEFAULT 0 CHECK (quantity_reserved >= 0),
  reorder_level INTEGER NOT NULL DEFAULT 0 CHECK (reorder_level >= 0),
  date_created TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_updated TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (sku, hub)
);

CREATE TABLE IF NOT EXISTS inventory_movements (
  id SERIAL PRIMARY KEY,
  sku INTEGER NOT NULL REFERENCES product_skus(id) ON DELETE RESTRICT,
  hub INTEGER NOT NULL REFERENCES regional_hubs(id) ON DELETE RESTRICT,
  movement_type VARCHAR(20) NOT NULL CHECK (movement_type IN ('inbound', 'outbound', 'adjustment', 'return')),
  quantity_delta INTEGER NOT NULL CHECK (quantity_delta <> 0),
  quantity_before INTEGER NOT NULL CHECK (quantity_before >= 0),
  quantity_after INTEGER NOT NULL CHECK (quantity_after >= 0),
  order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
  performed_by UUID REFERENCES directus_users(id) ON DELETE SET NULL,
  note TEXT,
  date_created TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inventory_stock_hub ON inventory_stock(hub);
CREATE INDEX IF NOT EXISTS idx_inventory_stock_sku ON inventory_stock(sku);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_sku_hub ON inventory_movements(sku, hub);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_order ON inventory_movements(order_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_created ON inventory_movements(date_created);

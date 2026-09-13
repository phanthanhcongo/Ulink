# Mock Payment to Order Design

## Goal

Allow authenticated and guest buyers to complete a simulated payment. A successful simulated payment must create a real order record and order items in Directus.

## Flow

1. Checkout validates buyer and delivery information.
2. Frontend calls `POST /api/orders` with cart lines, contact, delivery, payment, and totals.
3. The server validates the payload and creates `orders` plus `order_items`.
4. The server returns the created order id/code and the frontend clears the cart and navigates to order confirmation.
5. On failure, the cart remains intact and checkout shows an actionable error.

## Buyer data

Guests must provide full name, email, phone, and address. Authenticated users may use the same editable fields. The current schema has no dedicated shipping-address columns, so delivery/contact details are serialized into `orders.notes` while the order is associated with the matching customer when available.

## Order semantics

The simulated payment always succeeds only after order creation succeeds. New orders use status `confirmed`. Order items preserve SKU, description, quantity, unit price, and line total. No real payment gateway, inventory decrement, account creation, or ERP side effect is added.

## Error handling and safety

The API rejects malformed or empty carts, invalid quantities/prices, and missing guest contact fields. Prices are recalculated/validated server-side from the submitted lines where the existing product pricing model permits; client totals are not trusted for authorization. The operation should avoid leaving an order without items.

## Testing

Unit tests cover valid order creation payload mapping and rejection of missing guest data/empty carts. Frontend tests cover success only after the API returns an order and preserving the cart on API failure.

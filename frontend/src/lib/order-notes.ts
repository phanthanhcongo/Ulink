export function parseOrderNotes(notes: unknown): { buyer?: { fullName?: string; email?: string; phone?: string; address?: string; province?: string; district?: string; ward?: string; note?: string }; paymentMethod?: string; shippingMethod?: string } {
  if (typeof notes !== 'string' || !notes.trim()) return {};
  try {
    const parsed = JSON.parse(notes);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export const transactions = [
  { id: 'txn-1001', customer: 'Ava Thompson', amount: 129.99, status: 'Completed', risk: 'Low', date: '2026-10-15' },
  { id: 'txn-1002', customer: 'Leah Chen', amount: 214.5, status: 'Pending', risk: 'Medium', date: '2026-10-16' },
  { id: 'txn-1003', customer: 'Marcus Rivera', amount: 59, status: 'Completed', risk: 'Low', date: '2026-10-17' },
  { id: 'txn-1004', customer: 'Olivia Park', amount: 394.2, status: 'Held', risk: 'High', date: '2026-10-18' },
];

export const inventory = [
  { sku: 'TEE-01', name: 'Classic Tee', stock: 128, price: 36, margin: 44 },
  { sku: 'MUG-14', name: 'Travel Mug', stock: 64, price: 24, margin: 31 },
  { sku: 'MOU-77', name: 'Wireless Mouse', stock: 38, price: 54, margin: 46 },
  { sku: 'LAM-09', name: 'Desk Lamp', stock: 22, price: 68, margin: 42 },
];

export const aiSummary = {
  headline: 'Revenue is growing faster than the prior period, and your top-performing items are the ones with the best margin retention.',
  stats: [
    { label: 'Monthly revenue', value: '$284.6K' },
    { label: 'Gross profit', value: '$126.8K' },
    { label: 'Open alerts', value: '3' },
  ],
};

export type Order = { id: string; name: string; product: string; amount: number; status: 'paid' | 'pending' | 'failed'; date: string };

export const statusLabels = {
  paid: 'پرداخت‌شده',
  pending: 'در انتظار پرداخت',
  failed: 'ناموفق',
};

export const orders: Order[] = [
  { id: 'LQ-8421', name: 'سارا محمدی', product: 'اشتراک سازمانی', amount: 18490000, status: 'paid', date: '۱۴۰۵/۰۶/۲۷' },
  { id: 'LQ-8419', name: 'آرمان کریمی', product: 'بسته فروشگاهی', amount: 9850000, status: 'pending', date: '۱۴۰۵/۰۶/۲۷' },
  { id: 'LQ-8417', name: 'نگار توکلی', product: 'داشبورد مالی', amount: 12300000, status: 'paid', date: '۱۴۰۵/۰۶/۲۶' },
  { id: 'LQ-8412', name: 'شرکت رایان', product: 'لایسنس توسعه', amount: 7280000, status: 'failed', date: '۱۴۰۵/۰۶/۲۶' },
  { id: 'LQ-8410', name: 'مریم سلیمانی', product: 'اشتراک حرفه‌ای', amount: 5490000, status: 'paid', date: '۱۴۰۵/۰۶/۲۵' },
  { id: 'LQ-8408', name: 'علی رضایی', product: 'بسته فروشگاهی', amount: 9850000, status: 'pending', date: '۱۴۰۵/۰۶/۲۵' },
];

export const fa = (value: number) => new Intl.NumberFormat('fa-IR').format(value);

export const periods = [
  { label: '۷ روز گذشته', revenue: '۶۸٫۴', count: '۴۳۲', customers: '۹۶', points: [20, 36, 27, 49, 44, 64, 73] },
  { label: '۳۰ روز گذشته', revenue: '۲۸۴٫۶', count: '۱٬۸۴۲', customers: '۴۶۸', points: [22, 35, 28, 54, 42, 67, 61, 81, 74, 93, 87, 108] },
  { label: 'سه‌ماههٔ جاری', revenue: '۸۳۶٫۲', count: '۵٬۳۱۸', customers: '۱٬۲۴۰', points: [14, 25, 42, 34, 59, 56, 73, 83, 77, 109, 104, 125] },
];

export function downloadOrders(rows: Order[]) {
  const lines = [
    ['شماره سفارش', 'مشتری', 'محصول', 'مبلغ (تومان)', 'وضعیت', 'تاریخ'],
    ...rows.map((o) => [o.id, o.name, o.product, String(o.amount), statusLabels[o.status], o.date]),
  ];
  const csv = '\uFEFF' + lines.map((row) => row.map((v) => '"' + v.replaceAll('"', '""') + '"').join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'loraniq-orders-demo.csv';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

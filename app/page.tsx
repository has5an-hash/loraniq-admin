"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpLeft,
  ChevronDown,
  CreditCard,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import RevenueChart from "@/components/revenue-chart";
import {
  downloadOrders,
  fa,
  orders,
  periods,
  statusLabels,
  type Order,
} from "@/lib/dashboard-data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type View = "overview" | "analytics" | "orders" | "customers";

const views: { id: View; label: string }[] = [
  { id: "overview", label: "نمای کلی" },
  { id: "analytics", label: "تحلیل درآمد" },
  { id: "orders", label: "سفارش‌ها" },
  { id: "customers", label: "مشتریان" },
];

export default function Home() {
  const [view, setView] = useState<View>("overview");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [period, setPeriod] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const data = periods[period];

  const visibleOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          (filter === "all" || order.status === filter) &&
          `${order.id} ${order.name} ${order.product}`
            .toLowerCase()
            .includes(search.trim().toLowerCase()),
      ),
    [filter, search],
  );

  const exportCsv = () => downloadOrders(visibleOrders);

  const metrics = [
    {
      label: "درآمد کل",
      value: data.revenue,
      unit: "میلیون تومان",
      change: "۱۲٫۸٪",
      icon: Wallet,
      tone: "purple",
      spark: "2,32 18,28 30,30 45,16 58,23 73,10 88,14 103,4",
    },
    {
      label: "سفارش‌های جدید",
      value: data.count,
      unit: "سفارش",
      change: "۸٫۲٪",
      icon: ShoppingBag,
      tone: "blue",
      spark: "2,30 18,23 32,28 47,12 62,18 77,9 90,15 103,4",
    },
    {
      label: "مشتریان تازه",
      value: data.customers,
      unit: "نفر",
      change: "۵٫۶٪",
      icon: Users,
      tone: "green",
      spark: "2,28 18,31 33,20 48,25 63,10 78,17 90,7 103,4",
    },
    {
      label: "میانگین ارزش سفارش",
      value: "۱۵۴٫۵",
      unit: "هزار تومان",
      change: "۴٫۳٪",
      icon: CreditCard,
      tone: "amber",
      spark: "2,32 18,26 32,29 47,20 63,23 78,12 90,17 103,6",
    },
  ];

  return (
    <LoraniqShell active="executive">
      <main id="main-content" className="main-content studio-main" tabIndex={-1}>
        <div className="heading-row">
          <div>
            <p className="overline">YOUR BUSINESS, IN FOCUS</p>
            <h1>
              {view === "overview" ? "هر روز، یک قدم جلوتر" : views.find((item) => item.id === view)?.label}
              <span className="title-dot">.</span>
            </h1>
            <p className="heading-description">
              {view === "overview"
                ? "سلام حسن، به فضای مدیریت کسب‌وکارت خوش آمدی."
                : "جزئیات روشن‌تر، برای تصمیم‌های دقیق‌تر."}
            </p>
          </div>

          <div className="heading-controls">
            <label className="period-control">
              <span className="sr-only">بازهٔ گزارش نمونه</span>
              <select value={period} onChange={(event) => setPeriod(Number(event.target.value))}>
                {periods.map((item, index) => (
                  <option key={item.label} value={index}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} />
            </label>
            <button className="primary-button" onClick={exportCsv}>
              <ArrowDownToLine size={17} />
              خروجی سفارش‌ها
            </button>
          </div>
        </div>

        <nav className="view-tabs" aria-label="بخش‌های داشبورد">
          {views.map((item) => (
            <button
              key={item.id}
              type="button"
              className={view === item.id ? "active" : ""}
              aria-current={view === item.id ? "page" : undefined}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
          <span className="period-note">
            <i />
            نمایش اطلاعات آزمایشی
          </span>
        </nav>

        {(view === "overview" || view === "analytics") && (
          <>
            <section className="metrics" aria-label="شاخص‌های عملکرد نمونه">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <article className={`metric metric-${metric.tone}`} key={metric.label}>
                    <div className="metric-heading">
                      <span className={`metric-symbol ${metric.tone}`}>
                        <Icon size={20} />
                      </span>
                      <span className="metric-index">0{index + 1}</span>
                    </div>
                    <p>{metric.label}</p>
                    <div className="metric-value">
                      {metric.value}
                      <small>{metric.unit}</small>
                    </div>
                    <div className="metric-foot">
                      <span>
                        <TrendingUp size={13} />
                        {metric.change}
                        <small> نسبت به قبل</small>
                      </span>
                      <svg viewBox="0 0 106 40" aria-hidden="true">
                        <polyline points={metric.spark} />
                      </svg>
                    </div>
                  </article>
                );
              })}
            </section>

            <section className="insights-grid">
              <article className="surface revenue-surface">
                <div className="surface-heading">
                  <div>
                    <span className="eyebrow">گزارش عملکرد</span>
                    <h2>نبض درآمد کسب‌وکار</h2>
                  </div>
                  <span className="soft-tag">{data.label}</span>
                </div>
                <div className="revenue-summary">
                  <div>
                    <b>{data.revenue}</b>
                    <span>میلیون تومان</span>
                    <em>
                      <TrendingUp size={13} />
                      ۱۲٫۸٪
                    </em>
                  </div>
                  <div className="chart-legend">
                    <span>
                      <i />
                      درآمد
                    </span>
                    <span>
                      <i />
                      هدف
                    </span>
                  </div>
                </div>
                <RevenueChart values={data.points} />
                <div className="chart-footer">
                  <ShieldCheck size={15} />
                  <span>مبالغ نمودار به میلیون تومان · داده‌های نمونهٔ قالب</span>
                </div>
              </article>

              <article className="surface goal-surface">
                <div className="surface-heading">
                  <div>
                    <span className="eyebrow">قدم بعدی شما</span>
                    <h2>به هدف نزدیک‌تریم</h2>
                  </div>
                  <span className="goal-star">
                    <Sparkles size={20} />
                  </span>
                </div>
                <div className="goal-ring">
                  <svg viewBox="0 0 180 180" aria-hidden="true">
                    <circle className="ring-track" cx="90" cy="90" r="72" />
                    <circle className="ring-progress" cx="90" cy="90" r="72" />
                  </svg>
                  <div>
                    <b>
                      ۷۸<span>٪</span>
                    </b>
                    <small>تحقق هدف فصل</small>
                  </div>
                </div>
                <p className="goal-caption">عملکرد خوب، نتیجهٔ قدم‌های پیوسته است.</p>
                <div className="goal-teams">
                  {[
                    ["فروش", "۹۲٪", 92],
                    ["بازاریابی", "۷۴٪", 74],
                    ["محصول", "۶۸٪", 68],
                  ].map(([name, value, progress]) => (
                    <div key={String(name)}>
                      <span>{name}</span>
                      <div>
                        <i style={{ width: `${progress}%` }} />
                      </div>
                      <b>{value}</b>
                    </div>
                  ))}
                </div>
                <button className="outline-button" onClick={() => setView("analytics")}>
                  جزئیات عملکرد
                  <ArrowLeft size={16} />
                </button>
              </article>
            </section>
          </>
        )}

        {view !== "customers" && (
          <section className={view === "orders" ? "orders-layout" : "bottom-grid"}>
            <article className="surface orders-surface">
              <div className="surface-heading">
                <div>
                  <span className="eyebrow">جریان کسب‌وکار</span>
                  <h2>
                    {view === "orders" ? "همهٔ سفارش‌ها" : "آخرین سفارش‌ها"}{" "}
                    <small className="count-tag">{fa(visibleOrders.length)}</small>
                  </h2>
                </div>
                {view !== "orders" && (
                  <button className="text-button" onClick={() => setView("orders")}>
                    مشاهده همه
                    <ArrowLeft size={15} />
                  </button>
                )}
              </div>

              <div className="table-toolbar">
                <label className="table-search">
                  <Search size={16} />
                  <input
                    aria-label="جستجوی سفارش"
                    placeholder="جستجوی نام یا شماره سفارش…"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>
                <label className="status-select">
                  <SlidersHorizontal size={15} />
                  <span className="sr-only">فیلتر وضعیت سفارش</span>
                  <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                    <option value="all">همهٔ وضعیت‌ها</option>
                    {Object.entries(statusLabels).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="orders-table-wrap">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>مشتری / سفارش</th>
                      <th>محصول</th>
                      <th>
                        مبلغ <small>(تومان)</small>
                      </th>
                      <th>وضعیت</th>
                      <th>
                        <span className="sr-only">جزئیات</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleOrders.map((order, index) => (
                      <tr key={order.id}>
                        <td>
                          <div className="customer-cell">
                            <span className={`customer-avatar color-${index % 4}`}>
                              {order.name
                                .split(" ")
                                .map((name) => name[0])
                                .slice(0, 2)
                                .join("")}
                            </span>
                            <div>
                              <b>{order.name}</b>
                              <small dir="ltr">{order.id}</small>
                            </div>
                          </div>
                        </td>
                        <td>{order.product}</td>
                        <td className="amount">{fa(order.amount)}</td>
                        <td>
                          <span className={`order-status ${order.status}`}>
                            <i />
                            {statusLabels[order.status]}
                          </span>
                        </td>
                        <td>
                          <button
                            className="square-button"
                            onClick={() => setSelectedOrder(order)}
                            aria-label={`جزئیات سفارش ${order.id}`}
                          >
                            <ArrowUpLeft size={17} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {!visibleOrders.length && (
                  <div className="empty-state">
                    <Search />
                    <b>سفارشی پیدا نشد</b>
                    <p>عبارت جستجو یا وضعیت را تغییر بدهید.</p>
                    <button
                      className="outline-button"
                      onClick={() => {
                        setSearch("");
                        setFilter("all");
                      }}
                    >
                      پاک کردن فیلترها
                    </button>
                  </div>
                )}
              </div>

              <div className="table-footer">
                <span>
                  نمایش {fa(visibleOrders.length)} از {fa(orders.length)} سفارش نمونه
                </span>
                <button className="text-button" onClick={exportCsv}>
                  دانلود CSV
                  <ArrowDownToLine size={14} />
                </button>
              </div>
            </article>

            {view !== "orders" && (
              <article className="surface activity-surface">
                <div className="surface-heading">
                  <div>
                    <span className="eyebrow">در جریان بمانید</span>
                    <h2>تازه‌های فضای کاری</h2>
                  </div>
                  <span className="activity-dot" />
                </div>

                <div className="activity-list">
                  {[
                    {
                      icon: ShoppingBag,
                      title: "یک سفارش موفق دیگر",
                      text: "اشتراک سازمانی سارا محمدی تأیید شد.",
                      time: "۱۰ دقیقه پیش",
                      color: "green",
                    },
                    {
                      icon: Users,
                      title: "تیم، یک نفر قوی‌تر شد",
                      text: "مریم سلیمانی به تیم محصول پیوست.",
                      time: "۴۵ دقیقه پیش",
                      color: "purple",
                    },
                    {
                      icon: ShieldCheck,
                      title: "آماده برای قدم بعدی",
                      text: "گزارش عملکرد فصل آمادهٔ بررسی است.",
                      time: "۲ ساعت پیش",
                      color: "amber",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div className="activity-item" key={item.title}>
                        <span className={`metric-symbol ${item.color}`}>
                          <Icon size={17} />
                        </span>
                        <div>
                          <b>{item.title}</b>
                          <p>{item.text}</p>
                          <time>{item.time}</time>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="insight-note">
                  <Sparkles size={19} />
                  <div>
                    <b>نکتهٔ امروز</b>
                    <p>پیگیری سفارش‌های در انتظار، فرصتی برای افزایش فروش شماست.</p>
                    <button
                      className="text-button"
                      onClick={() => {
                        setView("orders");
                        setFilter("pending");
                      }}
                    >
                      بررسی سفارش‌ها
                      <ArrowLeft size={14} />
                    </button>
                  </div>
                </div>
              </article>
            )}
          </section>
        )}

        {view === "customers" && (
          <section className="customer-grid" aria-label="مشتریان نمونه">
            {orders.map((order, index) => (
              <article className="surface customer-profile" key={order.id}>
                <span className={`customer-avatar color-${index % 4}`}>{order.name[0]}</span>
                <h2>{order.name}</h2>
                <p>{order.product}</p>
                <dl>
                  <dt>آخرین خرید</dt>
                  <dd>{order.date}</dd>
                  <dt>مبلغ سفارش</dt>
                  <dd>{fa(order.amount)} تومان</dd>
                </dl>
                <button className="outline-button" onClick={() => setSelectedOrder(order)}>
                  مشاهده سفارش
                  <ArrowLeft size={16} />
                </button>
              </article>
            ))}
          </section>
        )}

        <footer className="studio-footer">
          <span>
            لورانیک <b>© ۱۴۰۵</b> <i />
            طراحی برای تصمیم‌های بهتر
          </span>
          <span>
            ساخته‌شده با توجه به جزئیات <span className="footer-gem">◇</span>
          </span>
        </footer>
      </main>

      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="detail-dialog">
          <DialogHeader>
            <DialogTitle>سفارش {selectedOrder?.id}</DialogTitle>
            <DialogDescription>اطلاعات این پیش‌نمایش نمونه است و به سرویس واقعی متصل نیست.</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <>
              <div className="order-detail">
                <span className={`order-status ${selectedOrder.status}`}>
                  {statusLabels[selectedOrder.status]}
                </span>
                <h3>{selectedOrder.name}</h3>
                <dl>
                  <dt>محصول</dt>
                  <dd>{selectedOrder.product}</dd>
                  <dt>تاریخ ثبت</dt>
                  <dd>{selectedOrder.date}</dd>
                  <dt>مبلغ</dt>
                  <dd>{fa(selectedOrder.amount)} تومان</dd>
                </dl>
              </div>
              <button className="primary-button" onClick={() => downloadOrders([selectedOrder])}>
                <ArrowDownToLine size={17} />
                دریافت اطلاعات سفارش
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </LoraniqShell>
  );
}

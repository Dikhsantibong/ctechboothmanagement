import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Building2,
    CreditCard,
    Users,
    Ticket,
    TrendingUp,
    TrendingDown,
    DollarSign,
    AlertTriangle,
    Clock,
    CheckCircle2,
    ArrowRight,
    Activity,
    BarChart3,
    UserPlus,
} from 'lucide-react';

interface Statistic {
    total_tenants: number;
    active_tenants: number;
    trial_tenants: number;
    suspended_tenants: number;
    inactive_tenants: number;
    active_subscriptions: number;
    expired_subscriptions: number;
    expiring_subscriptions: number;
    total_revenue: number;
    monthly_revenue: number;
    pending_payments: number;
    open_tickets: number;
    resolved_tickets_month: number;
}

interface GrowthItem {
    month: string;
    count: number;
}

interface RevenueItem {
    month: string;
    amount: number;
}

interface Plan {
    id: number;
    name: string;
    price: number;
    currency: string;
    active_subscribers: number;
}

interface RecentTenant {
    id: number;
    business_name: string;
    owner_name: string;
    status: string;
    created_at: string;
}

interface ActivityLog {
    id: number;
    action: string;
    module: string;
    description: string;
    logged_at: string;
    user?: { name: string };
}

interface DashboardProps {
    statistics: Statistic;
    tenant_growth: GrowthItem[];
    revenue_chart: RevenueItem[];
    top_plans: Plan[];
    recent_tenants: RecentTenant[];
    recent_logs: ActivityLog[];
}

function formatCurrency(amount: number, currency: string = 'IDR'): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
}).format(amount);
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function formatTimeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Baru saja';
    if (mins < 60) return `${mins} menit lalu`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
}

function StatusBadge({ status }: { status: string }) {
    const config: Record<string, { label: string; className: string }> = {
        active: { label: 'Aktif', className: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25' },
        trial: { label: 'Trial', className: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/25' },
        suspended: { label: 'Suspend', className: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25' },
        inactive: { label: 'Nonaktif', className: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-400 border-zinc-500/25' },
    };
    const c = config[status] || config.inactive;
    return <Badge variant="outline" className={c.className}>{c.label}</Badge>;
}

// Simple bar chart built with pure Tailwind
function BarChart({ data, valueKey, labelKey, color = 'bg-primary' }: {
    data: any[];
    valueKey: string;
    labelKey: string;
    color?: string;
}) {
    const maxVal = Math.max(...data.map((d) => Number(d[valueKey]) || 0), 1);
    return (
        <div className="flex items-end gap-2 h-40">
            {data.map((item, i) => {
                const val = Number(item[valueKey]) || 0;
                const pct = Math.max((val / maxVal) * 100, 2);
                return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-semibold text-muted-foreground">{val}</span>
                        <div className="w-full flex items-end justify-center" style={{ height: '120px' }}>
                            <div
                                className={`w-full max-w-10 rounded-t-md transition-all duration-500 ${color}`}
                                style={{ height: `${pct}%`, minHeight: '4px' }}
                            />
                        </div>
                        <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                            {String(item[labelKey]).split(' ')[0]}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

// Donut-style stat using CSS conic gradient
function DonutStat({ segments, total, label }: {
    segments: { value: number; color: string; label: string }[];
    total: number;
    label: string;
}) {
    let cumulativePct = 0;
    const gradientParts: string[] = [];
    segments.forEach((seg) => {
        const pct = total > 0 ? (seg.value / total) * 100 : 0;
        gradientParts.push(`${seg.color} ${cumulativePct}% ${cumulativePct + pct}%`);
        cumulativePct += pct;
    });
    if (cumulativePct < 100) {
        gradientParts.push(`#e5e7eb ${cumulativePct}% 100%`);
    }
    const gradient = `conic-gradient(${gradientParts.join(', ')})`;

    return (
        <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 shrink-0">
                <div
                    className="w-full h-full rounded-full"
                    style={{ background: gradient }}
                />
                <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">{total}</span>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">{label}</span>
                {segments.map((seg, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                        <span className="text-xs text-muted-foreground">{seg.label}: <strong className="text-foreground">{seg.value}</strong></span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Dashboard({ statistics, tenant_growth, revenue_chart, top_plans, recent_tenants, recent_logs }: DashboardProps) {
    const stats = statistics;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-4">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Ringkasan dan monitoring C-Tech Booth Management System</p>
                </div>

                {/* KPI Cards Row */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tenant</CardTitle>
                            <Building2 className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_tenants}</div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                                    <TrendingUp className="h-3 w-3" />
                                    {stats.active_tenants} aktif
                                </span>
                                <span className="text-xs text-muted-foreground">• {stats.trial_tenants} trial</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Langganan Aktif</CardTitle>
                            <Users className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.active_subscriptions}</div>
                            <div className="flex items-center gap-2 mt-1">
                                {stats.expiring_subscriptions > 0 ? (
                                    <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                                        <AlertTriangle className="h-3 w-3" />
                                        {stats.expiring_subscriptions} akan berakhir
                                    </span>
                                ) : (
                                    <span className="text-xs text-muted-foreground">Semua aman</span>
                                )}
                                <span className="text-xs text-muted-foreground">• {stats.expired_subscriptions} expired</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-bl-full" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Pendapatan Bulan Ini</CardTitle>
                            <DollarSign className="h-4 w-4 text-violet-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{formatCurrency(stats.monthly_revenue)}</div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">
                                    Total: {formatCurrency(stats.total_revenue)}
                                </span>
                                {stats.pending_payments > 0 && (
                                    <span className="text-xs text-amber-600 dark:text-amber-400">
                                        • {formatCurrency(stats.pending_payments)} pending
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-500/10 to-transparent rounded-bl-full" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Tiket Support</CardTitle>
                            <Ticket className="h-4 w-4 text-rose-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.open_tickets}</div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">Tiket terbuka</span>
                                <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                                    <CheckCircle2 className="h-3 w-3" />
                                    {stats.resolved_tickets_month} selesai bulan ini
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid gap-4 lg:grid-cols-7">
                    {/* Revenue Chart */}
                    <Card className="lg:col-span-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-violet-500" />
                                    Pendapatan 6 Bulan Terakhir
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {revenue_chart && revenue_chart.length > 0 ? (
                                <BarChart
                                    data={revenue_chart.map((r) => ({ ...r, display: formatCurrency(r.amount).replace('Rp', '').trim() }))}
                                    valueKey="amount"
                                    labelKey="month"
                                    color="bg-violet-500"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                                    Belum ada data pendapatan
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Tenant Distribution */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-emerald-500" />
                                Distribusi Tenant
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-6">
                            <DonutStat
                                total={stats.total_tenants}
                                label="Berdasarkan Status"
                                segments={[
                                    { value: stats.active_tenants, color: '#10b981', label: 'Aktif' },
                                    { value: stats.trial_tenants, color: '#3b82f6', label: 'Trial' },
                                    { value: stats.suspended_tenants, color: '#f59e0b', label: 'Suspend' },
                                    { value: stats.inactive_tenants, color: '#6b7280', label: 'Nonaktif' },
                                ]}
                            />
                            <DonutStat
                                total={stats.active_subscriptions + stats.expired_subscriptions + stats.expiring_subscriptions}
                                label="Berdasarkan Langganan"
                                segments={[
                                    { value: stats.active_subscriptions, color: '#10b981', label: 'Aktif' },
                                    { value: stats.expiring_subscriptions, color: '#f59e0b', label: 'Segera berakhir' },
                                    { value: stats.expired_subscriptions, color: '#ef4444', label: 'Kedaluwarsa' },
                                ]}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Tenant Growth + Top Plans */}
                <div className="grid gap-4 lg:grid-cols-7">
                    <Card className="lg:col-span-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <UserPlus className="h-4 w-4 text-emerald-500" />
                                    Pertumbuhan Tenant 6 Bulan
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {tenant_growth && tenant_growth.length > 0 ? (
                                <BarChart
                                    data={tenant_growth}
                                    valueKey="count"
                                    labelKey="month"
                                    color="bg-emerald-500"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                                    Belum ada data pertumbuhan
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-3">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-blue-500" />
                                Paket Populer
                            </CardTitle>
                            <Link href="/admin/subscription-plans" className="text-xs text-primary hover:underline flex items-center gap-1">
                                Lihat Semua <ArrowRight className="h-3 w-3" />
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {top_plans && top_plans.length > 0 ? (
                                <div className="space-y-3">
                                    {top_plans.map((plan, i) => (
                                        <div key={plan.id} className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0">
                                                {i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium truncate">{plan.name}</div>
                                                <div className="text-xs text-muted-foreground">{formatCurrency(plan.price, plan.currency)}</div>
                                            </div>
                                            <Badge variant="secondary" className="shrink-0">{plan.active_subscribers} subscriber</Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                                    Belum ada paket langganan
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Tenants + Activity Logs */}
                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-emerald-500" />
                                Tenant Terbaru
                            </CardTitle>
                            <Link href="/admin/tenants" className="text-xs text-primary hover:underline flex items-center gap-1">
                                Lihat Semua <ArrowRight className="h-3 w-3" />
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {recent_tenants && recent_tenants.length > 0 ? (
                                <div className="space-y-3">
                                    {recent_tenants.map((tenant) => (
                                        <Link key={tenant.id} href={`/admin/tenants/${tenant.id}`} className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-sm font-bold shrink-0">
                                                {tenant.business_name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium truncate">{tenant.business_name}</div>
                                                <div className="text-xs text-muted-foreground">{tenant.owner_name} • {formatDate(tenant.created_at)}</div>
                                            </div>
                                            <StatusBadge status={tenant.status} />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                                    Belum ada tenant terdaftar
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Activity className="h-4 w-4 text-amber-500" />
                                Aktivitas Terbaru
                            </CardTitle>
                            <Link href="/admin/activity-logs" className="text-xs text-primary hover:underline flex items-center gap-1">
                                Lihat Semua <ArrowRight className="h-3 w-3" />
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {recent_logs && recent_logs.length > 0 ? (
                                <div className="space-y-3">
                                    {recent_logs.map((log) => (
                                        <div key={log.id} className="flex items-start gap-3 p-2 -mx-2 rounded-lg">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                                                <Activity className="h-3.5 w-3.5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm truncate">{log.description}</div>
                                                <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                                    <Clock className="h-3 w-3" />
                                                    {formatTimeAgo(log.logged_at)}
                                                    {log.user && <span>• {log.user.name}</span>}
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] shrink-0">{log.module}</Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                                    Belum ada aktivitas tercatat
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Links */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: 'Kelola Tenant', href: '/admin/tenants', icon: Building2, color: 'text-emerald-500' },
                        { label: 'Paket Langganan', href: '/admin/subscription-plans', icon: CreditCard, color: 'text-blue-500' },
                        { label: 'Support Tickets', href: '/admin/support-tickets', icon: Ticket, color: 'text-rose-500' },
                        { label: 'Activity Logs', href: '/admin/activity-logs', icon: Activity, color: 'text-amber-500' },
                    ].map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Card className="hover:bg-muted/50 transition-colors cursor-pointer group">
                                <CardContent className="flex items-center gap-3 py-4">
                                    <item.icon className={`h-5 w-5 ${item.color}`} />
                                    <span className="text-sm font-medium flex-1">{item.label}</span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
    ],
};

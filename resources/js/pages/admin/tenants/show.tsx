import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, ShieldCheck, ShieldAlert, CreditCard, Activity, Calendar, Mail, Phone, MapPin, Building2, User } from 'lucide-react';

interface SubscriptionPlan {
    id: number;
    name: string;
    price: number;
    currency: string;
    duration_days: number;
}

interface TenantSubscription {
    id: number;
    subscription_number: string;
    starts_at: string;
    ends_at: string;
    status: string;
    amount: number;
    currency: string;
    subscription_plan: SubscriptionPlan;
    payments?: any[];
}

interface ActivityLog {
    id: number;
    action: string;
    module: string;
    description: string;
    logged_at: string;
    user?: {
        name: string;
    };
}

interface Tenant {
    id: number;
    business_name: string;
    owner_name: string;
    email: string;
    phone: string;
    city: string;
    address: string | null;
    status: string;
    trial_ends_at: string | null;
    slug: string;
    created_at: string;
    activeSubscription?: TenantSubscription | null;
    subscriptions?: TenantSubscription[];
}

interface PageProps {
    tenant: Tenant;
    recentActivity: ActivityLog[];
}

export default function TenantShow({ tenant, recentActivity }: PageProps) {
    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            active: 'default',
            trial: 'secondary',
            suspended: 'destructive',
            inactive: 'outline',
        };
        const labels: Record<string, string> = {
            active: 'Aktif',
            trial: 'Trial',
            suspended: 'Suspend',
            inactive: 'Nonaktif',
        };
        return <Badge variant={variants[status] || 'outline'}>{labels[status] || status}</Badge>;
    };

    const getSubscriptionStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            active: 'default',
            trial: 'secondary',
            expired: 'destructive',
            suspended: 'destructive',
            cancelled: 'outline',
        };
        const labels: Record<string, string> = {
            active: 'Aktif',
            trial: 'Trial',
            expired: 'Expired',
            suspended: 'Suspend',
            cancelled: 'Cancelled',
        };
        return <Badge variant={variants[status] || 'outline'}>{labels[status] || status}</Badge>;
    };

    
    return (
        <>
            <Head title={tenant.business_name} />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/tenants">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{tenant.business_name}</h1>
                            <p className="text-muted-foreground">Detail informasi tenant</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/admin/tenants/${tenant.id}/subscriptions/create`}>
                            <Button variant="outline">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Buat Langganan
                            </Button>
                        </Link>
                        {tenant.status === 'active' ? (
                            <button
                                onClick={() => {
                                    if (confirm('Apakah Anda yakin ingin men-suspend tenant ini?')) {
                                        router.post(`/admin/tenants/${tenant.id}/suspend`);
                                    }
                                }}
                            >
                                <Button variant="outline">
                                    <ShieldAlert className="mr-2 h-4 w-4 text-destructive" />
                                    Suspend
                                </Button>
                            </button>
                        ) : tenant.status === 'suspended' ? (
                            <button
                                onClick={() => {
                                    if (confirm('Apakah Anda yakin ingin mengaktifkan tenant ini?')) {
                                        router.post(`/admin/tenants/${tenant.id}/activate`);
                                    }
                                }}
                            >
                                <Button variant="outline">
                                    <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
                                    Aktifkan
                                </Button>
                            </button>
                        ) : null}
                        <Link href={`/admin/tenants/${tenant.id}/edit`}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Tenant</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <Building2 className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Nama Usaha</p>
                                        <p className="text-sm text-muted-foreground">{tenant.business_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <User className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Pemilik</p>
                                        <p className="text-sm text-muted-foreground">{tenant.owner_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Email</p>
                                        <p className="text-sm text-muted-foreground">{tenant.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Telepon</p>
                                        <p className="text-sm text-muted-foreground">{tenant.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Kota</p>
                                        <p className="text-sm text-muted-foreground">{tenant.city}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Tanggal Dibuat</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(tenant.created_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {tenant.address && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Alamat</p>
                                        <p className="text-sm text-muted-foreground">{tenant.address}</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">Status:</p>
                                {getStatusBadge(tenant.status)}
                            </div>
                            {tenant.trial_ends_at && (
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium">Trial Berakhir:</p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(tenant.trial_ends_at).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Status Langganan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {tenant.activeSubscription ? (
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium">Paket</p>
                                        <p className="text-lg font-bold">{tenant.activeSubscription.subscription_plan.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Nomor Subscription</p>
                                        <p className="text-sm text-muted-foreground">{tenant.activeSubscription.subscription_number}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        {getSubscriptionStatusBadge(tenant.activeSubscription.status)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Tanggal Mulai</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(tenant.activeSubscription.starts_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Tanggal Berakhir</p>
                                        <p className="text-sm text-muted-foreground">
                                            {tenant.activeSubscription.ends_at
                                                ? new Date(tenant.activeSubscription.ends_at).toLocaleDateString('id-ID')
                                                : '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Harga</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: tenant.activeSubscription.currency,
                                                maximumFractionDigits: 0,
}).format(tenant.activeSubscription.amount)}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Tidak ada langganan aktif</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Langganan</CardTitle>
                            <Link href={`/admin/tenants/${tenant.id}/subscriptions`}>
                                <Button variant="outline" size="sm">
                                    Lihat Semua
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {tenant.subscriptions && tenant.subscriptions.length > 0 ? (
                                <div className="space-y-3">
                                    {tenant.subscriptions.slice(0, 3).map((subscription) => (
                                        <div key={subscription.id} className="flex items-center justify-between rounded-lg border p-3">
                                            <div>
                                                <p className="font-medium">{subscription.subscription_plan.name}</p>
                                                <p className="text-sm text-muted-foreground">{subscription.subscription_number}</p>
                                            </div>
                                            <div className="text-right">
                                                {getSubscriptionStatusBadge(subscription.status)}
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {new Date(subscription.starts_at).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Tidak ada langganan</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Aktivitas Terakhir</CardTitle>
                            <Link href={`/admin/tenants/${tenant.id}/activity`}>
                                <Button variant="outline" size="sm">
                                    Lihat Semua
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {recentActivity.length > 0 ? (
                                <div className="space-y-3">
                                    {recentActivity.slice(0, 5).map((log) => (
                                        <div key={log.id} className="flex items-start gap-3 rounded-lg border p-3">
                                            <Activity className="mt-1 h-4 w-4 text-muted-foreground" />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{log.description}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {log.module} - {log.action}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(log.logged_at).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Tidak ada aktivitas</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Pembayaran</CardTitle>
                        <Link href={`/admin/tenants/${tenant.id}/payments`}>
                            <Button variant="outline" size="sm">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Lihat Semua
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {tenant.activeSubscription && tenant.activeSubscription.payments && tenant.activeSubscription.payments.length > 0 ? (
                            <div className="space-y-3">
                                {tenant.activeSubscription.payments.slice(0, 5).map((payment: any) => (
                                    <div key={payment.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <p className="font-medium">{payment.payment_number}</p>
                                            <p className="text-sm text-muted-foreground">{payment.payment_method}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: payment.currency,
                                                    maximumFractionDigits: 0,
}).format(payment.amount)}
                                            </p>
                                            <Badge variant={payment.status === 'paid' ? 'default' : 'destructive'}>
                                                {payment.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Tidak ada pembayaran</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

TenantShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tenants', href: '/admin/tenants' },
        { title: 'Detail Tenant', href: '#' },
    ],
};

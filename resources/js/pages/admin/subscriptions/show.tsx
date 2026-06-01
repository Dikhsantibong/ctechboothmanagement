import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RefreshCw, AlertTriangle, CheckCircle, Clock, XCircle, PauseCircle, Calendar, CreditCard, User, Building2, Eye } from 'lucide-react';

interface Tenant {
    id: number;
    business_name: string;
    owner_name: string;
    email: string;
}

interface SubscriptionPlan {
    id: number;
    name: string;
    price: number;
    currency: string;
    duration_days: number;
    max_booths: number;
    max_users: number;
    storage_limit_mb: number;
}

interface Payment {
    id: number;
    payment_number: string;
    amount: number;
    currency: string;
    payment_method: string;
    status: string;
    paid_at: string | null;
    notes: string | null;
}

interface Subscription {
    id: number;
    subscription_number: string;
    starts_at: string;
    ends_at: string;
    status: string;
    amount: number;
    currency: string;
    remaining_days?: number;
    calculated_status?: string;
    tenant: Tenant;
    subscription_plan: SubscriptionPlan;
    payments: Payment[];
}

interface PageProps {
    subscription: Subscription;
}

export default function SubscriptionShow({ subscription }: PageProps) {
    const getStatusBadge = () => {
        const status = subscription.calculated_status || subscription.status;
        const variants: Record<string, any> = {
            trial: 'secondary',
            active: 'default',
            expiring: 'destructive',
            expired: 'destructive',
            suspended: 'outline',
            cancelled: 'outline',
        };
        const labels: Record<string, string> = {
            trial: 'Trial',
            active: 'Aktif',
            expiring: 'Akan Habis',
            expired: 'Expired',
            suspended: 'Suspend',
            cancelled: 'Cancelled',
        };
        const icons: Record<string, any> = {
            trial: Clock,
            active: CheckCircle,
            expiring: AlertTriangle,
            expired: XCircle,
            suspended: PauseCircle,
            cancelled: XCircle,
        };
        const Icon = icons[status] || Clock;
        
        return (
            <Badge variant={variants[status] || 'outline'} className="gap-1">
                <Icon className="h-3 w-3" />
                {labels[status] || status}
            </Badge>
        );
    };

    const getRemainingDaysBadge = () => {
        if (subscription.remaining_days === undefined || subscription.remaining_days === null) return null;
        
        if (subscription.remaining_days <= 0) {
            return <Badge variant="destructive">Expired</Badge>;
        }
        
        if (subscription.remaining_days <= 7) {
            return <Badge variant="destructive">{subscription.remaining_days} hari tersisa</Badge>;
        }
        
        if (subscription.remaining_days <= 30) {
            return <Badge variant="secondary">{subscription.remaining_days} hari tersisa</Badge>;
        }
        
        return <Badge variant="default">{subscription.remaining_days} hari tersisa</Badge>;
    };

    const getPaymentStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            paid: 'default',
            pending: 'secondary',
            failed: 'destructive',
            refunded: 'outline',
        };
        const labels: Record<string, string> = {
            paid: 'Paid',
            pending: 'Pending',
            failed: 'Failed',
            refunded: 'Refunded',
        };
        return <Badge variant={variants[status] || 'outline'}>{labels[status] || status}</Badge>;
    };

    const handleRenew = () => {
        if (confirm('Apakah Anda yakin ingin memperpanjang langganan ini?')) {
            router.post(`/admin/tenants/${subscription.tenant.id}/subscriptions/${subscription.id}/renew`);
        }
    };

    const handleCancel = () => {
        if (confirm('Apakah Anda yakin ingin membatalkan langganan ini?')) {
            router.post(`/admin/tenants/${subscription.tenant.id}/subscriptions/${subscription.id}/cancel`);
        }
    };

    const handleSuspend = () => {
        if (confirm('Apakah Anda yakin ingin men-suspend langganan ini?')) {
            router.post(`/admin/tenants/${subscription.tenant.id}/subscriptions/${subscription.id}/suspend`);
        }
    };

    const handleActivate = () => {
        if (confirm('Apakah Anda yakin ingin mengaktifkan langganan ini?')) {
            router.post(`/admin/tenants/${subscription.tenant.id}/subscriptions/${subscription.id}/activate`);
        }
    };

    
    return (
        <>
            <Head title={`Langganan - ${subscription.subscription_number}`} />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/subscriptions">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">Detail Langganan</h1>
                            <p className="text-muted-foreground">{subscription.subscription_number}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {(subscription.calculated_status === 'active' || subscription.calculated_status === 'expiring') && (
                            <Button onClick={handleRenew}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Perpanjang
                            </Button>
                        )}
                        {subscription.calculated_status === 'active' && (
                            <Button variant="outline" onClick={handleSuspend}>
                                Suspend
                            </Button>
                        )}
                        {subscription.calculated_status === 'suspended' && (
                            <Button variant="outline" onClick={handleActivate}>
                                Aktifkan
                            </Button>
                        )}
                        {(subscription.calculated_status === 'active' || subscription.calculated_status === 'expiring') && (
                            <Button variant="destructive" onClick={handleCancel}>
                                Batalkan
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Langganan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">Status:</p>
                                {getStatusBadge()}
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">Sisa Hari:</p>
                                {getRemainingDaysBadge()}
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <Building2 className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Tenant</p>
                                        <p className="text-sm text-muted-foreground">{subscription.tenant.business_name}</p>
                                        <p className="text-xs text-muted-foreground">{subscription.tenant.owner_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CreditCard className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Paket</p>
                                        <p className="text-sm text-muted-foreground">{subscription.subscription_plan.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Tanggal Mulai</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(subscription.starts_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Tanggal Berakhir</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(subscription.ends_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ringkasan Paket</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium">Harga Paket</p>
                                <p className="text-2xl font-bold">
                                    {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: subscription.currency,
                                        maximumFractionDigits: 0,
}).format(subscription.amount)}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <p className="text-sm text-muted-foreground">Durasi</p>
                                    <p className="text-sm font-medium">{subscription.subscription_plan.duration_days} hari</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-muted-foreground">Booth</p>
                                    <p className="text-sm font-medium">{subscription.subscription_plan.max_booths}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-muted-foreground">User</p>
                                    <p className="text-sm font-medium">{subscription.subscription_plan.max_users}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-muted-foreground">Storage</p>
                                    <p className="text-sm font-medium">{subscription.subscription_plan.storage_limit_mb} MB</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {subscription.payments.length > 0 ? (
                            <div className="space-y-3">
                                {subscription.payments.map((payment) => (
                                    <div key={payment.id} className="flex items-center justify-between rounded-lg border p-4">
                                        <div>
                                            <p className="font-medium">{payment.payment_number}</p>
                                            <p className="text-sm text-muted-foreground">{payment.payment_method}</p>
                                            {payment.notes && (
                                                <p className="text-xs text-muted-foreground mt-1">{payment.notes}</p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: payment.currency,
                                                    maximumFractionDigits: 0,
}).format(payment.amount)}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {getPaymentStatusBadge(payment.status)}
                                                {payment.paid_at && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(payment.paid_at).toLocaleDateString('id-ID')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Tidak ada pembayaran</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Tenant</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm font-medium">Nama Usaha</p>
                                <p className="text-sm text-muted-foreground">{subscription.tenant.business_name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Pemilik</p>
                                <p className="text-sm text-muted-foreground">{subscription.tenant.owner_name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm text-muted-foreground">{subscription.tenant.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href={`/admin/tenants/${subscription.tenant.id}`}>
                                    <Button variant="outline" size="sm">
                                        <Eye className="mr-2 h-4 w-4" />
                                        Lihat Tenant
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SubscriptionShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Langganan', href: '/admin/subscriptions' },
        { title: 'Detail Langganan', href: '#' },
    ],
};

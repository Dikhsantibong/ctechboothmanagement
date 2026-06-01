import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard } from 'lucide-react';

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
}

interface Tenant {
    id: number;
    business_name: string;
}

interface PageProps {
    tenant: Tenant;
    subscriptions: {
        data: TenantSubscription[];
        links: any[];
        current_page: number;
        last_page: number;
    };
}

export default function TenantSubscriptions({ tenant, subscriptions }: PageProps) {
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
            <Head title={`Langganan - ${tenant.business_name}`} />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/tenants/${tenant.id}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Riwayat Langganan</h1>
                        <p className="text-muted-foreground">Riwayat langganan untuk {tenant.business_name}</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Langganan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-3 text-left text-sm font-medium">Nomor</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Paket</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Tanggal Mulai</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Tanggal Berakhir</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscriptions.data.map((subscription) => (
                                        <tr key={subscription.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 text-sm font-medium">{subscription.subscription_number}</td>
                                            <td className="px-4 py-3 text-sm">{subscription.subscription_plan.name}</td>
                                            <td className="px-4 py-3 text-sm">{getSubscriptionStatusBadge(subscription.status)}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Date(subscription.starts_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {subscription.ends_at
                                                    ? new Date(subscription.ends_at).toLocaleDateString('id-ID')
                                                    : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: subscription.currency,
                                                    maximumFractionDigits: 0,
}).format(subscription.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                    {subscriptions.data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                                Tidak ada langganan ditemukan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {subscriptions.last_page > 1 && (
                    <div className="flex justify-end gap-2">
                        {subscriptions.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`rounded px-3 py-1 text-sm ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted hover:bg-muted/80'
                                } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

TenantSubscriptions.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tenants', href: '/admin/tenants' },
        { title: 'Langganan', href: '#' },
    ],
};

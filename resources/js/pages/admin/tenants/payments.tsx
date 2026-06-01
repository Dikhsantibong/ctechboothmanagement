import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard } from 'lucide-react';

interface SubscriptionPlan {
    id: number;
    name: string;
}

interface TenantSubscription {
    id: number;
    subscription_number: string;
    subscription_plan: SubscriptionPlan;
}

interface Payment {
    id: number;
    payment_number: string;
    amount: number;
    currency: string;
    payment_method: string;
    status: string;
    paid_at: string | null;
    tenant_subscription: TenantSubscription;
}

interface Tenant {
    id: number;
    business_name: string;
}

interface PageProps {
    tenant: Tenant;
    payments: {
        data: Payment[];
        links: any[];
        current_page: number;
        last_page: number;
    };
}

export default function TenantPayments({ tenant, payments }: PageProps) {
    const getPaymentStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            paid: 'default',
            pending: 'secondary',
            failed: 'destructive',
            refunded: 'outline',
            cancelled: 'outline',
        };
        const labels: Record<string, string> = {
            paid: 'Paid',
            pending: 'Pending',
            failed: 'Failed',
            refunded: 'Refunded',
            cancelled: 'Cancelled',
        };
        return <Badge variant={variants[status] || 'outline'}>{labels[status] || status}</Badge>;
    };

    
    return (
        <>
            <Head title={`Pembayaran - ${tenant.business_name}`} />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/tenants/${tenant.id}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Riwayat Pembayaran</h1>
                        <p className="text-muted-foreground">Riwayat pembayaran untuk {tenant.business_name}</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-3 text-left text-sm font-medium">Nomor Pembayaran</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Subscription</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Metode</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Tanggal Bayar</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Nominal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.data.map((payment) => (
                                        <tr key={payment.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 text-sm font-medium">{payment.payment_number}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {payment.tenant_subscription.subscription_plan.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{payment.payment_method}</td>
                                            <td className="px-4 py-3 text-sm">{getPaymentStatusBadge(payment.status)}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {payment.paid_at
                                                    ? new Date(payment.paid_at).toLocaleDateString('id-ID')
                                                    : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: payment.currency,
                                                    maximumFractionDigits: 0,
}).format(payment.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                    {payments.data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                                Tidak ada pembayaran ditemukan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {payments.last_page > 1 && (
                    <div className="flex justify-end gap-2">
                        {payments.links.map((link, index) => (
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

TenantPayments.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tenants', href: '/admin/tenants' },
        { title: 'Pembayaran', href: '#' },
    ],
};

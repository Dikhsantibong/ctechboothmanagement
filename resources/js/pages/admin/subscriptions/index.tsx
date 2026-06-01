import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowUpDown, Eye, RefreshCw, AlertTriangle, CheckCircle, Clock, XCircle, PauseCircle } from 'lucide-react';

interface Tenant {
    id: number;
    business_name: string;
}

interface SubscriptionPlan {
    id: number;
    name: string;
    price: number;
    currency: string;
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
}

interface PageProps {
    subscriptions: {
        data: Subscription[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from?: number;
        to?: number;
    };
    filters: {
        search?: string;
        status?: string;
        sort?: string;
        direction?: string;
    };
}

export default function SubscriptionIndex({ subscriptions, filters }: PageProps) {
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        router.get('/admin/subscriptions', {
            search: formData.get('search'),
            status: filters.status,
            sort: filters.sort,
            direction: filters.direction,
        }, { preserveState: true });
    };

    const handleFilter = (key: string, value: string) => {
        router.get('/admin/subscriptions', {
            ...filters,
            [key]: value,
        }, { preserveState: true });
    };

    const handleSort = (field: string) => {
        const direction = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get('/admin/subscriptions', {
            ...filters,
            sort: field,
            direction,
        }, { preserveState: true });
    };

    const getStatusBadge = (subscription: Subscription) => {
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

    const getRemainingDaysBadge = (remainingDays?: number) => {
        if (remainingDays === undefined || remainingDays === null) return null;
        
        if (remainingDays <= 0) {
            return <Badge variant="destructive">Expired</Badge>;
        }
        
        if (remainingDays <= 7) {
            return <Badge variant="destructive">{remainingDays} hari tersisa</Badge>;
        }
        
        if (remainingDays <= 30) {
            return <Badge variant="secondary">{remainingDays} hari tersisa</Badge>;
        }
        
        return <Badge variant="default">{remainingDays} hari tersisa</Badge>;
    };

    
    return (
        <>
            <Head title="Langganan" />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Manajemen Langganan</h1>
                        <p className="text-muted-foreground">Kelola semua langganan tenant</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Filter & Search</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        name="search"
                                        placeholder="Cari nama tenant..."
                                        defaultValue={filters.search}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select
                                value={filters.status || 'all'}
                                onValueChange={(value) => handleFilter('status', value === 'all' ? '' : value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="active">Aktif</SelectItem>
                                    <SelectItem value="trial">Trial</SelectItem>
                                    <SelectItem value="expiring">Akan Habis</SelectItem>
                                    <SelectItem value="expired">Expired</SelectItem>
                                    <SelectItem value="suspended">Suspend</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="submit">Cari</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            <button
                                                onClick={() => handleSort('created_at')}
                                                className="flex items-center gap-1 hover:text-primary"
                                            >
                                                Tenant
                                                <ArrowUpDown className="h-3 w-3" />
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Paket</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Harga</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Sisa Hari</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            <button
                                                onClick={() => handleSort('ends_at')}
                                                className="flex items-center gap-1 hover:text-primary"
                                            >
                                                Tanggal Berakhir
                                                <ArrowUpDown className="h-3 w-3" />
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscriptions.data.map((subscription) => (
                                        <tr key={subscription.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 text-sm font-medium">{subscription.tenant.business_name}</td>
                                            <td className="px-4 py-3 text-sm">{subscription.subscription_plan.name}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: subscription.currency,
                                                    maximumFractionDigits: 0,
}).format(subscription.amount)}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{getStatusBadge(subscription)}</td>
                                            <td className="px-4 py-3 text-sm">{getRemainingDaysBadge(subscription.remaining_days)}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Date(subscription.ends_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/subscriptions/${subscription.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    {(subscription.calculated_status === 'active' || subscription.calculated_status === 'expiring') && (
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Apakah Anda yakin ingin memperpanjang langganan ini?')) {
                                                                    router.post(`/admin/tenants/${subscription.tenant.id}/subscriptions/${subscription.id}/renew`);
                                                                }
                                                            }}
                                                        >
                                                            <Button variant="ghost" size="sm" title="Perpanjang">
                                                                <RefreshCw className="h-4 w-4" />
                                                            </Button>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {subscriptions.data.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-8 text-center text-sm text-muted-foreground">
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
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Menampilkan {subscriptions.from} sampai {subscriptions.to} dari {subscriptions.total} langganan
                        </p>
                        <div className="flex gap-2">
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
                    </div>
                )}
            </div>
        </>
    );
}

SubscriptionIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Langganan', href: '/admin/subscriptions' },
    ],
};

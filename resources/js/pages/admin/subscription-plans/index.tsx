import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, ArrowUpDown, Eye, Edit, Trash2, Power, PowerOff } from 'lucide-react';

interface SubscriptionPlanFeature {
    id: number;
    feature_name: string;
    is_enabled: boolean;
}

interface SubscriptionPlan {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    currency: string;
    duration_days: number;
    billing_cycle: string;
    is_active: boolean;
    is_trial: boolean;
    max_booths: number;
    max_users: number;
    storage_limit_mb: number;
    features: SubscriptionPlanFeature[];
}

interface PageProps {
    plans: SubscriptionPlan[];
    filters: {
        status?: string;
        sort?: string;
        direction?: string;
    };
}

export default function SubscriptionPlanIndex({ plans, filters }: PageProps) {
    const handleFilter = (key: string, value: string) => {
        router.get('/admin/subscription-plans', {
            ...filters,
            [key]: value,
        }, { preserveState: true });
    };

    const handleSort = (field: string) => {
        const direction = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get('/admin/subscription-plans', {
            ...filters,
            sort: field,
            direction,
        }, { preserveState: true });
    };

    const getStatusBadge = (plan: SubscriptionPlan) => {
        if (!plan.is_active) {
            return <Badge variant="destructive">Nonaktif</Badge>;
        }
        if (plan.is_trial) {
            return <Badge variant="secondary">Trial</Badge>;
        }
        return <Badge variant="default">Aktif</Badge>;
    };

    const toggleStatus = (planId: number) => {
        router.post(`/admin/subscription-plans/${planId}/toggle-status`);
    };

    const deletePlan = (planId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
            router.delete(`/admin/subscription-plans/${planId}`);
        }
    };

    
    return (
        <>
            <Head title="Paket Langganan" />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Manajemen Paket Langganan</h1>
                        <p className="text-muted-foreground">Kelola paket langganan SaaS</p>
                    </div>
                    <Link href="/admin/subscription-plans/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Paket
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
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
                                    <SelectItem value="inactive">Nonaktif</SelectItem>
                                    <SelectItem value="trial">Trial</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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
                                                onClick={() => handleSort('name')}
                                                className="flex items-center gap-1 hover:text-primary"
                                            >
                                                Nama Paket
                                                <ArrowUpDown className="h-3 w-3" />
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Deskripsi</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            <button
                                                onClick={() => handleSort('price')}
                                                className="flex items-center gap-1 hover:text-primary"
                                            >
                                                Harga
                                                <ArrowUpDown className="h-3 w-3" />
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Durasi</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Booths</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Users</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Fitur</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {plans.map((plan) => (
                                        <tr key={plan.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 text-sm font-medium">{plan.name}</td>
                                            <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">
                                                {plan.description || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: plan.currency,
                                                    maximumFractionDigits: 0,
}).format(plan.price)}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{plan.duration_days} hari</td>
                                            <td className="px-4 py-3 text-sm">{plan.max_booths}</td>
                                            <td className="px-4 py-3 text-sm">{plan.max_users}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {plan.features.filter(f => f.is_enabled).length} fitur
                                            </td>
                                            <td className="px-4 py-3 text-sm">{getStatusBadge(plan)}</td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/subscription-plans/${plan.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/admin/subscription-plans/${plan.id}/edit`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <button
                                                        onClick={() => toggleStatus(plan.id)}
                                                        title={plan.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                                    >
                                                        <Button variant="ghost" size="sm">
                                                            {plan.is_active ? (
                                                                <PowerOff className="h-4 w-4 text-destructive" />
                                                            ) : (
                                                                <Power className="h-4 w-4 text-green-600" />
                                                            )}
                                                        </Button>
                                                    </button>
                                                    <button
                                                        onClick={() => deletePlan(plan.id)}
                                                        title="Hapus"
                                                    >
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {plans.length === 0 && (
                                        <tr>
                                            <td colSpan={9} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                                Tidak ada paket langganan ditemukan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SubscriptionPlanIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Paket Langganan', href: '/admin/subscription-plans' },
    ],
};

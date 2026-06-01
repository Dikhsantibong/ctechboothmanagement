import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, ArrowUpDown, Eye, Edit, Trash2, ShieldCheck, ShieldAlert } from 'lucide-react';

interface Tenant {
    id: number;
    business_name: string;
    owner_name: string;
    email: string;
    phone: string;
    city: string;
    status: string;
    created_at: string;
}

interface PageProps {
    tenants: {
        data: Tenant[];
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

export default function TenantIndex({ tenants, filters }: PageProps) {
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        router.get('/admin/tenants', {
            search: formData.get('search'),
            status: filters.status,
            sort: filters.sort,
            direction: filters.direction,
        }, { preserveState: true });
    };

    const handleFilter = (key: string, value: string) => {
        router.get('/admin/tenants', {
            ...filters,
            [key]: value,
        }, { preserveState: true });
    };

    const handleSort = (field: string) => {
        const direction = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get('/admin/tenants', {
            ...filters,
            sort: field,
            direction,
        }, { preserveState: true });
    };

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

    
    return (
        <>
            <Head title="Tenants" />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Manajemen Tenant</h1>
                        <p className="text-muted-foreground">Kelola semua tenant SaaS</p>
                    </div>
                    <Link href="/admin/tenants/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Tenant
                        </Button>
                    </Link>
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
                                        placeholder="Cari nama usaha, pemilik, email, atau kota..."
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
                                    <SelectItem value="suspended">Suspend</SelectItem>
                                    <SelectItem value="inactive">Nonaktif</SelectItem>
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
                                                onClick={() => handleSort('business_name')}
                                                className="flex items-center gap-1 hover:text-primary"
                                            >
                                                Nama Usaha
                                                <ArrowUpDown className="h-3 w-3" />
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Pemilik</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Kota</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            <button
                                                onClick={() => handleSort('created_at')}
                                                className="flex items-center gap-1 hover:text-primary"
                                            >
                                                Tanggal Dibuat
                                                <ArrowUpDown className="h-3 w-3" />
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tenants.data.map((tenant) => (
                                        <tr key={tenant.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 text-sm font-medium">{tenant.business_name}</td>
                                            <td className="px-4 py-3 text-sm">{tenant.owner_name}</td>
                                            <td className="px-4 py-3 text-sm">{tenant.email}</td>
                                            <td className="px-4 py-3 text-sm">{tenant.city}</td>
                                            <td className="px-4 py-3 text-sm">{getStatusBadge(tenant.status)}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Date(tenant.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/tenants/${tenant.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/admin/tenants/${tenant.id}/edit`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    {tenant.status === 'active' ? (
                                                        <Button
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={() => {
                                                                if (confirm('Apakah Anda yakin ingin men-suspend tenant ini?')) {
                                                                    router.post(`/admin/tenants/${tenant.id}/suspend`);
                                                                }
                                                            }}
                                                        >
                                                            <ShieldAlert className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    ) : tenant.status === 'suspended' ? (
                                                        <Button
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={() => {
                                                                if (confirm('Apakah Anda yakin ingin mengaktifkan tenant ini?')) {
                                                                    router.post(`/admin/tenants/${tenant.id}/activate`);
                                                                }
                                                            }}
                                                        >
                                                            <ShieldCheck className="h-4 w-4 text-green-600" />
                                                        </Button>
                                                    ) : null}
                                                    <Button
                                                        variant="ghost" 
                                                        size="sm"
                                                        onClick={() => {
                                                            if (confirm('Apakah Anda yakin ingin menghapus tenant ini?')) {
                                                                router.delete(`/admin/tenants/${tenant.id}`);
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {tenants.data.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                                Tidak ada tenant ditemukan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {tenants.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Menampilkan {tenants.from} sampai {tenants.to} dari {tenants.total} tenant
                        </p>
                        <div className="flex gap-2">
                            {tenants.links.map((link, index) => (
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

TenantIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Tenants', href: '/admin/tenants' },
    ],
};

import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Plus, 
    Search, 
    Eye, 
    Edit, 
    Trash2, 
    FileText, 
    Filter 
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Invoice {
    id: number;
    invoice_number: string;
    customer_name: string;
    tenant: {
        business_name: string;
    } | null;
    issue_date: string;
    due_date: string;
    status: 'draft' | 'sent' | 'paid' | 'cancelled';
    total: number;
}

export default function InvoiceIndex({ invoices, filters }: any) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.get('/admin/invoices', {
            search: formData.get('search'),
            status: formData.get('status')
        }, { preserveState: true });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid': return <Badge variant="default" className="bg-green-600">Lunas</Badge>;
            case 'sent': return <Badge variant="secondary" className="bg-blue-600 text-white">Terkirim</Badge>;
            case 'draft': return <Badge variant="outline">Draft</Badge>;
            case 'cancelled': return <Badge variant="destructive">Dibatalkan</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <>
            <Head title="Manajemen Invoice" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Invoice</h1>
                        <p className="text-sm text-muted-foreground">Kelola tagihan untuk kustomer.</p>
                    </div>
                    <Link href="/admin/invoices/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Buat Invoice
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <CardTitle className="text-lg">Daftar Invoice</CardTitle>
                            
                            <form onSubmit={handleSearch} className="flex w-full sm:w-auto items-center gap-2">
                                <div className="relative flex-1 sm:w-64">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        name="search"
                                        placeholder="Cari nomor atau nama..."
                                        className="pl-8"
                                        defaultValue={filters.search}
                                    />
                                </div>
                                <Select name="status" defaultValue={filters.status || 'all'}>
                                    <SelectTrigger className="w-[130px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Status</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="sent">Terkirim</SelectItem>
                                        <SelectItem value="paid">Lunas</SelectItem>
                                        <SelectItem value="cancelled">Dibatalkan</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button type="submit" variant="secondary">Filter</Button>
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left font-medium text-muted-foreground">
                                        <th className="pb-3 pr-4">No. Invoice</th>
                                        <th className="pb-3 px-4">Kustomer / Tenant</th>
                                        <th className="pb-3 px-4">Tgl Terbit</th>
                                        <th className="pb-3 px-4">Status</th>
                                        <th className="pb-3 px-4 text-right">Total</th>
                                        <th className="pb-3 pl-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.data.map((invoice: Invoice) => (
                                        <tr key={invoice.id} className="border-b">
                                            <td className="py-3 pr-4 font-medium">{invoice.invoice_number}</td>
                                            <td className="py-3 px-4">
                                                <div>{invoice.customer_name}</div>
                                                {invoice.tenant && (
                                                    <div className="text-xs text-muted-foreground">{invoice.tenant?.business_name || '-'}</div>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">{new Date(invoice.issue_date).toLocaleDateString('id-ID')}</td>
                                            <td className="py-3 px-4">{getStatusBadge(invoice.status)}</td>
                                            <td className="py-3 px-4 text-right font-medium">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(invoice.total)}
                                            </td>
                                            <td className="py-3 pl-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/invoices/${invoice.id}`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/admin/invoices/${invoice.id}/edit`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => {
                                                            if (confirm('Yakin ingin menghapus invoice ini?')) {
                                                                router.delete(`/admin/invoices/${invoice.id}`);
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {invoices.data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                                Tidak ada invoice ditemukan.
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

InvoiceIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Invoices', href: '/admin/invoices' },
    ],
};

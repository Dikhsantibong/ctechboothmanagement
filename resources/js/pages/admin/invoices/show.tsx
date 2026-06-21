import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, Edit, Trash2, Mail, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AppLogoIcon from '@/components/app-logo-icon';

interface InvoiceItem {
    id: number;
    item_name: string;
    description: string | null;
    quantity: number;
    unit_price: number;
    total_price: number;
}

interface Invoice {
    id: number;
    invoice_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    customer_address: string | null;
    issue_date: string;
    due_date: string;
    status: 'draft' | 'sent' | 'paid' | 'cancelled';
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    notes: string | null;
    tenant: {
        business_name: string;
        owner_name: string;
    } | null;
    items: InvoiceItem[];
}

export default function InvoiceShow({ invoice }: { invoice: Invoice }) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid': return <Badge variant="default" className="bg-green-600">Lunas</Badge>;
            case 'sent': return <Badge variant="secondary" className="bg-blue-600 text-white">Terkirim</Badge>;
            case 'draft': return <Badge variant="outline">Draft</Badge>;
            case 'cancelled': return <Badge variant="destructive">Dibatalkan</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Head title={`Invoice ${invoice.invoice_number}`} />

            <div className="flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/invoices">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Detail Invoice</h1>
                        </div>
                        {getStatusBadge(invoice.status)}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handlePrint}>
                            <Printer className="mr-2 h-4 w-4" />
                            Cetak
                        </Button>
                        <a href={`/admin/invoices/${invoice.id}/pdf`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline">
                                <Printer className="mr-2 h-4 w-4" />
                                Download PDF
                            </Button>
                        </a>
                        <Link href={`/admin/invoices/${invoice.id}/edit`}>
                            <Button variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        {invoice.status !== 'paid' && (
                            <Button className="bg-green-600 hover:bg-green-700">
                                <Send className="mr-2 h-4 w-4" />
                                Tandai Lunas
                            </Button>
                        )}
                    </div>
                </div>

                <Card className="print:shadow-none print:border-none">
                    <CardContent className="p-8 sm:p-12">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 border-b pb-8 mb-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex aspect-square size-10 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                                        <AppLogoIcon className="size-6 fill-current text-white dark:text-black" />
                                    </div>
                                    <span className="text-xl font-bold">ctechbooth-management</span>
                                </div>
                                <p className="text-sm text-muted-foreground max-w-xs">
                                    Jl. Contoh Alamat No. 123<br />
                                    Jakarta, Indonesia 12345<br />
                                    admin@ctechbooth.com
                                </p>
                            </div>
                            <div className="text-left sm:text-right space-y-2">
                                <h2 className="text-3xl font-light tracking-tight text-primary">INVOICE</h2>
                                <p className="font-medium text-lg">{invoice.invoice_number}</p>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mt-4">
                                    <span className="text-muted-foreground">Tgl Terbit:</span>
                                    <span className="font-medium">{new Date(invoice.issue_date).toLocaleDateString('id-ID')}</span>
                                    <span className="text-muted-foreground">Jatuh Tempo:</span>
                                    <span className="font-medium">{new Date(invoice.due_date).toLocaleDateString('id-ID')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8 mb-8">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">Tagihan Kepada:</p>
                                <h3 className="text-lg font-bold">{invoice.customer_name}</h3>
                                {invoice.tenant && <p className="text-sm font-medium">{invoice.tenant.business_name}</p>}
                                <p className="text-sm text-muted-foreground mt-1">
                                    {invoice.customer_email}<br />
                                    {invoice.customer_phone && <>{invoice.customer_phone}<br /></>}
                                    {invoice.customer_address}
                                </p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-y text-sm text-muted-foreground">
                                        <th className="py-3 font-medium">Deskripsi Item</th>
                                        <th className="py-3 font-medium text-center">Kuantitas</th>
                                        <th className="py-3 font-medium text-right">Harga Satuan</th>
                                        <th className="py-3 font-medium text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.items.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-4">
                                                <p className="font-medium">{item.item_name}</p>
                                                {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                                            </td>
                                            <td className="py-4 text-center">{item.quantity}</td>
                                            <td className="py-4 text-right">{formatMoney(item.unit_price)}</td>
                                            <td className="py-4 text-right font-medium">{formatMoney(item.total_price)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-8">
                            <div className="flex-1 space-y-2">
                                {invoice.notes && (
                                    <>
                                        <p className="text-sm font-semibold text-muted-foreground uppercase">Catatan:</p>
                                        <p className="text-sm">{invoice.notes}</p>
                                    </>
                                )}
                            </div>
                            <div className="w-full sm:w-64 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{formatMoney(invoice.subtotal)}</span>
                                </div>
                                {Number(invoice.discount) > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Diskon (-)</span>
                                        <span>{formatMoney(invoice.discount)}</span>
                                    </div>
                                )}
                                {Number(invoice.tax) > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Pajak (+)</span>
                                        <span>{formatMoney(invoice.tax)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between border-t pt-3 font-bold text-lg">
                                    <span>Total Tagihan</span>
                                    <span className="text-primary">{formatMoney(invoice.total)}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                    .print\\:shadow-none {
                        box-shadow: none !important;
                    }
                    .print\\:border-none {
                        border: none !important;
                    }
                    main {
                        background-color: white !important;
                    }
                    .max-w-5xl {
                        max-width: 100% !important;
                        padding: 0 !important;
                    }
                    .p-8 {
                        padding: 0 !important;
                    }
                    .sm\\:p-12 {
                        padding: 0 !important;
                    }
                    .border-b {
                        border-bottom-width: 1px !important;
                        border-bottom-color: #e2e8f0 !important;
                    }
                    .border-y {
                        border-top-width: 1px !important;
                        border-top-color: #e2e8f0 !important;
                        border-bottom-width: 1px !important;
                        border-bottom-color: #e2e8f0 !important;
                    }
                    .border-t {
                        border-top-width: 1px !important;
                        border-top-color: #e2e8f0 !important;
                    }
                    .toaster { display: none !important; }
                    [data-slot="sidebar-inset"] > *:first-child {
                        visibility: visible;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    [data-slot="sidebar-inset"] > *:first-child * {
                        visibility: visible;
                    }
                }
            `}} />
        </>
    );
}

InvoiceShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Invoices', href: '/admin/invoices' },
        { title: 'Detail', href: '#' },
    ],
};

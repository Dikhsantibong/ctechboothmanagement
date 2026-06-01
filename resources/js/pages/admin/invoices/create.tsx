import { Head, Link, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface InvoiceItem {
    id?: number;
    item_name: string;
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
}

export default function InvoiceCreate({ tenants, plans, default_invoice_number }: any) {
    const { data, setData, post, processing, errors } = useForm({
        tenant_id: '',
        invoice_number: default_invoice_number,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_address: '',
        issue_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +7 days
        status: 'draft',
        subtotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
        notes: '',
        items: [] as InvoiceItem[],
    });

    const calculateTotals = (items: InvoiceItem[], discount: number, tax: number) => {
        const subtotal = items.reduce((sum, item) => sum + (Number(item.total_price) || 0), 0);
        const total = subtotal - Number(discount || 0) + Number(tax || 0);
        setData(d => ({ ...d, subtotal, total, items }));
    };

    const addItem = () => {
        const newItems = [...data.items, { item_name: '', description: '', quantity: 1, unit_price: 0, total_price: 0 }];
        calculateTotals(newItems, data.discount, data.tax);
    };

    const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        
        if (field === 'quantity' || field === 'unit_price') {
            newItems[index].total_price = newItems[index].quantity * newItems[index].unit_price;
        }
        
        calculateTotals(newItems, data.discount, data.tax);
    };

    const removeItem = (index: number) => {
        const newItems = data.items.filter((_, i) => i !== index);
        calculateTotals(newItems, data.discount, data.tax);
    };

    // Auto-fill from tenant
    useEffect(() => {
        if (data.tenant_id) {
            const tenant = tenants.find((t: any) => t.id.toString() === data.tenant_id);
            if (tenant) {
                setData(d => {
                    const newData = {
                        ...d,
                        customer_name: tenant.business_name || tenant.owner_name,
                        customer_email: tenant.email,
                        customer_phone: tenant.phone || '',
                        customer_address: tenant.address || '',
                    };
                    
                    // Auto-fill active subscription as item if exists and items are empty
                    if (tenant.subscriptions && tenant.subscriptions.length > 0 && d.items.length === 0) {
                        const sub = tenant.subscriptions[0];
                        const plan = sub.subscription_plan || sub.plan;
                        if (plan) {
                            newData.items = [{
                                item_name: `Paket Langganan: ${plan.name}`,
                                description: `Tagihan untuk paket ${plan.name}`,
                                quantity: 1,
                                unit_price: plan.price,
                                total_price: plan.price
                            }];
                            newData.subtotal = plan.price;
                            newData.total = plan.price - newData.discount + newData.tax;
                        }
                    }
                    return newData;
                });
            }
        }
    }, [data.tenant_id]);

    useEffect(() => {
        // Recalculate if tax or discount changes manually
        calculateTotals(data.items, data.discount, data.tax);
    }, [data.discount, data.tax]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/invoices');
    };

    return (
        <>
            <Head title="Buat Invoice Baru" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/invoices">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Buat Invoice</h1>
                        <p className="text-sm text-muted-foreground">Buat tagihan baru untuk kustomer atau tenant.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Detail Kustomer</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Pilih Tenant (Opsional)</Label>
                                    <Select 
                                        value={data.tenant_id} 
                                        onValueChange={v => setData('tenant_id', v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih tenant atau biarkan kosong untuk kustomer lepas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tenants.map((t: any) => (
                                                <SelectItem key={t.id} value={t.id.toString()}>{t.business_name} ({t.owner_name})</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.tenant_id && <p className="text-xs text-destructive">{errors.tenant_id}</p>}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Nama Kustomer <span className="text-destructive">*</span></Label>
                                        <Input 
                                            value={data.customer_name} 
                                            onChange={e => setData('customer_name', e.target.value)} 
                                            required 
                                        />
                                        {errors.customer_name && <p className="text-xs text-destructive">{errors.customer_name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email <span className="text-destructive">*</span></Label>
                                        <Input 
                                            type="email"
                                            value={data.customer_email} 
                                            onChange={e => setData('customer_email', e.target.value)} 
                                            required 
                                        />
                                        {errors.customer_email && <p className="text-xs text-destructive">{errors.customer_email}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>No. Telepon</Label>
                                        <Input 
                                            value={data.customer_phone} 
                                            onChange={e => setData('customer_phone', e.target.value)} 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Alamat</Label>
                                        <Textarea 
                                            value={data.customer_address} 
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('customer_address', e.target.value)}
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Item Tagihan</CardTitle>
                                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                                    <Plus className="mr-2 h-4 w-4" /> Tambah Item
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.items.length === 0 ? (
                                    <div className="text-center p-4 border border-dashed rounded-lg text-muted-foreground">
                                        Belum ada item tagihan. Klik Tambah Item.
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {data.items.map((item, index) => (
                                            <div key={index} className="flex flex-col sm:flex-row gap-4 items-start p-4 border rounded-lg bg-muted/20">
                                                <div className="flex-1 space-y-4 w-full">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Nama Item</Label>
                                                            <Input 
                                                                value={item.item_name}
                                                                onChange={e => updateItem(index, 'item_name', e.target.value)}
                                                                required
                                                            />
                                                            {errors[`items.${index}.item_name` as keyof typeof errors] && <p className="text-xs text-destructive">{errors[`items.${index}.item_name` as keyof typeof errors]}</p>}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Deskripsi</Label>
                                                            <Input 
                                                                value={item.description}
                                                                onChange={e => updateItem(index, 'description', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Kuantitas</Label>
                                                            <Input 
                                                                type="number"
                                                                min="1"
                                                                value={item.quantity}
                                                                onChange={e => updateItem(index, 'quantity', Number(e.target.value))}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Harga Satuan</Label>
                                                            <Input 
                                                                type="number"
                                                                min="0"
                                                                value={item.unit_price}
                                                                onChange={e => updateItem(index, 'unit_price', Number(e.target.value))}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Total Harga</Label>
                                                            <Input 
                                                                type="number"
                                                                value={item.total_price}
                                                                readOnly
                                                                className="bg-muted"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="text-destructive sm:mt-8"
                                                    onClick={() => removeItem(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {errors.items && <p className="text-xs text-destructive">{errors.items}</p>}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pengaturan Invoice</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>No. Invoice <span className="text-destructive">*</span></Label>
                                    <Input 
                                        value={data.invoice_number} 
                                        onChange={e => setData('invoice_number', e.target.value)} 
                                        required 
                                    />
                                    {errors.invoice_number && <p className="text-xs text-destructive">{errors.invoice_number}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Tanggal Terbit <span className="text-destructive">*</span></Label>
                                    <Input 
                                        type="date"
                                        value={data.issue_date} 
                                        onChange={e => setData('issue_date', e.target.value)} 
                                        required 
                                    />
                                    {errors.issue_date && <p className="text-xs text-destructive">{errors.issue_date}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Jatuh Tempo <span className="text-destructive">*</span></Label>
                                    <Input 
                                        type="date"
                                        value={data.due_date} 
                                        onChange={e => setData('due_date', e.target.value)} 
                                        required 
                                    />
                                    {errors.due_date && <p className="text-xs text-destructive">{errors.due_date}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select 
                                        value={data.status} 
                                        onValueChange={v => setData('status', v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="sent">Terkirim</SelectItem>
                                            <SelectItem value="paid">Lunas</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Ringkasan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(data.subtotal)}</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Diskon (-)</span>
                                    </div>
                                    <Input 
                                        type="number"
                                        min="0"
                                        value={data.discount}
                                        onChange={e => setData('discount', Number(e.target.value))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Pajak (+)</span>
                                    </div>
                                    <Input 
                                        type="number"
                                        min="0"
                                        value={data.tax}
                                        onChange={e => setData('tax', Number(e.target.value))}
                                    />
                                </div>
                                <div className="pt-4 border-t flex justify-between items-center font-bold">
                                    <span>Total</span>
                                    <span className="text-lg text-primary">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(data.total)}</span>
                                </div>

                                <div className="pt-4 space-y-2">
                                    <Label>Catatan (Opsional)</Label>
                                    <Textarea 
                                        value={data.notes}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('notes', e.target.value)}
                                        placeholder="Instruksi pembayaran dll..."
                                    />
                                </div>

                                <Button type="submit" className="w-full mt-4" disabled={processing || data.items.length === 0}>
                                    {processing ? 'Menyimpan...' : 'Simpan Invoice'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </>
    );
}

InvoiceCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Invoices', href: '/admin/invoices' },
        { title: 'Buat Baru', href: '#' },
    ],
};

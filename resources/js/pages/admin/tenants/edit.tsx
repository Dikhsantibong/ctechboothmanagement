import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

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
}

interface PageProps {
    tenant: Tenant;
}

export default function TenantEdit({ tenant }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        business_name: tenant.business_name,
        owner_name: tenant.owner_name,
        email: tenant.email,
        phone: tenant.phone,
        city: tenant.city,
        address: tenant.address || '',
        status: tenant.status,
        trial_ends_at: tenant.trial_ends_at || '',
        slug: tenant.slug,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/tenants/${tenant.id}`);
    };

    
    return (
        <>
            <Head title={`Edit ${tenant.business_name}`} />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/tenants/${tenant.id}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Tenant</h1>
                        <p className="text-muted-foreground">Edit informasi tenant: {tenant.business_name}</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Tenant</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="business_name">Nama Usaha *</Label>
                                    <Input
                                        id="business_name"
                                        value={data.business_name}
                                        onChange={(e) => setData('business_name', e.target.value)}
                                        placeholder="Masukkan nama usaha"
                                        required
                                    />
                                    {errors.business_name && (
                                        <p className="text-sm text-destructive">{errors.business_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="owner_name">Nama Pemilik *</Label>
                                    <Input
                                        id="owner_name"
                                        value={data.owner_name}
                                        onChange={(e) => setData('owner_name', e.target.value)}
                                        placeholder="Masukkan nama pemilik"
                                        required
                                    />
                                    {errors.owner_name && (
                                        <p className="text-sm text-destructive">{errors.owner_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="contoh@email.com"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Nomor Telepon *</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="081234567890"
                                        required
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-destructive">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city">Kota *</Label>
                                    <Input
                                        id="city"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        placeholder="Masukkan kota"
                                        required
                                    />
                                    {errors.city && (
                                        <p className="text-sm text-destructive">{errors.city}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="nama-usaha-unique"
                                        required
                                    />
                                    {errors.slug && (
                                        <p className="text-sm text-destructive">{errors.slug}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Alamat</Label>
                                <Input
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Masukkan alamat lengkap"
                                />
                                {errors.address && (
                                    <p className="text-sm text-destructive">{errors.address}</p>
                                )}
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Aktif</SelectItem>
                                            <SelectItem value="trial">Trial</SelectItem>
                                            <SelectItem value="inactive">Nonaktif</SelectItem>
                                            <SelectItem value="suspended">Suspend</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-destructive">{errors.status}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="trial_ends_at">Tanggal Berakhir Trial</Label>
                                    <Input
                                        id="trial_ends_at"
                                        type="date"
                                        value={data.trial_ends_at}
                                        onChange={(e) => setData('trial_ends_at', e.target.value)}
                                    />
                                    {errors.trial_ends_at && (
                                        <p className="text-sm text-destructive">{errors.trial_ends_at}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link href={`/admin/tenants/${tenant.id}`}>
                                    <Button variant="outline" type="button">
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

TenantEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tenants', href: '/admin/tenants' },
        { title: 'Edit Tenant', href: '#' },
    ],
};

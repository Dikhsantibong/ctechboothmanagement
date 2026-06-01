import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SubscriptionPlanFeature {
    id?: number;
    feature_name: string;
    feature_key: string;
    description: string | null;
    limit: number | null;
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
    trial_days: number | null;
    max_booths: number;
    max_users: number;
    storage_limit_mb: number;
    features: SubscriptionPlanFeature[];
}

interface PageProps {
    plan: SubscriptionPlan;
}

export default function SubscriptionPlanEdit({ plan }: PageProps) {
    const [features, setFeatures] = useState<SubscriptionPlanFeature[]>(
        plan.features.length > 0 
            ? plan.features 
            : [{ feature_name: '', feature_key: '', description: '', limit: null, is_enabled: true }]
    );

    const { data, setData, put, processing, errors } = useForm({
        name: plan.name,
        slug: plan.slug,
        description: plan.description || '',
        price: plan.price.toString(),
        currency: plan.currency,
        duration_days: plan.duration_days.toString(),
        billing_cycle: plan.billing_cycle,
        is_active: plan.is_active,
        is_trial: plan.is_trial,
        trial_days: plan.trial_days?.toString() || '',
        max_booths: plan.max_booths.toString(),
        max_users: plan.max_users.toString(),
        storage_limit_mb: plan.storage_limit_mb.toString(),
        features: features,
    });

    useEffect(() => {
        setData('features', features);
    }, [features]);

    const addFeature = () => {
        setFeatures([...features, { feature_name: '', feature_key: '', description: '', limit: null, is_enabled: true }]);
    };

    const removeFeature = (index: number) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
        setData('features', newFeatures);
    };

    const updateFeature = (index: number, field: string, value: any) => {
        const newFeatures = [...features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setFeatures(newFeatures);
        setData('features', newFeatures);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/subscription-plans/${plan.id}`);
    };

    
    return (
        <>
            <Head title={`Edit ${plan.name}`} />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/subscription-plans/${plan.id}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Paket Langganan</h1>
                        <p className="text-muted-foreground">Edit paket: {plan.name}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Paket</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Paket *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: Professional Plan"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="professional-plan"
                                        required
                                    />
                                    {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Deskripsi paket"
                                />
                                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Harga *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="999000"
                                        required
                                    />
                                    {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="currency">Mata Uang *</Label>
                                    <Select
                                        value={data.currency}
                                        onValueChange={(value) => setData('currency', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih mata uang" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="IDR">IDR</SelectItem>
                                            <SelectItem value="USD">USD</SelectItem>
                                            <SelectItem value="EUR">EUR</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.currency && <p className="text-sm text-destructive">{errors.currency}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="duration_days">Durasi (Hari) *</Label>
                                    <Input
                                        id="duration_days"
                                        type="number"
                                        value={data.duration_days}
                                        onChange={(e) => setData('duration_days', e.target.value)}
                                        placeholder="30"
                                        required
                                    />
                                    {errors.duration_days && <p className="text-sm text-destructive">{errors.duration_days}</p>}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="billing_cycle">Siklus Billing *</Label>
                                    <Select
                                        value={data.billing_cycle}
                                        onValueChange={(value) => setData('billing_cycle', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih siklus" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="monthly">Bulanan</SelectItem>
                                            <SelectItem value="yearly">Tahunan</SelectItem>
                                            <SelectItem value="custom">Custom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.billing_cycle && <p className="text-sm text-destructive">{errors.billing_cycle}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="trial_days">Hari Trial</Label>
                                    <Input
                                        id="trial_days"
                                        type="number"
                                        value={data.trial_days}
                                        onChange={(e) => setData('trial_days', e.target.value)}
                                        placeholder="14"
                                        disabled={!data.is_trial}
                                    />
                                    {errors.trial_days && <p className="text-sm text-destructive">{errors.trial_days}</p>}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                    />
                                    <Label htmlFor="is_active">Aktif</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_trial"
                                        checked={data.is_trial}
                                        onCheckedChange={(checked) => setData('is_trial', checked as boolean)}
                                    />
                                    <Label htmlFor="is_trial">Paket Trial</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Batasan Paket</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="max_booths">Maksimal Booth *</Label>
                                    <Input
                                        id="max_booths"
                                        type="number"
                                        value={data.max_booths}
                                        onChange={(e) => setData('max_booths', e.target.value)}
                                        placeholder="1"
                                        required
                                    />
                                    {errors.max_booths && <p className="text-sm text-destructive">{errors.max_booths}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="max_users">Maksimal User *</Label>
                                    <Input
                                        id="max_users"
                                        type="number"
                                        value={data.max_users}
                                        onChange={(e) => setData('max_users', e.target.value)}
                                        placeholder="1"
                                        required
                                    />
                                    {errors.max_users && <p className="text-sm text-destructive">{errors.max_users}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="storage_limit_mb">Limit Storage (MB) *</Label>
                                    <Input
                                        id="storage_limit_mb"
                                        type="number"
                                        value={data.storage_limit_mb}
                                        onChange={(e) => setData('storage_limit_mb', e.target.value)}
                                        placeholder="1000"
                                        required
                                    />
                                    {errors.storage_limit_mb && <p className="text-sm text-destructive">{errors.storage_limit_mb}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Fitur Paket</CardTitle>
                            <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Fitur
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {features.map((feature, index) => (
                                <div key={index} className="space-y-4 rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium">Fitur #{index + 1}</h4>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFeature(index)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Nama Fitur *</Label>
                                            <Input
                                                value={feature.feature_name}
                                                onChange={(e) => updateFeature(index, 'feature_name', e.target.value)}
                                                placeholder="Contoh: Photo Sessions"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Key Fitur *</Label>
                                            <Input
                                                value={feature.feature_key}
                                                onChange={(e) => updateFeature(index, 'feature_key', e.target.value)}
                                                placeholder="photo_sessions"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Deskripsi</Label>
                                        <Input
                                            value={feature.description || ''}
                                            onChange={(e) => updateFeature(index, 'description', e.target.value)}
                                            placeholder="Deskripsi fitur"
                                        />
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Limit (Opsional)</Label>
                                            <Input
                                                type="number"
                                                value={feature.limit || ''}
                                                onChange={(e) => updateFeature(index, 'limit', e.target.value ? parseInt(e.target.value) : null)}
                                                placeholder="Kosongkan untuk unlimited"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2 pt-6">
                                            <Checkbox
                                                id={`feature_enabled_${index}`}
                                                checked={feature.is_enabled}
                                                onCheckedChange={(checked) => updateFeature(index, 'is_enabled', checked)}
                                            />
                                            <Label htmlFor={`feature_enabled_${index}`}>Aktif</Label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Link href={`/admin/subscription-plans/${plan.id}`}>
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
            </div>
        </>
    );
}

SubscriptionPlanEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Paket Langganan', href: '/admin/subscription-plans' },
        { title: 'Edit Paket', href: '#' },
    ],
};

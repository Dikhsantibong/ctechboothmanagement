import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Check, HardDrive, Users, Monitor } from 'lucide-react';

interface SubscriptionPlanFeature {
    id: number;
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
    is_trial: boolean;
    max_booths: number;
    max_users: number;
    storage_limit_mb: number;
    features: SubscriptionPlanFeature[];
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
    subscription: TenantSubscription;
    plans: SubscriptionPlan[];
}

export default function TenantSubscriptionEdit({ tenant, subscription, plans }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        subscription_plan_id: subscription.subscription_plan.id.toString(),
        recalculate_end_date: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/tenants/${tenant.id}/subscriptions/${subscription.id}`);
    };

    
    return (
        <>
            <Head title={`Edit Langganan - ${tenant.business_name}`} />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/tenants/${tenant.id}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Langganan</h1>
                        <p className="text-muted-foreground">Ubah paket langganan untuk {tenant.business_name}</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Langganan Saat Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm font-medium">Nomor Langganan</p>
                                <p className="text-sm text-muted-foreground">{subscription.subscription_number}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Paket Saat Ini</p>
                                <p className="text-sm text-muted-foreground">{subscription.subscription_plan.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Tanggal Mulai</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(subscription.starts_at).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Tanggal Berakhir</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(subscription.ends_at).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {plans.map((plan) => (
                            <Card
                                key={plan.id}
                                className={`cursor-pointer transition-all hover:shadow-md ${
                                    data.subscription_plan_id === plan.id.toString()
                                        ? 'border-primary ring-2 ring-primary'
                                        : ''
                                }`}
                                onClick={() => setData('subscription_plan_id', plan.id.toString())}
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                                        {plan.is_trial && <Badge variant="secondary">Trial</Badge>}
                                    </div>
                                    {plan.description && (
                                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                                    )}
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-2xl font-bold">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: plan.currency,
                                                maximumFractionDigits: 0,
}).format(plan.price)}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{plan.duration_days} hari</p>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Monitor className="h-4 w-4 text-muted-foreground" />
                                            <span>{plan.max_booths} Booth</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span>{plan.max_users} User</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                                            <span>{plan.storage_limit_mb} MB</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Fitur:</p>
                                        <div className="space-y-1">
                                            {plan.features.filter((f: SubscriptionPlanFeature) => f.is_enabled).slice(0, 5).map((feature: SubscriptionPlanFeature) => (
                                                <div key={feature.id} className="flex items-center gap-2 text-xs">
                                                    <Check className="h-3 w-3 text-green-600" />
                                                    <span>{feature.feature_name}</span>
                                                </div>
                                            ))}
                                            {plan.features.filter((f: SubscriptionPlanFeature) => f.is_enabled).length > 5 && (
                                                <p className="text-xs text-muted-foreground">
                                                    +{plan.features.filter((f: SubscriptionPlanFeature) => f.is_enabled).length - 5} fitur lainnya
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="flex items-center space-x-2 mt-6">
                        <Checkbox
                            id="recalculate_end_date"
                            checked={data.recalculate_end_date}
                            onCheckedChange={(checked) => setData('recalculate_end_date', checked as boolean)}
                        />
                        <Label htmlFor="recalculate_end_date">
                            Hitung ulang tanggal berakhir berdasarkan durasi paket baru
                        </Label>
                    </div>

                    {errors.subscription_plan_id && (
                        <p className="text-sm text-destructive">{errors.subscription_plan_id}</p>
                    )}

                    <div className="flex justify-end gap-4 mt-6">
                        <Link href={`/admin/tenants/${tenant.id}`}>
                            <Button variant="outline" type="button">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing || !data.subscription_plan_id}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

TenantSubscriptionEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tenants', href: '/admin/tenants' },
        { title: 'Edit Langganan', href: '#' },
    ],
};

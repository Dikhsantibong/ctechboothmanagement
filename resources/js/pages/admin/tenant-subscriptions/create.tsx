import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface Tenant {
    id: number;
    business_name: string;
}

interface PageProps {
    tenant: Tenant;
    plans: SubscriptionPlan[];
}

export default function TenantSubscriptionCreate({ tenant, plans }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        subscription_plan_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/tenants/${tenant.id}/subscriptions`);
    };

    
    return (
        <>
            <Head title={`Buat Langganan - ${tenant.business_name}`} />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/tenants/${tenant.id}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Buat Langganan Baru</h1>
                        <p className="text-muted-foreground">Pilih paket langganan untuk {tenant.business_name}</p>
                    </div>
                </div>

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
                                            {(plan.features || []).filter((f: SubscriptionPlanFeature) => f.is_enabled).slice(0, 5).map((feature: SubscriptionPlanFeature) => (
                                                <div key={feature.id} className="flex items-center gap-2 text-xs">
                                                    <Check className="h-3 w-3 text-green-600" />
                                                    <span>{feature.feature_name}</span>
                                                </div>
                                            ))}
                                            {(plan.features || []).filter((f: SubscriptionPlanFeature) => f.is_enabled).length > 5 && (
                                                <p className="text-xs text-muted-foreground">
                                                    +{(plan.features || []).filter((f: SubscriptionPlanFeature) => f.is_enabled).length - 5} fitur lainnya
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
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
                            {processing ? 'Membuat...' : 'Buat Langganan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

TenantSubscriptionCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tenants', href: '/admin/tenants' },
        { title: 'Buat Langganan', href: '#' },
    ],
};


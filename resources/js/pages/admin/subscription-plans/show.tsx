import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Edit, Power, PowerOff, Check, X, HardDrive, Users, Monitor, Calendar, CreditCard } from 'lucide-react';

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

export default function SubscriptionPlanShow({ plan }: PageProps) {
    const getStatusBadge = () => {
        if (!plan.is_active) {
            return <Badge variant="destructive">Nonaktif</Badge>;
        }
        if (plan.is_trial) {
            return <Badge variant="secondary">Trial</Badge>;
        }
        return <Badge variant="default">Aktif</Badge>;
    };

    const toggleStatus = () => {
        router.post(`/admin/subscription-plans/${plan.id}/toggle-status`);
    };

    
    return (
        <>
            <Head title={plan.name} />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/subscription-plans">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{plan.name}</h1>
                            <p className="text-muted-foreground">Detail paket langganan</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={toggleStatus}
                            title={plan.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                            <Button variant="outline">
                                {plan.is_active ? (
                                    <>
                                        <PowerOff className="mr-2 h-4 w-4 text-destructive" />
                                        Nonaktifkan
                                    </>
                                ) : (
                                    <>
                                        <Power className="mr-2 h-4 w-4 text-green-600" />
                                        Aktifkan
                                    </>
                                )}
                            </Button>
                        </button>
                        <Link href={`/admin/subscription-plans/${plan.id}/edit`}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Paket</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">Status:</p>
                                {getStatusBadge()}
                            </div>
                            {plan.description && (
                                <div>
                                    <p className="text-sm font-medium">Deskripsi</p>
                                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                                </div>
                            )}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <CreditCard className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Harga</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: plan.currency,
                                                maximumFractionDigits: 0,
}).format(plan.price)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Durasi</p>
                                        <p className="text-sm text-muted-foreground">{plan.duration_days} hari</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Monitor className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Maksimal Booth</p>
                                        <p className="text-sm text-muted-foreground">{plan.max_booths}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Maksimal User</p>
                                        <p className="text-sm text-muted-foreground">{plan.max_users}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <HardDrive className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Limit Storage</p>
                                        <p className="text-sm text-muted-foreground">{plan.storage_limit_mb} MB</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CreditCard className="mt-1 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Siklus Billing</p>
                                        <p className="text-sm text-muted-foreground capitalize">{plan.billing_cycle}</p>
                                    </div>
                                </div>
                            </div>
                            {plan.is_trial && plan.trial_days && (
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium">Trial:</p>
                                    <p className="text-sm text-muted-foreground">{plan.trial_days} hari</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Statistik</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Total Fitur</p>
                                <p className="text-sm text-muted-foreground">{plan.features.length}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Fitur Aktif</p>
                                <p className="text-sm text-muted-foreground">
                                    {plan.features.filter(f => f.is_enabled).length}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Fitur Nonaktif</p>
                                <p className="text-sm text-muted-foreground">
                                    {plan.features.filter(f => !f.is_enabled).length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Fitur Paket</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {plan.features.length > 0 ? (
                            <div className="space-y-3">
                                {plan.features.map((feature) => (
                                    <div key={feature.id} className="flex items-start justify-between rounded-lg border p-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <Checkbox checked={feature.is_enabled} disabled />
                                                <p className="font-medium">{feature.feature_name}</p>
                                                {!feature.is_enabled && (
                                                    <Badge variant="outline" className="text-xs">
                                                        Nonaktif
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">{feature.feature_key}</p>
                                            {feature.description && (
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {feature.description}
                                                </p>
                                            )}
                                            {feature.limit !== null && (
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Limit: {feature.limit === 0 ? 'Unlimited' : feature.limit}
                                                </p>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            {feature.is_enabled ? (
                                                <Check className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <X className="h-5 w-5 text-destructive" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Tidak ada fitur yang ditambahkan</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SubscriptionPlanShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Paket Langganan', href: '/admin/subscription-plans' },
        { title: 'Detail Paket', href: '#' },
    ],
};

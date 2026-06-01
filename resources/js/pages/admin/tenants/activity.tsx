import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Activity } from 'lucide-react';

interface User {
    name: string;
}

interface ActivityLog {
    id: number;
    action: string;
    module: string;
    description: string;
    ip_address: string | null;
    user_agent: string | null;
    logged_at: string;
    user?: User;
}

interface Tenant {
    id: number;
    business_name: string;
}

interface PageProps {
    tenant: Tenant;
    activityLogs: {
        data: ActivityLog[];
        links: any[];
        current_page: number;
        last_page: number;
    };
}

export default function TenantActivity({ tenant, activityLogs }: PageProps) {
    const getActionBadge = (action: string) => {
        const variants: Record<string, any> = {
            create: 'default',
            update: 'secondary',
            delete: 'destructive',
            login: 'default',
            logout: 'outline',
        };
        return <Badge variant={variants[action] || 'outline'}>{action}</Badge>;
    };

    
    return (
        <>
            <Head title={`Aktivitas - ${tenant.business_name}`} />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Link href={`/admin/tenants/${tenant.id}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Log Aktivitas</h1>
                        <p className="text-muted-foreground">Log aktivitas untuk {tenant.business_name}</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Aktivitas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-3 text-left text-sm font-medium">Waktu</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Aksi</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Modul</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Deskripsi</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">IP Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activityLogs.data.map((log) => (
                                        <tr key={log.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 text-sm">
                                                {new Date(log.logged_at).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {log.user ? log.user.name : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{getActionBadge(log.action)}</td>
                                            <td className="px-4 py-3 text-sm">{log.module}</td>
                                            <td className="px-4 py-3 text-sm">{log.description || '-'}</td>
                                            <td className="px-4 py-3 text-sm">{log.ip_address || '-'}</td>
                                        </tr>
                                    ))}
                                    {activityLogs.data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                                Tidak ada aktivitas ditemukan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {activityLogs.last_page > 1 && (
                    <div className="flex justify-end gap-2">
                        {activityLogs.links.map((link, index) => (
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
                )}
            </div>
        </>
    );
}

TenantActivity.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tenants', href: '/admin/tenants' },
        { title: 'Aktivitas', href: '#' },
    ],
};

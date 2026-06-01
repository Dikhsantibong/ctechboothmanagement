import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowUpDown, Activity, User, Calendar } from 'lucide-react';

interface LogUser {
    id: number;
    name: string;
    email: string;
}

interface ActivityLog {
    id: number;
    action: string;
    module: string;
    description: string | null;
    subject_type: string | null;
    subject_id: number | null;
    ip_address: string | null;
    logged_at: string;
    user: LogUser;
}

interface PageProps {
    logs: {
        data: ActivityLog[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from?: number;
        to?: number;
    };
    filters: {
        module?: string;
        action?: string;
        user_id?: string;
        start_date?: string;
        end_date?: string;
        sort?: string;
        direction?: string;
    };
}

export default function ActivityLogIndex({ logs, filters }: PageProps) {
    const handleFilter = (key: string, value: string) => {
        router.get('/admin/activity-logs', {
            ...filters,
            [key]: value,
        }, { preserveState: true });
    };

    const handleSort = (field: string) => {
        const direction = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get('/admin/activity-logs', {
            ...filters,
            sort: field,
            direction,
        }, { preserveState: true });
    };

    const getActionBadge = (action: string) => {
        const variants: Record<string, any> = {
            create: 'default',
            update: 'secondary',
            delete: 'destructive',
            login: 'default',
            update_status: 'secondary',
            update_priority: 'secondary',
            update_resolution: 'secondary',
        };
        const labels: Record<string, string> = {
            create: 'Create',
            update: 'Update',
            delete: 'Delete',
            login: 'Login',
            update_status: 'Status Update',
            update_priority: 'Priority Update',
            update_resolution: 'Resolution Update',
        };
        return <Badge variant={variants[action] || 'outline'}>{labels[action] || action}</Badge>;
    };

    const getModuleBadge = (module: string) => {
        const labels: Record<string, string> = {
            tenant: 'Tenant',
            subscription: 'Subscription',
            subscription_plan: 'Subscription Plan',
            support_ticket: 'Support Ticket',
            user: 'User',
        };
        return <Badge variant="outline">{labels[module] || module}</Badge>;
    };

    
    return (
        <>
            <Head title="Activity Logs" />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Activity Logs</h1>
                        <p className="text-muted-foreground">Riwayat aktivitas admin</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-5">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Module</label>
                                <Select
                                    value={filters.module || 'all'}
                                    onValueChange={(value) => handleFilter('module', value === 'all' ? '' : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Module" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Module</SelectItem>
                                        <SelectItem value="tenant">Tenant</SelectItem>
                                        <SelectItem value="subscription">Subscription</SelectItem>
                                        <SelectItem value="subscription_plan">Subscription Plan</SelectItem>
                                        <SelectItem value="support_ticket">Support Ticket</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Action</label>
                                <Select
                                    value={filters.action || 'all'}
                                    onValueChange={(value) => handleFilter('action', value === 'all' ? '' : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Action" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Action</SelectItem>
                                        <SelectItem value="create">Create</SelectItem>
                                        <SelectItem value="update">Update</SelectItem>
                                        <SelectItem value="delete">Delete</SelectItem>
                                        <SelectItem value="login">Login</SelectItem>
                                        <SelectItem value="update_status">Status Update</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Tanggal Mulai</label>
                                <Input
                                    type="date"
                                    value={filters.start_date || ''}
                                    onChange={(e) => handleFilter('start_date', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Tanggal Akhir</label>
                                <Input
                                    type="date"
                                    value={filters.end_date || ''}
                                    onChange={(e) => handleFilter('end_date', e.target.value)}
                                />
                            </div>

                            <div className="flex items-end">
                                <Button
                                    variant="outline"
                                    onClick={() => router.get('/admin/activity-logs')}
                                    className="w-full"
                                >
                                    Reset Filter
                                </Button>
                            </div>
                        </div>
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
                                                onClick={() => handleSort('logged_at')}
                                                className="flex items-center gap-1 hover:text-primary"
                                            >
                                                Waktu
                                                <ArrowUpDown className="h-3 w-3" />
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Module</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Deskripsi</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">IP Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.data.map((log) => (
                                        <tr key={log.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 text-sm">
                                                {new Date(log.logged_at).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium">{log.user.name}</td>
                                            <td className="px-4 py-3 text-sm">{getActionBadge(log.action)}</td>
                                            <td className="px-4 py-3 text-sm">{getModuleBadge(log.module)}</td>
                                            <td className="px-4 py-3 text-sm">{log.description || '-'}</td>
                                            <td className="px-4 py-3 text-sm">{log.ip_address || '-'}</td>
                                        </tr>
                                    ))}
                                    {logs.data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                                Tidak ada log ditemukan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {logs.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Menampilkan {logs.from} sampai {logs.to} dari {logs.total} log
                        </p>
                        <div className="flex gap-2">
                            {logs.links.map((link, index) => (
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

ActivityLogIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Activity Logs', href: '/admin/activity-logs' },
    ],
};

import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Eye, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Tenant {
    id: number;
    business_name: string;
}

interface User {
    id: number;
    name: string;
}

interface Ticket {
    id: number;
    ticket_number: string;
    subject: string;
    status: string;
    priority: string;
    category: string;
    created_at: string;
    tenant: Tenant;
    user: User | null;
    assignedTo: User | null;
}

interface PageProps {
    tickets: {
        data: Ticket[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from?: number;
        to?: number;
    };
}

export default function SupportTicketIndex({ tickets }: PageProps) {
    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            open: 'default',
            in_progress: 'secondary',
            pending: 'outline',
            resolved: 'default',
            closed: 'outline',
        };
        const labels: Record<string, string> = {
            open: 'Open',
            in_progress: 'In Progress',
            pending: 'Pending',
            resolved: 'Resolved',
            closed: 'Closed',
        };
        const icons: Record<string, any> = {
            open: AlertTriangle,
            in_progress: Clock,
            pending: Clock,
            resolved: CheckCircle,
            closed: XCircle,
        };
        const Icon = icons[status] || AlertTriangle;
        
        return (
            <Badge variant={variants[status] || 'outline'} className="gap-1">
                <Icon className="h-3 w-3" />
                {labels[status] || status}
            </Badge>
        );
    };

    const getPriorityBadge = (priority: string) => {
        const variants: Record<string, any> = {
            low: 'secondary',
            medium: 'default',
            high: 'destructive',
            urgent: 'destructive',
        };
        const labels: Record<string, string> = {
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            urgent: 'Urgent',
        };
        return <Badge variant={variants[priority] || 'outline'}>{labels[priority] || priority}</Badge>;
    };

    const getCategoryBadge = (category: string) => {
        const labels: Record<string, string> = {
            technical: 'Technical',
            billing: 'Billing',
            feature_request: 'Feature Request',
            bug_report: 'Bug Report',
            other: 'Other',
        };
        return <Badge variant="outline">{labels[category] || category}</Badge>;
    };

    
    return (
        <>
            <Head title="Support Tickets" />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Support Tickets</h1>
                        <p className="text-muted-foreground">Kelola tiket support tenant</p>
                    </div>
                    <Link href="/admin/support-tickets/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Buat Tiket
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-3 text-left text-sm font-medium">Nomor Tiket</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Subjek</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Tenant</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Prioritas</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Kategori</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Ditugaskan</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Tanggal</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.data.map((ticket) => (
                                        <tr key={ticket.id} className="border-b hover:bg-muted/50">
                                            <td className="px-4 py-3 text-sm font-medium">{ticket.ticket_number}</td>
                                            <td className="px-4 py-3 text-sm">{ticket.subject}</td>
                                            <td className="px-4 py-3 text-sm">{ticket.tenant.business_name}</td>
                                            <td className="px-4 py-3 text-sm">{getStatusBadge(ticket.status)}</td>
                                            <td className="px-4 py-3 text-sm">{getPriorityBadge(ticket.priority)}</td>
                                            <td className="px-4 py-3 text-sm">{getCategoryBadge(ticket.category)}</td>
                                            <td className="px-4 py-3 text-sm">{ticket.assignedTo?.name || '-'}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Date(ticket.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Link href={`/admin/support-tickets/${ticket.id}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {tickets.data.length === 0 && (
                                        <tr>
                                            <td colSpan={9} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                                Tidak ada tiket ditemukan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {tickets.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Menampilkan {tickets.from} sampai {tickets.to} dari {tickets.total} tiket
                        </p>
                        <div className="flex gap-2">
                            {tickets.links.map((link, index) => (
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

SupportTicketIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Support Tickets', href: '/admin/support-tickets' },
    ],
};

import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Eye, AlertTriangle, CheckCircle, Clock, XCircle, Save, Edit, Trash2 } from 'lucide-react';

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
    message: string;
    status: string;
    priority: string;
    category: string;
    resolution_notes: string | null;
    resolved_at: string | null;
    closed_at: string | null;
    created_at: string;
    tenant: Tenant;
    user: User | null;
    assignedTo: User | null;
}

interface PageProps {
    ticket: Ticket;
}

export default function SupportTicketShow({ ticket }: PageProps) {
    const { data, setData, post, processing } = useForm({
        resolution_notes: ticket.resolution_notes || '',
    });

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

    const handleStatusChange = (status: string) => {
        router.post(`/admin/support-tickets/${ticket.id}/status/${status}`);
    };

    const handleUpdateResolution = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/support-tickets/${ticket.id}/resolution`);
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus tiket ini?')) {
            router.delete(`/admin/support-tickets/${ticket.id}`);
        }
    };

    
    return (
        <>
            <Head title={`Ticket - ${ticket.ticket_number}`} />
            
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/support-tickets">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{ticket.ticket_number}</h1>
                            <p className="text-muted-foreground">Detail tiket support</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/admin/support-tickets/${ticket.id}/edit`}>
                            <Button variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Tiket</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">Status:</p>
                                {getStatusBadge(ticket.status)}
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">Prioritas:</p>
                                {getPriorityBadge(ticket.priority)}
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">Kategori:</p>
                                {getCategoryBadge(ticket.category)}
                            </div>
                            <div>
                                <p className="text-sm font-medium">Subjek</p>
                                <p className="text-sm text-muted-foreground">{ticket.subject}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Pesan</p>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{ticket.message}</p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium">Tenant</p>
                                    <p className="text-sm text-muted-foreground">{ticket.tenant.business_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Ditugaskan ke</p>
                                    <p className="text-sm text-muted-foreground">{ticket.assignedTo?.name || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Dibuat pada</p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(ticket.created_at).toLocaleString('id-ID')}
                                    </p>
                                </div>
                                {ticket.resolved_at && (
                                    <div>
                                        <p className="text-sm font-medium">Diselesaikan pada</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(ticket.resolved_at).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ubah Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Status Tiket</Label>
                                <Select
                                    value={ticket.status}
                                    onValueChange={handleStatusChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="resolved">Resolved</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Catatan Penyelesaian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpdateResolution} className="space-y-4">
                            <div>
                                <Label htmlFor="resolution_notes">Catatan</Label>
                                <textarea
                                    id="resolution_notes"
                                    value={data.resolution_notes}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('resolution_notes', e.target.value)}
                                    placeholder="Tambahkan catatan penyelesaian..."
                                    rows={4}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Menyimpan...' : 'Simpan Catatan'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {ticket.resolution_notes && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Catatan Penyelesaian Saat Ini</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm whitespace-pre-wrap">{ticket.resolution_notes}</p>
                        </CardContent>
                    </Card>
                )}

                <div className="flex gap-2">
                    <Link href={`/admin/tenants/${ticket.tenant.id}`}>
                        <Button variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat Tenant
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}

SupportTicketShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Support Tickets', href: '/admin/support-tickets' },
        { title: 'Detail Tiket', href: '#' },
    ],
};

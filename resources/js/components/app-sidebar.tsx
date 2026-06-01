import { Link } from '@inertiajs/react';
import { LayoutGrid, Building2, CreditCard, Ticket, FileText, Users, Receipt } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Tenant Management',
        href: '/admin/tenants',
        icon: Building2,
    },
    {
        title: 'Subscription Plans',
        href: '/admin/subscription-plans',
        icon: CreditCard,
    },
    {
        title: 'Subscriptions',
        href: '/admin/subscriptions',
        icon: Users,
    },
    {
        title: 'Invoices',
        href: '/admin/invoices',
        icon: Receipt,
    },
    {
        title: 'Support Tickets',
        href: '/admin/support-tickets',
        icon: Ticket,
    },
    {
        title: 'Activity Logs',
        href: '/admin/activity-logs',
        icon: FileText,
    },
];


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <div className="mt-auto"></div>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

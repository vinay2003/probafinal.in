import { logoutAdmin } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Users,
    CreditCard,
    LogOut,
    Settings
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPanelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                        Proba Admin
                    </h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link href="/admin/dashboard">
                        <Button variant="ghost" className="w-full justify-start mt-1">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/admin/users">
                        <Button variant="ghost" className="w-full justify-start mt-1">
                            <Users className="mr-2 h-4 w-4" />
                            Users
                        </Button>
                    </Link>
                    <Link href="/admin/pricing">
                        <Button variant="ghost" className="w-full justify-start mt-1">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pricing & Plans
                        </Button>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <form action={logoutAdmin}>
                        <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="md:hidden p-4 bg-white dark:bg-gray-800 border-b flex justify-between items-center">
                    <span className="font-bold">Proba Admin</span>
                    {/* Mobile menu toggle could go here */}
                </div>
                {children}
            </main>
        </div>
    );
}

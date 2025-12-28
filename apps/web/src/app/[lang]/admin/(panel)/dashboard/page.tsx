import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { logoutAdmin, getAdminStats } from '@/app/actions';
import { Users, FileText, Settings, LogOut } from 'lucide-react';
import { AdminCharts } from '@/components/admin/admin-charts';

export default async function AdminDashboardPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session || session.value !== 'true') {
        redirect('/admin');
    }

    const stats = await getAdminStats();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <form action={logoutAdmin}>
                    <Button variant="destructive" size="sm">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </form>
            </header>

            <main className="p-8 max-w-7xl mx-auto space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalUsers}</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.activeSubs}</div>
                            <p className="text-xs text-muted-foreground">+15% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">System Status</CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">{stats.systemStatus}</div>
                            <p className="text-xs text-muted-foreground">All systems operational</p>
                        </CardContent>
                    </Card>
                </div>

                <h2 className="text-xl font-bold mt-8">Feature Usage</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Interviews Conducted</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{stats.featureUsage.interviews}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Resumes Optimized</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{stats.featureUsage.resumes}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Flashcards Generated</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{stats.featureUsage.flashcards}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Quizzes Taken</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{stats.featureUsage.quizzes}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Summaries Created</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{stats.featureUsage.summaries}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Code Tests Run</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{stats.featureUsage.codeTests}</div></CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <AdminCharts />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">No recent activity to display.</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

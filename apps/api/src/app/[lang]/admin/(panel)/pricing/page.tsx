import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Edit2 } from 'lucide-react';
import Link from 'next/link';
import { getAdminPlans } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function AdminPricingPage() {
    const plans = await getAdminPlans();

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pricing & Plans</h1>
                    <p className="text-muted-foreground">Manage your subscription tiers.</p>
                </div>
                <Link href="/admin/pricing/new">
                    <Button>
                        Add New Plan
                    </Button>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan: any) => (
                    <Card key={plan.name} className="relative">
                        <div className="absolute top-4 right-4">
                            <Link href={`/admin/pricing/${plan.name.toLowerCase().includes('pro') ? 'pro' : 'quiz'}`}>
                                <Button variant="ghost" size="icon">
                                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                                </Button>
                            </Link>
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold">{plan.currency}{plan.price}</span>
                                <span className="text-muted-foreground ml-1">/month</span>
                            </div>
                            <div className="space-y-2">
                                {plan.features.map((f: string, i: number) => (
                                    <div key={i} className="flex items-center text-sm">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className={`text-sm font-medium px-2 py-1 rounded ${plan.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                {plan.active ? 'Active' : 'Inactive'}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

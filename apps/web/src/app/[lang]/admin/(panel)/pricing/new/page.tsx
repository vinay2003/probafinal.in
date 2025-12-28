'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { createAdminPlan } from '@/app/actions';

export default function NewPricingPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        currency: '₹',
        description: '',
        features: '',
        active: true
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const planData = {
            ...formData,
            features: formData.features.split('\n').filter(f => f.trim() !== '')
        };

        try {
            await createAdminPlan(planData);
            router.push('/admin/pricing');
            router.refresh(); // Refresh to show new plan
        } catch (error) {
            console.error('Failed to create plan', error);
            alert('Failed to create plan');
        }
    };

    return (
        <div className="p-8 space-y-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/pricing">
                    <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Create New Plan</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Plan Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Plan Name</Label>
                            <Input
                                placeholder="e.g. Enterprise Access"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Price</Label>
                                <Input
                                    type="number"
                                    placeholder="999"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Currency</Label>
                                <Input
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Input
                                placeholder="Brief description of the plan"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Features (One per line)</Label>
                            <Textarea
                                className="min-h-[200px]"
                                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                                value={formData.features}
                                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit"><Plus className="w-4 h-4 mr-2" /> Create Plan</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

// Mock data fetch - normally this would use a useEffect or server component params
const mockPlan = {
    id: 'pro',
    name: "Pro Access",
    price: "119",
    currency: "₹",
    description: "The ultimate AI study companion.",
    features: "Unlimited AI-powered quiz generation\nAI feedback on your answers\nUnlimited AI flashcard decks\nPersonalized explanations\nStudy strategy suggestions\nAI Mock Interview practice\nATS Resume Optimizer\nDocument Summarizer",
    active: true
};

export default function EditPricingPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [formData, setFormData] = useState(mockPlan);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Here calls server action
        alert("Plan updated! (Mock)");
        router.push('/admin/pricing');
    };

    return (
        <div className="p-8 space-y-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/pricing">
                    <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Edit Plan: {formData.name}</h1>
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
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Price</Label>
                                <Input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Features (One per line)</Label>
                            <Textarea
                                className="min-h-[200px]"
                                value={formData.features}
                                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

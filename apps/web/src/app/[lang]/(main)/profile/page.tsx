'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser, useFirestore, updateDocumentNonBlocking } from '@/firebase';
import { useSubscription } from '@/hooks/use-subscription';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { updateProfile } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { Loader2, LogOut, CreditCard, User, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/mode-toggle';
import { ThemeCustomizer } from '@/components/theme-customizer';

export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const { tier, isPro, trialDaysRemaining, isInTrial, isLoading: isSubLoading } = useSubscription();
    const auth = useAuth();
    const firestore = useFirestore();
    const { toast } = useToast();
    const router = useRouter();

    const [displayName, setDisplayName] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
        }
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !auth.currentUser) return;

        setIsUpdating(true);
        try {
            // Update Auth Profile
            await updateProfile(auth.currentUser, {
                displayName: displayName,
            });

            // Update Firestore User Document
            if (firestore) {
                const userRef = doc(firestore, 'users', user.uid);
                await updateDocumentNonBlocking(userRef, { displayName: displayName });
            }

            toast({
                title: 'Profile Updated',
                description: 'Your profile information has been saved.',
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Update Failed',
                description: error.message,
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            router.push('/');
        } catch (error) {
            console.error('Sign out failed', error);
        }
    };

    if (isUserLoading || isSubLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container max-w-4xl mx-auto py-8 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
                <Button variant="outline" onClick={handleSignOut} className="text-destructive hover:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>Manage your public profile details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user.photoURL || ''} />
                                <AvatarFallback className="text-lg">{user.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1 text-center sm:text-left">
                                <p className="font-medium text-sm text-muted-foreground">Profile Picture</p>
                                <p className="text-xs text-muted-foreground">Managed by your login provider (Google/Microsoft/GitHub)</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={user.email || ''} disabled type="email" />
                                <p className="text-xs text-muted-foreground">Email cannot be changed directly.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input
                                    id="name"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="Your Name"
                                />
                            </div>
                            <Button type="submit" disabled={isUpdating}>
                                {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Changes'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Subscription & Usage */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-primary" />
                                Subscription
                            </CardTitle>
                            <CardDescription>Your current plan and status.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                <div>
                                    <p className="font-medium">Current Plan</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant={isPro ? 'default' : 'secondary'} className="text-sm">
                                            {tier === 'pro' ? 'Pro Plan' : tier === 'quiz' ? 'Quiz Plan' : 'Free Plan'}
                                        </Badge>
                                        {isInTrial && <Badge variant="outline" className="text-orange-500 border-orange-500">Trial Active</Badge>}
                                    </div>
                                </div>
                                {tier === 'free' && (
                                    <Button size="sm" asChild>
                                        <a href="/subscription">Upgrade</a>
                                    </Button>
                                )}
                            </div>

                            {/* Theme Settings */}
                            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                <div>
                                    <p className="font-medium">Appearance</p>
                                    <p className="text-xs text-muted-foreground">Customize your interface theme.</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <ThemeCustomizer />
                                    <ModeToggle />
                                </div>
                            </div>

                            {isInTrial && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Trial Period</span>
                                        <span className="font-medium">{trialDaysRemaining} days remaining</span>
                                    </div>
                                    <Progress value={(trialDaysRemaining / 30) * 100} className="h-2" />
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="text-sm text-muted-foreground">
                            Manage your billing and payment methods in the <a href="/subscription" className="underline hover:text-primary">Subscription</a> page.
                        </CardFooter>
                    </Card>

                    {/* Admin Zone (Conditional) */}
                    {/* We could add logic here to only show if user claims to be admin, or just hide it */}
                </div>
            </div>
        </div>
    );
}

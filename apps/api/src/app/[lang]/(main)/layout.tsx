'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BotMessageSquare,
  CalendarCheck,
  FileQuestion,
  LayoutDashboard,
  LogOut,
  TrendingUp,
  Layers,
  Shield,
  Mic,
  FileText,
  Globe,
  Sparkles,
  Code,
  Database,
  Settings,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth, useUser, useFirestore, updateDocumentNonBlocking } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { doc, serverTimestamp } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { useSubscription } from '@/hooks/use-subscription';

// Constants
const LOGO_SRC = '/favicon.ico';
const LOGO_ALT = 'Proba Logo';
const LOGO_SIZE = 32;

// Define types
interface NavItemType {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredTier?: 'quiz' | 'pro';
  adminOnly?: boolean;
}

interface LogoProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

// Logo Component
const Logo: React.FC<LogoProps> = ({
  src = LOGO_SRC,
  alt = LOGO_ALT,
  width = LOGO_SIZE,
  height = LOGO_SIZE,
  priority = false,
  className,
}) => (
  <Image src={src} alt={alt} width={width} height={height} priority={priority} className={className} />
);

// NavItem Component
const NavItem = React.memo(({ item }: { item: NavItemType }) => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { isQuiz, isPro, isAdmin } = useSubscription();

  const hasAccess = React.useMemo(() => {
    if (item.adminOnly) return isAdmin;
    if (!item.requiredTier) return true;
    return item.requiredTier === 'quiz' ? isQuiz : isPro;
  }, [item, isAdmin, isQuiz, isPro]);

  if (item.adminOnly && !isAdmin) return null;

  return (
    <SidebarMenuItem>
      <Button
        asChild
        variant="ghost"
        onClick={() => setOpenMobile(false)}
        className={cn(
          'w-full justify-start font-semibold text-sm py-3',
          pathname === item.href && 'bg-accent text-accent-foreground',
          !hasAccess && 'opacity-75 cursor-not-allowed'
        )}
        aria-disabled={!hasAccess}
        disabled={!hasAccess}
      >
        <Link href={item.href} className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center gap-3">
            <item.icon className="h-5 w-5" aria-hidden="true" />
            <span>{item.label}</span>
          </div>
          {!hasAccess && item.requiredTier && (
            <Badge
              variant="secondary"
              className="text-xs"
              aria-label={`Requires ${item.requiredTier} subscription`}
            >
              {item.requiredTier === 'quiz' ? 'Quiz' : 'Pro'}
            </Badge>
          )}
        </Link>
      </Button>
    </SidebarMenuItem>
  );
});
NavItem.displayName = 'NavItem';

// Navigation Items
const navItems: NavItemType[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/study-plan', label: 'Study Plan', icon: CalendarCheck },
  { href: '/progress', label: 'Progress', icon: TrendingUp },
  { href: '/quiz', label: 'Quizzes', icon: FileQuestion, requiredTier: 'quiz' },
  { href: '/flashcards', label: 'Flashcards', icon: Layers, requiredTier: 'pro' },
  { href: '/assistant', label: 'AI Assistant', icon: BotMessageSquare, requiredTier: 'pro' },
  { href: '/admin', label: 'Admin', icon: Shield, adminOnly: true },
  { href: '/interview', label: 'Mock Interview', icon: Mic, requiredTier: 'pro' },
  { href: '/resume', label: 'Resume Optimizer', icon: FileText, requiredTier: 'pro' },
  { href: '/summary', label: 'Summarizer', icon: Sparkles, requiredTier: 'pro' },
  { href: '/prep/ielts', label: 'Global Exams', icon: Globe, requiredTier: 'pro' },
  { href: '/test/coding', label: 'Coding Test', icon: Code, requiredTier: 'pro' },
  { href: '/test/sql', label: 'SQL Test', icon: Database, requiredTier: 'pro' },
  { href: '/profile', label: 'Settings', icon: Settings },
];

// AppLoader Component
const AppLoader: React.FC = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4 text-center">
      <Logo width={64} height={64} priority />
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" aria-label="Loading" />
        <p className="text-muted-foreground font-medium">Crafting your study space...</p>
      </div>
    </div>
  </div>
);

// PageLoader Component
const PageLoader: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-20">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" aria-label="Loading page content" />
  </div>
);

// PageContent Component
const PageContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex-1 relative">
    <React.Suspense fallback={<PageLoader />}>{children}</React.Suspense>
  </div>
);

// MainLayout Component
export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const { tier, isPro, trialDaysRemaining, isInTrial, isLoading: isSubLoading } = useSubscription();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  // Update last seen in Firestore
  React.useEffect(() => {
    if (!user || !firestore) return;

    const userDocRef = doc(firestore, 'users', user.uid);
    const updateLastSeen = async () => {
      try {
        await updateDocumentNonBlocking(userDocRef, { lastSeen: serverTimestamp() });
      } catch (error) {
        console.error('Failed to update lastSeen:', error);
      }
    };

    const timeout = setTimeout(updateLastSeen, 1000);
    return () => clearTimeout(timeout);
  }, [user, firestore]);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const getUserInitials = (email: string | null | undefined) =>
    email ? email.substring(0, 2).toUpperCase() : '??';

  const getTierLabel = () => {
    switch (tier) {
      case 'pro':
        return 'Pro';
      case 'quiz':
        return 'Quiz';
      default:
        return 'Free';
    }
  };

  if (isUserLoading || !user || isSubLoading) {
    return <AppLoader />;
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r bg-background">
        <SidebarHeader>
          <div className="flex items-center justify-center h-14 lg:h-16 px-4 lg:px-6">
            <Logo />
            <span className="ml-2 text-xl font-bold text-foreground">Proba</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="py-4">
          <SidebarMenu>
            {navItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="mt-auto space-y-3 p-4">
          {tier === 'free' && (
            <Card className="border">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-bold">
                  {isInTrial ? `Trial: ${trialDaysRemaining} Days Left` : 'Upgrade to Unlock More'}
                </CardTitle>
              </CardHeader>
              {isInTrial && (
                <CardContent className="p-4 pt-0">
                  <Progress
                    value={(trialDaysRemaining / 30) * 100}
                    className="h-2"
                    aria-label={`Trial progress: ${trialDaysRemaining} days remaining`}
                  />
                </CardContent>
              )}
              <CardFooter className="p-4 pt-0">
                <Button
                  size="sm"
                  className="w-full font-bold bg-primary text-white"
                  asChild
                  aria-label="Upgrade subscription"
                >
                  <Link href="/subscription">Upgrade Now</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
          <div className="flex items-center gap-3 bg-background p-3 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName || 'User avatar'} />
              <AvatarFallback>{getUserInitials(user.email)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm truncate flex-1">
              <span className="font-semibold text-foreground truncate">
                {user.displayName || user.email}
              </span>
              <Badge
                variant={isPro ? 'default' : tier === 'quiz' ? 'secondary' : 'outline'}
                className="w-fit mt-1"
                aria-label={`Subscription tier: ${getTierLabel()}`}
              >
                {getTierLabel()}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="ml-auto"
              disabled={isSigningOut}
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-4 lg:px-6 sticky top-0 z-10">
          <SidebarTrigger className="md:hidden text-primary" aria-label="Toggle sidebar" />
          <div className="w-full flex-1">
            <h1 className="font-bold text-xl text-foreground">
              {navItems.find((item) => pathname.startsWith(item.href))?.label || 'Proba'}
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            className="md:hidden"
            disabled={isSigningOut}
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4 text-destructive" />
          </Button>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-background min-h-[calc(100vh-60px)]">
          <PageContent>{children}</PageContent>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
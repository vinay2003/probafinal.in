'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { format, formatDistanceToNow } from 'date-fns';
import { Shield } from 'lucide-react';
import { useSubscription } from '@/hooks/use-subscription';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, Timestamp } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type User = {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Timestamp;
  lastSeen: Timestamp;
  isPro: boolean;
  isAdmin: boolean;
};

function LastSeen({ timestamp }: { timestamp: Timestamp | undefined }) {
    if (!timestamp) {
        return <span className="text-muted-foreground">Never</span>;
    }

    const date = timestamp.toDate();
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const isOnline = date > fiveMinutesAgo;

    return (
        <div className="flex items-center gap-2">
            <div className={cn("h-2 w-2 rounded-full", isOnline ? "bg-green-500" : "bg-muted-foreground/50")} />
            <span className="text-muted-foreground">{formatDistanceToNow(date, { addSuffix: true })}</span>
        </div>
    );
}

export default function AdminPage() {
  const router = useRouter();
  const { isAdmin, isLoading: isSubLoading } = useSubscription();
  const firestore = useFirestore();

  const usersQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return collection(firestore, 'users');
  }, [firestore, isAdmin]);

  const { data: users, isLoading: areUsersLoading } = useCollection<User>(usersQuery);

  React.useEffect(() => {
    if (!isSubLoading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, isSubLoading, router]);

  const isLoading = isSubLoading || areUsersLoading;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isAdmin) {
    // This is a fallback while redirecting
    return null;
  }

  const getUserInitials = (email: string | null | undefined) => {
    return email ? email.substring(0, 2).toUpperCase() : '??';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-accent" />
          <CardTitle className="font-bold">Admin Dashboard</CardTitle>
        </div>
        <CardDescription>
          Real-time view of all users on the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined On</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.photoURL ?? ''} />
                        <AvatarFallback>
                          {getUserInitials(user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {user.displayName || 'N/A'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.createdAt
                      ? format(user.createdAt.toDate(), 'PPP')
                      : 'N/A'}
                  </TableCell>
                   <TableCell>
                        <LastSeen timestamp={user.lastSeen} />
                   </TableCell>
                  <TableCell className="text-center">
                    {user.isAdmin ? (
                        <Badge variant="destructive">Admin</Badge>
                    ) : user.isPro ? (
                        <Badge>Pro</Badge>
                    ) : (
                        <Badge variant="secondary">Free</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

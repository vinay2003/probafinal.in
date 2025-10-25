'use client';

import { useState, useEffect } from 'react';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc, Timestamp } from 'firebase/firestore';
import { differenceInDays } from 'date-fns';
import { useFirestore } from '@/firebase';

type UserData = {
  subscriptionTier?: 'free' | 'quiz' | 'pro';
  createdAt?: Timestamp;
  isAdmin?: boolean;
};

export function useSubscription() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userData, isLoading: isUserDataLoading } = useDoc<UserData>(userDocRef);

  const [subscriptionState, setSubscriptionState] = useState({
    tier: 'free' as 'free' | 'quiz' | 'pro',
    isQuiz: false,
    isPro: false,
    isAdmin: false,
    isInTrial: false,
    trialDaysRemaining: 0,
    isLoading: true,
  });

  useEffect(() => {
    const loading = isUserLoading || isUserDataLoading;
    setSubscriptionState(prevState => ({ ...prevState, isLoading: loading }));

    if (loading || !user) {
      if (!loading && !user) {
        setSubscriptionState({
            tier: 'free',
            isQuiz: false,
            isPro: false,
            isAdmin: false,
            isInTrial: false,
            trialDaysRemaining: 0,
            isLoading: false,
        });
      }
      return;
    }
    
    const tier = userData?.subscriptionTier || 'free';
    const isAdmin = userData?.isAdmin || false;

    const createdAt = userData?.createdAt?.toDate() ?? new Date();
    const daysSinceCreation = differenceInDays(new Date(), createdAt);
    const trialDaysRemaining = Math.max(0, 30 - daysSinceCreation);
    const isInTrial = tier === 'free' && trialDaysRemaining > 0;
    
    const isPro = tier === 'pro' || isInTrial;
    const isQuiz = tier === 'quiz' || isPro;

    setSubscriptionState({
      tier,
      isQuiz,
      isPro,
      isAdmin,
      isInTrial,
      trialDaysRemaining,
      isLoading: false,
    });
  }, [isUserLoading, isUserDataLoading, userData, user]);

  return subscriptionState;
}

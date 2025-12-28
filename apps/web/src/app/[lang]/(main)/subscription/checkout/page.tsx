'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { upgradeSubscriptionAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const MOCK_COUPONS: { [key: string]: number } = {
  PRO10: 0.10,
  STUDENT20: 0.20,
  NEWME: 0.10,
  STUDYTIME: 0.10,
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [couponCode, setCouponCode] = React.useState('');
  const [discount, setDiscount] = React.useState(0);
  const [appliedCoupon, setAppliedCoupon] = React.useState<string | null>(null);

  const tier = searchParams.get('tier');

  React.useEffect(() => {
    if (!tier || (tier !== 'quiz' && tier !== 'pro')) {
      router.push('/subscription');
    }
  }, [tier, router]);

  if (!tier || (tier !== 'quiz' && tier !== 'pro')) {
    return null;
  }

  const planDetails = {
    quiz: {
      name: 'Quiz Access',
      price: 49,
    },
    pro: {
      name: 'Pro Access',
      price: 119,
    },
  };

  const selectedPlan = planDetails[tier];
  const finalPrice = selectedPlan.price * (1 - discount);

  const handleApplyCoupon = () => {
    const upperCaseCode = couponCode.toUpperCase();
    if (MOCK_COUPONS[upperCaseCode]) {
      setDiscount(MOCK_COUPONS[upperCaseCode]);
      setAppliedCoupon(upperCaseCode);
      toast({
        title: 'Coupon Applied!',
        description: `${upperCaseCode} gave you a ${(MOCK_COUPONS[upperCaseCode] * 100)}% discount.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid Coupon',
        description: 'The coupon code you entered is not valid.',
      });
    }
  }

  const handleConfirm = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to subscribe.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const result = await upgradeSubscriptionAction(user.uid, tier as 'quiz' | 'pro');
      if (result.success) {
        toast({
          title: 'Upgrade Successful!',
          description: `Welcome to Proba ${selectedPlan.name}! Your features have been unlocked.`,
        });
        router.push('/dashboard');
      } else {
        throw new Error(result.error || 'Unknown error occurred.');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Upgrade Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Confirm Your Subscription</CardTitle>
          <CardDescription>
            You are about to purchase the {selectedPlan.name} plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center border rounded-lg p-4">
              <div>
                <h3 className="font-bold">{selectedPlan.name}</h3>
                <p className="text-muted-foreground">Billed monthly. Cancel anytime.</p>
              </div>
              <p className="text-2xl font-bold">₹{selectedPlan.price}/mo</p>
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className="font-semibold">Apply Coupon</h3>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={!!appliedCoupon}
              />
              <Button onClick={handleApplyCoupon} disabled={!couponCode || !!appliedCoupon}>
                Apply
              </Button>
            </div>
          </div>

          {appliedCoupon && (
            <div className="space-y-2 text-sm">
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{selectedPlan.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span >Discount ({appliedCoupon})</span>
                <span>-₹{(selectedPlan.price * discount).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{finalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="text-center p-4 bg-secondary/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              This is a simulation. No payment will be processed. Clicking "Confirm" will activate your plan immediately.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleConfirm} disabled={isLoading} className="w-full font-bold text-lg py-6">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ₹${finalPrice.toFixed(2)}`
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

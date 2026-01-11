'use client';

import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { initiateEmailSignUp, initiateSocialSignIn } from '@/firebase/non-blocking-login';
import favicon from '@/public/icon/favicon.svg';
import { useDebounce } from 'use-debounce';

// Constants
const FORM_SPACING = 'grid gap-4';
const CAPTCHA_LENGTH = 6;

// Error mapping for Firebase
const ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered. Please log in.',
  'auth/invalid-email': 'The email address is not valid.',
  'auth/weak-password': 'The password is too weak. Please use a stronger password.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
};

// Schema
const signupFormSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character.' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password.' }),
    captcha: z.string().min(1, { message: 'Please enter the captcha.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

// Types
type SignupFormValues = z.infer<typeof signupFormSchema>;

// Utility
const generateCaptcha = () =>
  Math.random().toString(36).substring(2, 2 + CAPTCHA_LENGTH).toUpperCase();

// Components
const EmailField = React.memo(({ control }: { control: any }) => (
  <FormField
    control={control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="m@example.com" {...field} aria-required="true" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
));

const PasswordField = React.memo(
  ({ control, showPassword, togglePassword }: { control: any; showPassword: boolean; togglePassword: () => void }) => (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={showPassword ? 'text' : 'password'}
                {...field}
                aria-required="true"
              />
            </FormControl>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
              onClick={togglePassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
);

const PasswordConfirmField = React.memo(
  ({ control, showPassword, togglePassword }: { control: any; showPassword: boolean; togglePassword: () => void }) => (
    <FormField
      control={control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={showPassword ? 'text' : 'password'}
                {...field}
                aria-required="true"
              />
            </FormControl>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
              onClick={togglePassword}
              aria-label={showPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
);

const CaptchaField = React.memo(
  ({ control, captchaCode, handleRefreshCaptcha }: { control: any; captchaCode: string; handleRefreshCaptcha: () => void }) => (
    <FormField
      control={control}
      name="captcha"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Verification</FormLabel>
          <div className="flex items-center gap-2">
            <div className="flex-1 select-none rounded-md border bg-muted p-2 text-center font-mono text-lg tracking-widest">
              {captchaCode}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleRefreshCaptcha}
              aria-label="Refresh CAPTCHA"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <FormControl>
            <Input placeholder="Enter the code above" {...field} autoComplete="off" aria-required="true" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
);

import { SocialLoginButtons } from '@/components/auth/social-login-buttons';

import { Skeleton } from '@/components/ui/skeleton';

const AuthSkeleton = () => (
  <Card className="mx-auto w-full max-w-md">
    <CardHeader className="text-center">
      <div className="mb-4 flex justify-center">
        <Skeleton className="h-[72px] w-[72px] rounded-full" />
      </div>
      <Skeleton className="h-8 w-48 mx-auto mb-2" />
      <Skeleton className="h-4 w-64 mx-auto" />
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Email */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Password */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Confirm Password */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Captcha */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
      {/* Submit Button */}
      <div className="pt-4">
        <Skeleton className="h-10 w-full" />
      </div>
      {/* Social Login */}
      <div className="space-y-4 pt-4">
        <Skeleton className="h-4 w-32 mx-auto" />
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const [showPassword, setShowPassword] = React.useState(false);
  const [captchaCode, setCaptchaCode] = React.useState(generateCaptcha());
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [debouncedRefreshCaptcha] = useDebounce(() => {
    setCaptchaCode(generateCaptcha());
    form.setValue('captcha', '');
    form.clearErrors('captcha');
  }, 300);

  const form = useForm<SignupFormValues>({
    resolver: (values, context, options) => {
      const schemaWithCaptcha = signupFormSchema.refine(
        (data) => data.captcha.toUpperCase() === captchaCode,
        {
          message: 'CAPTCHA does not match.',
          path: ['captcha'],
        }
      );
      return zodResolver(schemaWithCaptcha)(values, context, options);
    },
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      captcha: '',
    },
  });

  // Focus on first input field on mount
  React.useEffect(() => {
    const firstInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    if (firstInput) firstInput.focus();
  }, []);

  React.useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const onSubmit = async (values: SignupFormValues) => {
    setIsSubmitting(true);
    try {
      await initiateEmailSignUp(auth, firestore, values.email, values.password);
      // Firestore user document is created inside initiateEmailSignUp / handleUserCreation.
      toast({
        title: 'Sign Up Successful',
        description: 'Your account has been created. Redirecting to dashboard...',
      });
    } catch (error: any) {
      const errorMessage = ERROR_MESSAGES[error.code] || 'There was an error creating your account. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <AuthSkeleton />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Sign Up for Proba</title>
        <meta
          name="description"
          content="Join Proba to access personalized study plans and AI-powered learning tools with a 1-month free trial."
        />
        <meta property="og:title" content="Sign Up for Proba" />
        <meta
          property="og:description"
          content="Create a Proba account and start your learning journey with a 1-month free trial."
        />
        <meta property="og:image" content="/icon/favicon.svg" />
        <meta property="og:url" content="https://proba.ai/signup" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Image src={favicon} alt="Proba Logo" width={72} height={72} priority />
            </div>
            <CardTitle className="font-bold text-2xl">Create an Account</CardTitle>
            <CardDescription>Join Proba and start your 1-month free trial.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={FORM_SPACING}
                role="form"
                aria-label="Sign up form"
              >
                <div aria-live="polite">
                  <EmailField control={form.control} />
                  <PasswordField
                    control={form.control}
                    showPassword={showPassword}
                    togglePassword={() => setShowPassword(!showPassword)}
                  />
                  <PasswordConfirmField
                    control={form.control}
                    showPassword={showPassword}
                    togglePassword={() => setShowPassword(!showPassword)}
                  />
                  <CaptchaField
                    control={form.control}
                    captchaCode={captchaCode}
                    handleRefreshCaptcha={debouncedRefreshCaptcha}
                  />
                </div>
                <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </Form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>

            <SocialLoginButtons />

            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
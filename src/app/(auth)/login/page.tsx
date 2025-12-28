'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
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
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import favicon from '@/public/icon/favicon.svg';
import { useDebounce } from 'use-debounce';

// Constants
const FORM_SPACING = 'grid gap-4';
const CAPTCHA_LENGTH = 6;

// Error mapping for Firebase
const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'The email address is not valid.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
};

// Schema
const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  captcha: z.string().min(1, { message: 'Please enter the captcha.' }),
});

// Types
type LoginFormValues = z.infer<typeof loginFormSchema>;

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

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [showPassword, setShowPassword] = React.useState(false);
  const [captchaCode, setCaptchaCode] = React.useState(generateCaptcha());
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [debouncedRefreshCaptcha] = useDebounce(() => {
    setCaptchaCode(generateCaptcha());
    form.setValue('captcha', '');
    form.clearErrors('captcha');
  }, 300);

  const form = useForm<LoginFormValues>({
    resolver: (values, context, options) => {
      const schemaWithCaptcha = loginFormSchema.refine(
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
      captcha: '',
    },
  });

  React.useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await initiateEmailSignIn(auth, values.email, values.password);
      toast({
        title: 'Login Successful',
        description: 'Redirecting to your dashboard...',
      });
    } catch (error: any) {
      const errorMessage = ERROR_MESSAGES[error.code] || 'There was an error logging in. Please try again.';
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login to Proba</title>
        <meta name="description" content="Sign in to your Proba account to access personalized study plans and AI-powered learning tools." />
        <meta property="og:title" content="Login to Proba" />
        <meta property="og:description" content="Sign in to access your Proba account and continue your learning journey." />
        <meta property="og:image" content="/icon/favicon.svg" />
        <meta property="og:url" content="https://proba.ai/login" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Image src={favicon} alt="Proba Logo" width={72} height={72} priority />
            </div>
            <CardTitle className="font-bold text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your Proba account to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={FORM_SPACING}
                role="form"
                aria-label="Login form"
              >
                <div aria-live="polite">
                  <EmailField control={form.control} />
                  <PasswordField
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
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm space-y-2">
              <p>
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                  Sign up
                </Link>
              </p>
              <p>
                Forgot your password?{' '}
                <Link href="/forgot-password" className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                  Reset it
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
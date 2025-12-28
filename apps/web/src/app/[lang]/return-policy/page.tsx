import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Return Policy - Proba',
    description: 'Read our return policy to understand your rights regarding product returns.',
};

export default function ReturnPolicyPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <h1 className="text-4xl font-extrabold mb-8 text-foreground">Return Policy</h1>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                <p>Thank you for choosing Proba. We are committed to ensuring your satisfaction with our AI-powered learning tools.</p>

                <h2 className="text-foreground">Returns</h2>
                <p>As Proba primarily offers digital services and subscriptions, traditional "returns" of physical goods do not typically apply. However, we are committed to resolving any issues you may encounter with our services.</p>

                <h2 className="text-foreground">Subscription Cancellations</h2>
                <p>You may cancel your subscription at any time. Your access will continue until the end of your current billing cycle.</p>

                <h2 className="text-foreground">Contact Us</h2>
                <p>If you have any questions about our Returns and Cancellations Policy, please contact us:</p>
                <ul>
                    <li>By email: support@proba.in</li>
                    <li>By visiting this page on our website: <a href="/contact-us">Contact Us</a></li>
                </ul>
            </div>
        </div>
    );
}

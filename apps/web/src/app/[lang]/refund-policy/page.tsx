import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refund Policy - Proba',
    description: 'Learn about our refund eligibility and processes at Proba.',
};

export default function RefundPolicyPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <h1 className="text-4xl font-extrabold mb-8 text-foreground">Refund Policy</h1>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                <p>At Proba, we strive to provide the best AI interview preparation experience. If you are not entirely satisfied with your purchase, we're here to help.</p>

                <h2 className="text-foreground">Eligibility for Refunds</h2>
                <p>We offer a 7-day money-back guarantee for first-time subscribers. If you are unsatisfied with our service for any reason within the first 7 days of your initial subscription, you may request a full refund.</p>

                <h2 className="text-foreground">Non-refundable Items</h2>
                <ul>
                    <li>Renewal payments (except where required by law)</li>
                    <li>One-time specialized coaching sessions that have already been conducted</li>
                </ul>

                <h2 className="text-foreground">Processing Refunds</h2>
                <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
                <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>

                <h2 className="text-foreground">Late or Missing Refunds</h2>
                <p>If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted.</p>
            </div>
        </div>
    );
}

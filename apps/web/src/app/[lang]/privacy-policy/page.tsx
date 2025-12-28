import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Proba',
    description: 'Understand how Proba collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <h1 className="text-4xl font-extrabold mb-8 text-foreground">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                <p>Proba ("us", "we", or "our") operates the Proba.ai website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

                <h2 className="text-foreground">Information Collection and Use</h2>
                <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>

                <h3 className="text-foreground">Types of Data Collected</h3>
                <h4>Personal Data</h4>
                <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
                <ul>
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Cookies and Usage Data</li>
                </ul>

                <h2 className="text-foreground">Use of Data</h2>
                <p>Proba uses the collected data for various purposes:</p>
                <ul>
                    <li>To provide and maintain the Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To provide customer care and support</li>
                    <li>To provide analysis or valuable information so that we can improve the Service</li>
                </ul>

                <h2 className="text-foreground">Security of Data</h2>
                <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

                <h2 className="text-foreground">Changes to This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            </div>
        </div>
    );
}

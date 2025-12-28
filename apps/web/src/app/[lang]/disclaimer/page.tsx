import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer - Proba',
    description: 'Legal disclaimer regarding the use of Proba’s AI-powered services.',
};

export default function DisclaimerPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <h1 className="text-4xl font-extrabold mb-8 text-foreground">Disclaimer</h1>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                <p>The information provided by Proba ("we," "us," or "our") on our website and mobile application is for general informational purposes only. All information on the Site and our mobile application is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site or our mobile application.</p>

                <h2 className="text-foreground">AI-Generated Content Disclaimer</h2>
                <p>Our Service utilizes Artificial Intelligence (AI) to generate interview questions, feedback, and other content. While we strive for accuracy, AI-generated content:</p>
                <ul>
                    <li>May occasionally generate incorrect information.</li>
                    <li>Should not be considered as professional career counseling or legal advice.</li>
                    <li>Should be verified independently where necessary.</li>
                </ul>

                <h2 className="text-foreground">External Links Disclaimer</h2>
                <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.</p>

                <h2 className="text-foreground">Professional Disclaimer</h2>
                <p>The Site cannot and does not contain legal or career advice. The information is provided for general educational and informational purposes only and is not a substitute for professional advice.</p>
            </div>
        </div>
    );
}

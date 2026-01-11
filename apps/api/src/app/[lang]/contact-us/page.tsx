import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us - Proba',
    description: 'Get in touch with the Proba team for support, feedback, or inquiries.',
};

export default function ContactUsPage() {
    return (
        <div className="container mx-auto py-16 px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold">Get in touch</h1>
                        <p className="text-muted-foreground text-lg">
                            Have a question about our pricing, plans, or features? We're here to help.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <Mail className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Email Us</h3>
                                <p className="text-muted-foreground">support@proba.in</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <MapPin className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Office</h3>
                                <p className="text-muted-foreground">Start-up Hub<br />Bengaluru, Karnataka, India</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-card p-8 rounded-xl shadow-lg border">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                                <Input id="first-name" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                                <Input id="last-name" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

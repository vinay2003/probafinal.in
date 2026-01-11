import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/admin/', '/dashboard/settings'],
        },
        sitemap: 'https://probafinal.in/sitemap.xml',
    };
}

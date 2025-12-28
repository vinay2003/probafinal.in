import { MetadataRoute } from 'next';

const BASE_URL = 'https://probafinal.in'; // Replace with actual domain

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        '',
        '/dashboard',
        '/interview',
        '/quiz',
        '/flashcards',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    // Example dynamic routes - typically fetched from DB
    const exams = ['ielts', 'toefl', 'upsc', 'gate', 'cat', 'neet'];
    const examRoutes = exams.map((exam) => ({
        url: `${BASE_URL}/prep/${exam}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticRoutes, ...examRoutes];
}

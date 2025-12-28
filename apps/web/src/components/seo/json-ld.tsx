export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Proba Global',
        url: 'https://probafinal.in',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://probafinal.in/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };

    const organizationLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Proba Global',
        url: 'https://probafinal.in',
        logo: 'https://probafinal.in/logo.png',
        sameAs: [
            'https://twitter.com/probaglobal',
            'https://facebook.com/probaglobal',
            'https://linkedin.com/company/probaglobal'
        ]
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
            />
        </>
    );
}

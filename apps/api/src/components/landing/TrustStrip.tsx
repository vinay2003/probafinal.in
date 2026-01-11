'use client';

export function TrustStrip() {
    const brands = [
        { name: 'University 1', logo: '🏛️' },
        { name: 'College 2', logo: '🎓' },
        { name: 'Institute 3', logo: '🏫' },
        { name: 'Academy 4', logo: '📚' },
        { name: 'School 5', logo: '✏️' },
    ];

    return (
        <section className="py-10 border-y bg-muted/30">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm font-medium text-muted-foreground mb-6">
                    TRUSTED BY STUDENTS FROM TOP EMPLOYEES & UNIVERSITIES
                </p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale transition-all duration-300 hover:grayscale-0">
                    {brands.map((brand, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xl font-bold text-foreground/60">
                            <span className="text-2xl">{brand.logo}</span>
                            <span>{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

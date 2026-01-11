import { db } from '@/lib/firebase-admin';

// Fallback data for when DB is empty/unreachable
const fallbackPlans = [
    {
        name: "Quiz Access",
        price: "49",
        currency: "₹",
        description: "Perfect for exam prep.",
        features: [
            "Unlimited AI-powered quiz generation",
            "AI feedback on your answers",
        ],
        active: true,
    },
    {
        name: "Pro Access",
        price: "119",
        currency: "₹",
        description: "The ultimate AI study companion.",
        features: [
            "Unlimited AI-powered quiz generation",
            "AI Mock Interview practice",
            "ATS Resume Optimizer",
            "Document Summarizer",
        ],
        active: true,
    },
];

export async function getUsers() {
    if (!db) return [];
    try {
        constsnapshot = await db.collection("users").get();
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.displayName || data.email || "Unknown User",
                email: data.email || "No Email",
                plan: data.subscriptionTier
                    ? data.subscriptionTier.charAt(0).toUpperCase() +
                    data.subscriptionTier.slice(1)
                    : "Free",
                status: "Active",
                date: data.createdAt
                    ? new Date(
                        data.createdAt.toDate
                            ? data.createdAt.toDate()
                            : data.createdAt
                    )
                        .toISOString()
                        .split("T")[0]
                    : "N/A",
            };
        });
    } catch (error) {
        console.error("Failed to fetch users from Firestore", error);
        return [];
    }
}

export async function getUser(id: string) {
    if (!db) return null;
    const doc = await db.collection("users").doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data()!;
    return {
        id: doc.id,
        name: data.displayName || data.email || "Unknown User",
        email: data.email || "No Email",
        plan: data.subscriptionTier || "Free",
        status: "Active",
        date: data.createdAt
            ? new Date(data.createdAt.toDate()).toISOString().split("T")[0]
            : "N/A",
    };
}

export async function getPlans() {
    if (!db) return [];
    try {
        const snapshot = await db.collection("plans").get();
        if (snapshot.empty) return fallbackPlans;
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Failed to fetch plans", error);
        return fallbackPlans;
    }
}

export async function createPlan(plan: any) {
    if (!db) throw new Error("Firebase not initialized");
    try {
        const id = plan.name.toLowerCase().replace(/\s+/g, "-");
        const newPlan = { ...plan, id, active: true };
        await db.collection("plans").doc(id).set(newPlan);
        return newPlan;
    } catch (error) {
        console.error("Failed to create plan", error);
        throw error;
    }
}

export async function getStats() {
    if (!db) return { totalUsers: 0, activeSubs: 0 };
    try {
        // Note: 'count()' is available in newer firebase-admin SDKs
        const usersSnapshot = await db.collection("users").count().get();
        const totalUsers = usersSnapshot.data().count;

        const activeSubsSnapshot = await db
            .collection("users")
            .where("subscriptionTier", "in", ["quiz", "pro"])
            .count()
            .get();
        const activeSubs = activeSubsSnapshot.data().count;

        const statsDoc = await db.collection("system").doc("usage").get();
        const featureUsage = statsDoc.exists
            ? statsDoc.data()
            : {
                interviews: 0,
                resumes: 0,
                flashcards: 0,
                quizzes: 0,
                summaries: 0,
                codeTests: 0,
            };

        return {
            totalUsers,
            activeSubs,
            systemStatus: "Healthy",
            featureUsage,
        };
    } catch (error) {
        console.error("Failed to fetch stats", error);
        return {
            totalUsers: 0,
            activeSubs: 0,
            systemStatus: "Degraded",
            featureUsage: {
                interviews: 0,
                resumes: 0,
                flashcards: 0,
                quizzes: 0,
                summaries: 0,
                codeTests: 0,
            },
        };
    }
}

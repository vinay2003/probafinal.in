const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyCTCOqJth2KlH9S1UvULzWpK3RE1WU8wG8";

async function testGemini() {
    try {
        console.log("Initializing Gemini with latest SDK...");
        const genAI = new GoogleGenerativeAI(API_KEY);
        // Trying the most standard model name first
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = "Explain how AI works in one sentence.";

        console.log("Generating content with gemini-pro...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Success! Response from Gemini:");
        console.log(text);
    } catch (error) {
        console.error("Error testing Gemini:", error.message);
        if (error.response) {
            console.error("Error details:", JSON.stringify(error.response, null, 2));
        }
    }
}

testGemini();

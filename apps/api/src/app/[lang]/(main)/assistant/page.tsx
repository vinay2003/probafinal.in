"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HinglishToggle, HinglishMode } from "@/components/hinglish-toggle";

export default function AssistantPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: "Hello! I am your AI Career Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<HinglishMode>("english");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    const newHistory = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newHistory);
    setInput("");

    // Add loading state placeholder
    setMessages(prev => [...prev, { role: 'ai', content: "..." }]);

    try {
      // Convert history for API: 'ai' -> 'model' mapping is done in backend, 
      // but let's pass clear roles: 'user' | 'ai'
      // We need to map our frontend shape to what the API expects for history
      // API expects: { role: string; parts: string }[]
      const apiHistory = messages.map(m => ({
        role: m.role,
        parts: m.content
      }));

      // Importing dynamically to avoid server-action issues in client component if strict
      const { chatAction } = await import("@/app/actions");
      const response = await chatAction(userMsg, apiHistory);

      // Remove loading placeholder and add real response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.content !== "...");
        return [...filtered, { role: 'ai', content: response.text }];
      });
    } catch (error) {
      console.error("Chat Failed", error);
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.content !== "...");
        return [...filtered, { role: 'ai', content: "Sorry, I'm having trouble connecting to the brain. Please try again." }];
      });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">Explanation Mode:</span>
          <HinglishToggle mode={mode} setMode={setMode} />
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-2 shadow-sm">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border shadow-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
        <div className="p-4 border-t bg-background flex gap-2">
          <Input
            placeholder={`Ask me anything in ${mode}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

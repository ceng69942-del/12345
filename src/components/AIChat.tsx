import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '你好！我是曾鴻奇的 AI 助手。想了解關於他的 Python 開發經驗、2D 動畫作品，或是他的技術背景嗎？歡迎隨時提問！' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `
            你現在是曾鴻奇（Hung-Chi Tseng）的 AI 客服助手。
            你的目標是幫助訪客了解曾鴻奇的專業背景、經驗與作品。
            
            曾鴻奇的背景資訊：
            - 身份：未來的程式設計師，致力於用程式碼構築邏輯，用 AI 賦予靈魂。
            - 核心技能 1：Python 開發。擅長後端邏輯、數據處理、AI 整合。熟悉 FastAPI、PyTorch、自動化腳本。
            - 核心技能 2：2D 動畫製作。擅長使用 Cartoon Animator 5 (CTA5)，包含角色骨架綁定 (Character Rigging) 與 2D 偶戲動畫。
            - 代表作品 1：棒打老虎雞吃蟲（網頁遊戲）。展示了純粹的程式碼結構與遊戲邏輯流轉。
            - 代表作品 2：2D 動畫影片。展示了角色動作、場景設計與敘事邏輯。
            - 聯絡方式：GitHub, Email。
            
            回覆原則：
            1. 語氣要專業、友善且有禮貌。
            2. 盡量簡潔，但要能精確傳達他的優勢。
            3. 如果被問到他不會的技能，可以誠實回答他目前專注於 Python 與動畫領域，並持續學習中。
            4. 使用繁體中文回覆。
          `
        }
      });

      const aiResponse = response.text || '抱歉，我現在無法回答這個問題。';
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: '抱歉，連線似乎出了點問題，請稍後再試。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`mb-4 w-[350px] sm:w-[400px] shadow-2xl rounded-2xl overflow-hidden border border-border bg-card ${isMinimized ? 'h-auto' : 'h-[500px]'}`}
          >
            <Card className="border-none h-full flex flex-col rounded-none">
              <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  <CardTitle className="text-sm font-bold">曾鴻奇 AI 助手</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-white/20 text-white"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-white/20 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              {!isMinimized && (
                <>
                  <CardContent className="flex-1 p-0 overflow-hidden bg-zinc-50/50">
                    <ScrollArea className="h-full p-4" ref={scrollRef}>
                      <div className="space-y-4">
                        {messages.map((m, i) => (
                          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-zinc-200 text-zinc-600'}`}>
                                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                              </div>
                              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-white border border-border rounded-tl-none shadow-sm'}`}>
                                {m.text}
                              </div>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="flex gap-2 items-center text-muted-foreground bg-white border border-border p-3 rounded-2xl rounded-tl-none shadow-sm">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="text-xs">思考中...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <div className="p-4 bg-white border-t border-border">
                    <form 
                      onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                      className="flex gap-2"
                    >
                      <Input 
                        placeholder="輸入您的問題..." 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="rounded-full bg-zinc-100 border-none focus-visible:ring-primary"
                      />
                      <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={isLoading || !input.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="rounded-full w-14 h-14 shadow-xl hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </Button>
    </div>
  );
}

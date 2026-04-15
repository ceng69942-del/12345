/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Mail, 
  Terminal,
  Video,
  Palette,
  Play,
  Maximize2,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Game } from './components/Game';
import { AIChat } from './components/AIChat';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <main className="max-w-[1200px] mx-auto grid lg:grid-cols-2 min-h-screen p-8 lg:p-16 gap-10 lg:gap-20">
        {/* Left Side: Identity */}
        <section className="flex flex-col justify-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[14px] tracking-[0.2em] text-[#888] uppercase mb-5"
          >
            PORTFOLIO {new Date().getFullYear()}
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[64px] lg:text-[84px] font-bold leading-[1.1] mb-6 text-black tracking-tight"
          >
            曾鴻奇
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[20px] leading-[1.6] text-[#4A4A4A] max-w-[400px] space-y-2"
          >
            <span className="block">用程式碼構築邏輯</span>
            <span className="block">用 AI 賦予靈魂</span>
            <strong className="text-black font-semibold block mt-4">一名未來的程式設計師</strong>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex gap-4"
          >
            <Button variant="outline" size="sm" className="rounded-none border-black hover:bg-black hover:text-white transition-all">
              <Mail className="w-4 h-4 mr-2" /> 聯繫我
            </Button>
            <Button variant="ghost" size="sm" className="rounded-none">
              <Github className="w-4 h-4 mr-2" /> GitHub
            </Button>
          </motion.div>
        </section>

        {/* Right Side: Skills & Projects */}
        <section className="flex flex-col justify-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="skill-area"
          >
            <h3 className="section-label">SPECIALIZED IN</h3>
            <div className="bg-white p-8 border-l-4 border-primary shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-[4px] mb-6">
              <div className="text-[28px] font-semibold mb-2 text-primary">Python Development</div>
              <p className="text-[#666] text-[14px]">Backend Logic / Data Processing / AI Integration</p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-none bg-[#F1F3F5] text-[#495057] border-none">FastAPI</Badge>
                <Badge variant="secondary" className="rounded-none bg-[#F1F3F5] text-[#495057] border-none">PyTorch</Badge>
                <Badge variant="secondary" className="rounded-none bg-[#F1F3F5] text-[#495057] border-none">Automation</Badge>
              </div>
            </div>

            <div className="bg-white p-8 border-l-4 border-[#FF7F50] shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-[4px]">
              <div className="text-[28px] font-semibold mb-2 text-[#FF7F50]">2D Animation Production</div>
              <p className="text-[#666] text-[14px]">Cartoon Animator 5 / Character Rigging / Storytelling</p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-none bg-[#FFF5F0] text-[#FF7F50] border-none">CTA5</Badge>
                <Badge variant="secondary" className="rounded-none bg-[#FFF5F0] text-[#FF7F50] border-none">Character Rigging</Badge>
                <Badge variant="secondary" className="rounded-none bg-[#FFF5F0] text-[#FF7F50] border-none">2D Puppetry</Badge>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="project-area"
          >
            <h3 className="section-label">FEATURED WORK</h3>
            <div className="bg-[#111] text-white p-10 rounded-[4px] relative overflow-hidden group mb-6">
              <div className="relative z-10">
                <div className="text-[32px] font-bold mb-3 tracking-tight">棒打老虎雞吃蟲</div>
                <p className="text-white/70 text-[16px] leading-[1.5] mb-6">
                  一個基於邏輯判定與策略互動的經典遊戲複刻作品，展示了純粹的程式碼結構與遊戲邏輯流轉。
                </p>
                <div className="inline-block px-3 py-1 text-[12px] border border-white/30 rounded-full">
                  Logic Game Engine
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal className="w-32 h-32" />
              </div>
            </div>

            <div className="bg-[#fdfdfd] border border-border p-10 rounded-[4px] relative overflow-hidden group">
              <div className="relative z-10">
                <div className="text-[32px] font-bold mb-3 tracking-tight text-black">2D 動畫作品展示</div>
                <p className="text-[#666] text-[16px] leading-[1.5] mb-6">
                  使用 Cartoon Animator 5 製作的趣味動畫，展示了角色動作、場景設計與敘事邏輯的完美結合。
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="inline-block px-3 py-1 text-[12px] border border-primary/30 text-primary rounded-full">
                    2D Animation
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white">
                        <Play className="w-4 h-4 mr-2" /> 播放作品影片
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden">
                      <DialogHeader className="p-4 bg-zinc-900 text-white">
                        <DialogTitle>Cartoon Animator 5 作品展示</DialogTitle>
                      </DialogHeader>
                      <div className="aspect-video w-full bg-black flex items-center justify-center">
                        <video 
                          controls 
                          className="w-full h-full"
                          poster="https://picsum.photos/seed/animation/1280/720"
                        >
                          <source src="/input_file_0.mp4" type="video/mp4" />
                          您的瀏覽器不支援影片播放。
                        </video>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Video className="w-32 h-32 text-black" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="game-preview"
          >
            <h3 className="section-label">INTERACTIVE DEMO</h3>
            <Game />
          </motion.div>
        </section>
      </main>

      <footer className="fixed bottom-10 left-8 lg:left-16 text-[12px] text-[#BBB] font-medium tracking-wider uppercase">
        &copy; {new Date().getFullYear()} HUNG-CHI TSENG. ALL RIGHTS RESERVED.
      </footer>

      <AIChat />
    </div>
  );
}

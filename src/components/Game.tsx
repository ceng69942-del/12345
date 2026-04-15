import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sword, Shield, Trophy, RotateCcw } from 'lucide-react';

type Choice = 1 | 2 | 3 | 4;
const NAMES: Record<Choice, string> = {
  1: '棒子',
  2: '老虎',
  3: '雞',
  4: '蟲',
};

const EMOJIS: Record<Choice, string> = {
  1: '🦯',
  2: '🐯',
  3: '🐔',
  4: '🐛',
};

export function Game() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const play = (choice: Choice) => {
    setIsPlaying(true);
    setPlayerChoice(choice);
    setResult(null);
    setComputerChoice(null);

    // Simulate thinking
    setTimeout(() => {
      const computer = (Math.floor(Math.random() * 4) + 1) as Choice;
      setComputerChoice(computer);
      
      let res = '';
      if (choice === computer) {
        res = '平手';
      } else if (
        (choice === 1 && computer === 2) || // 棒打老虎
        (choice === 2 && computer === 3) || // 老虎吃雞
        (choice === 3 && computer === 4) || // 雞吃蟲
        (choice === 4 && computer === 1)    // 蟲鑽棒子
      ) {
        res = '你贏了！';
        setScore(s => ({ ...s, player: s.player + 1 }));
      } else {
        res = '你輸了...';
        setScore(s => ({ ...s, computer: s.computer + 1 }));
      }
      setResult(res);
      setIsPlaying(false);
    }, 800);
  };

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0 });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden border-2 border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center border-b border-primary/10 bg-primary/5">
        <div className="flex justify-center mb-2">
          <Badge variant="outline" className="px-4 py-1 text-xs font-mono tracking-widest uppercase">
            Project: Stick Tiger Chicken Worm
          </Badge>
        </div>
        <CardTitle className="text-3xl font-bold tracking-tighter">棒打老虎雞吃蟲</CardTitle>
        <CardDescription>經典遊戲重現：棒打老虎、老虎吃雞、雞吃蟲、蟲鑽棒子</CardDescription>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center space-y-2">
            <p className="text-xs font-mono uppercase text-muted-foreground">Player</p>
            <p className="text-4xl font-bold">{score.player}</p>
          </div>
          <div className="flex flex-col items-center">
            <Badge variant="secondary" className="mb-2">VS</Badge>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-xs font-mono uppercase text-muted-foreground">Computer</p>
            <p className="text-4xl font-bold">{score.computer}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-primary/5 border border-primary/10 min-h-[160px]">
            <AnimatePresence mode="wait">
              {playerChoice ? (
                <motion.div
                  key={playerChoice}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-6xl mb-2"
                >
                  {EMOJIS[playerChoice]}
                </motion.div>
              ) : (
                <div className="text-6xl opacity-10">?</div>
              )}
            </AnimatePresence>
            <p className="text-sm font-medium">{playerChoice ? NAMES[playerChoice] : '等待選擇'}</p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-secondary/5 border border-secondary/10 min-h-[160px]">
            <AnimatePresence mode="wait">
              {computerChoice ? (
                <motion.div
                  key={computerChoice}
                  initial={{ scale: 0, rotate: 20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-6xl mb-2"
                >
                  {EMOJIS[computerChoice]}
                </motion.div>
              ) : isPlaying ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="text-4xl text-muted-foreground"
                >
                  <RotateCcw className="w-12 h-12" />
                </motion.div>
              ) : (
                <div className="text-6xl opacity-10">?</div>
              )}
            </AnimatePresence>
            <p className="text-sm font-medium">{computerChoice ? NAMES[computerChoice] : isPlaying ? '思考中...' : '等待電腦'}</p>
          </div>
        </div>

        {result && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <h3 className={`text-2xl font-bold ${result === '你贏了！' ? 'text-green-500' : result === '平手' ? 'text-yellow-500' : 'text-red-500'}`}>
              {result}
            </h3>
          </motion.div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.keys(NAMES) as unknown as Choice[]).map((choice) => (
            <Button
              key={choice}
              variant="outline"
              className="h-24 flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              onClick={() => play(choice)}
              disabled={isPlaying}
            >
              <span className="text-3xl group-hover:scale-125 transition-transform">{EMOJIS[choice]}</span>
              <span className="text-xs font-bold uppercase tracking-wider">{NAMES[choice]}</span>
            </Button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="w-4 h-4 mr-2" />
            重置遊戲
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

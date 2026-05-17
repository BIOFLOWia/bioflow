"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Star, 
  Copy, 
  Laptop, 
  Smartphone,
  MousePointer
} from "lucide-react";
import Image from "next/image";

export function InteractiveVideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Animation values
  const [typedNiche, setTypedNiche] = useState("");
  const [typedDifferential, setTypedDifferential] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [showStarSuccess, setShowStarSuccess] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: "50%", y: "50%" });
  const [showCursor, setShowCursor] = useState(false);

  // Full animation steps logic
  useEffect(() => {
    if (!isPlaying) return;

    setProgress(0);
    setCurrentStep(0);
    setTypedNiche("");
    setTypedDifferential("");
    setIsGenerating(false);
    setShowResult(false);
    setShowCopySuccess(false);
    setShowStarSuccess(false);
    setShowCursor(true);

    const timeline = [
      // 0. Initial wait (1s)
      { 
        time: 1000, 
        action: () => {
          setCursorPos({ x: "25%", y: "38%" }); // Move to niche input
        } 
      },
      // 1. Type niche (1.5s)
      {
        time: 1800,
        action: () => {
          let str = "Estrategista de Vendas";
          let idx = 0;
          const interval = setInterval(() => {
            if (idx <= str.length) {
              setTypedNiche(str.substring(0, idx));
              idx++;
            } else {
              clearInterval(interval);
            }
          }, 40);
        }
      },
      // 2. Move to differential (3.5s)
      {
        time: 3500,
        action: () => {
          setCursorPos({ x: "25%", y: "52%" });
        }
      },
      // 3. Type differential (4s)
      {
        time: 4300,
        action: () => {
          let str = "+R$ 500k faturados";
          let idx = 0;
          const interval = setInterval(() => {
            if (idx <= str.length) {
              setTypedDifferential(str.substring(0, idx));
              idx++;
            } else {
              clearInterval(interval);
            }
          }, 45);
        }
      },
      // 4. Move to Generate Button (6.2s)
      {
        time: 6200,
        action: () => {
          setCursorPos({ x: "32%", y: "78%" }); // Move to generate button
        }
      },
      // 5. Click Generate Button & Show loading (7s)
      {
        time: 7000,
        action: () => {
          setIsGenerating(true);
          setCursorPos({ x: "50%", y: "50%" }); // Move cursor away
        }
      },
      // 6. Streaming Result typed inside Instagram profile (9s)
      {
        time: 9000,
        action: () => {
          setIsGenerating(false);
          setShowResult(true);
        }
      },
      // 7. Move to copy button (11.5s)
      {
        time: 11500,
        action: () => {
          setCursorPos({ x: "83%", y: "45%" });
        }
      },
      // 8. Click Copy Button (12s)
      {
        time: 12200,
        action: () => {
          setShowCopySuccess(true);
        }
      },
      // 9. Move to Star Button (13.5s)
      {
        time: 13500,
        action: () => {
          setCursorPos({ x: "88%", y: "45%" });
        }
      },
      // 10. Click Star Button (14s)
      {
        time: 14000,
        action: () => {
          setShowStarSuccess(true);
        }
      },
      // 11. End Walkthrough (15.5s)
      {
        time: 15500,
        action: () => {
          setShowCursor(false);
        }
      }
    ];

    const timers: NodeJS.Timeout[] = [];
    timeline.forEach((step) => {
      const timer = setTimeout(step.action, step.time);
      timers.push(timer);
    });

    // Progress bar runner
    const duration = 16000; // 16 seconds total
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      
      if (elapsed >= duration) {
        clearInterval(progressInterval);
        setIsPlaying(false);
      }
    }, 100);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/80 backdrop-blur-xl">
      {/* Video Shell Header */}
      <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="bg-black/30 border border-white/5 rounded-lg px-4 py-1 text-xs text-muted-foreground w-1/2 text-center select-none truncate">
          app.bioflow.com/dashboard
        </div>
        <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Demo Ativo
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="relative aspect-video w-full flex bg-[#0c0c0e] p-6 gap-6 select-none overflow-hidden">
        {/* Left Side: Mock Bio Flow App Form */}
        <div className="w-[55%] flex flex-col justify-between p-5 rounded-2xl bg-zinc-900/50 border border-white/5 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gerador Inteligente</span>
            </div>

            {/* Mock input field 1 */}
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-muted-foreground uppercase">Nicho / Profissão</label>
              <div className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs flex items-center text-white relative">
                {typedNiche}
                {currentStep === 0 && isPlaying && (
                  <span className="w-0.5 h-4 bg-primary animate-pulse ml-0.5" />
                )}
                {!typedNiche && <span className="text-zinc-600">Ex: Personal Trainer, Designer...</span>}
              </div>
            </div>

            {/* Mock input field 2 */}
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-muted-foreground uppercase">Seu Diferencial / Prova Social</label>
              <div className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs flex items-center text-white relative">
                {typedDifferential}
                {currentStep === 2 && isPlaying && (
                  <span className="w-0.5 h-4 bg-primary animate-pulse ml-0.5" />
                )}
                {!typedDifferential && <span className="text-zinc-600">Ex: +10 anos de experiência, 500 alunos...</span>}
              </div>
            </div>

            {/* Mock input field 3 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-muted-foreground uppercase">Tom de Voz</label>
                <div className="h-9 w-full rounded-lg border border-white/5 bg-black/20 px-2 py-1 text-[11px] text-white flex items-center">
                  Direto ao ponto
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-muted-foreground uppercase">Objetivo</label>
                <div className="h-9 w-full rounded-lg border border-white/5 bg-black/20 px-2 py-1 text-[11px] text-white flex items-center">
                  Gerar Leads
                </div>
              </div>
            </div>
          </div>

          {/* Glowing Generate Button */}
          <button 
            type="button"
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
              isGenerating 
                ? "bg-primary/20 border-primary text-primary animate-pulse" 
                : "bg-primary border-primary/50 text-white hover:bg-primary/95 glow-primary"
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Criando Bio Perfeita...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Gerar Bio com IA ✨
              </>
            )}
          </button>
        </div>

        {/* Right Side: Mock Live Instagram Preview */}
        <div className="w-[45%] flex flex-col justify-between p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
          <div className="bg-black rounded-xl p-4 border border-white/5 flex-1 flex flex-col justify-between relative overflow-hidden">
            {/* Header phone info */}
            <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="text-[10px] font-bold text-white">instagram.com</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <div className="w-3 h-1 bg-zinc-700 rounded-full" />
              </div>
            </div>

            {/* Profile info header */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary p-0.5 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold text-primary">
                  BF
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="font-bold text-[11px] text-white flex items-center gap-1">
                  seu.perfil
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-[7px] text-white font-bold">✓</div>
                </div>
                <div className="flex gap-3 text-[9px] text-muted-foreground">
                  <div><strong className="text-white">10.4k</strong> seguidores</div>
                  <div><strong className="text-white">492</strong> seguindo</div>
                </div>
              </div>
            </div>

            {/* Real-time Streaming Bio text area */}
            <div className="my-3 flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {showResult ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-zinc-100 space-y-1 bg-white/[0.02] border border-white/5 p-3 rounded-lg relative"
                  >
                    <div className="font-semibold text-zinc-300 text-[9px] mb-1">Resultado da IA:</div>
                    <p className="text-white font-medium">⚡ Estrategista de Vendas de Elite</p>
                    <p className="text-white font-medium">📈 +R$ 500k faturados para mentorados</p>
                    <p className="text-white font-medium">🧠 Estruturas de vendas escaláveis</p>
                    <p className="text-white font-medium">👇 Agende uma sessão de diagnóstico 👇</p>
                    <p className="text-primary font-bold">🔗 bioflow.com/sucesso</p>

                    {/* Copy/Star action buttons */}
                    <div className="absolute right-2 top-2 flex items-center gap-1.5">
                      <button 
                        type="button"
                        className={`p-1.5 rounded-md border transition-all ${
                          showCopySuccess 
                            ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" 
                            : "bg-black/50 border-white/10 text-muted-foreground hover:text-white"
                        }`}
                      >
                        {showCopySuccess ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                      <button 
                        type="button"
                        className={`p-1.5 rounded-md border transition-all ${
                          showStarSuccess 
                            ? "bg-amber-500/20 border-amber-500/30 text-amber-400" 
                            : "bg-black/50 border-white/10 text-muted-foreground hover:text-white"
                        }`}
                      >
                        <Star className={`w-3 h-3 ${showStarSuccess ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-6 text-zinc-600 text-[10px] border border-dashed border-white/5 rounded-lg flex flex-col items-center gap-2">
                    <Sparkles className="w-5 h-5 text-zinc-700 animate-pulse" />
                    Aguardando preenchimento...
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Mock mini post grid layout */}
            <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/5">
              <div className="aspect-square bg-white/5 rounded-sm" />
              <div className="aspect-square bg-white/5 rounded-sm" />
              <div className="aspect-square bg-white/5 rounded-sm" />
            </div>
          </div>
        </div>

        {/* Interactive Mouse Pointer Simulation */}
        {showCursor && isPlaying && (
          <motion.div 
            animate={{ x: cursorPos.x, y: cursorPos.y }}
            transition={{ type: "tween", ease: "easeInOut", duration: 1.2 }}
            className="absolute top-0 left-0 w-6 h-6 text-white pointer-events-none drop-shadow-lg z-50 flex items-center justify-center"
            style={{ originX: 0, originY: 0 }}
          >
            <MousePointer className="w-5 h-5 text-white fill-white stroke-black" />
          </motion.div>
        )}

        {/* Video Player Action Overlay (Before play) */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 transition-all duration-300">
            {/* Absolute generated background fallback */}
            <div className="absolute inset-0 z-0 opacity-40">
              <Image 
                src="/dashboard-preview.png" 
                alt="Bio Flow Dashboard Preview Background"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <button 
              onClick={() => setIsPlaying(true)}
              className="z-10 group relative w-24 h-24 rounded-full bg-primary/20 backdrop-blur-2xl border border-primary/50 flex items-center justify-center glow-primary cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-full bg-primary/10 group-hover:scale-125 group-hover:opacity-0 transition-all duration-1000 animate-ping" />
              <Play className="w-10 h-10 text-white fill-white ml-2 transition-transform duration-300 group-hover:scale-110" />
            </button>

            <h3 className="z-10 text-xl font-bold mt-6 tracking-tight text-white">Assista ao Vídeo de Apresentação</h3>
            <p className="z-10 text-xs text-muted-foreground mt-2 max-w-sm text-center">
              Veja em 15 segundos como gerar, customizar e salvar bios estratégicas que convertem visitantes em clientes!
            </p>
          </div>
        )}
      </div>

      {/* Video Controller Footer */}
      <div className="bg-zinc-950 px-5 py-3 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground select-none">
        <div className="flex items-center gap-4">
          {isPlaying ? (
            <button 
              onClick={() => setIsPlaying(false)}
              className="p-1 rounded hover:bg-white/5 text-white transition-colors"
            >
              <Pause className="w-4 h-4 fill-white" />
            </button>
          ) : (
            <button 
              onClick={() => setIsPlaying(true)}
              className="p-1 rounded hover:bg-white/5 text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <span>
            {isPlaying ? `0:${Math.min(Math.floor((progress/100) * 16), 16).toString().padStart(2, '0')}` : "0:00"} / 0:16
          </span>
        </div>

        {/* Timeline Slider Track */}
        <div className="flex-1 mx-6 h-1.5 rounded-full bg-white/10 relative overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-100" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Device simulation icon indicator */}
        <div className="flex items-center gap-3">
          <Laptop className="w-4 h-4 text-primary" />
          <Smartphone className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Camera, 
  PenTool, 
  Smartphone,
  Star
} from "lucide-react";
import { PricingCards } from "@/components/PricingCards";
import { InteractiveVideoDemo } from "@/components/InteractiveVideoDemo";


const features = [
  {
    title: "IA Especializada",
    description: "Nossa IA não apenas escreve, ela aplica gatilhos mentais e estratégias de copywriting validadas.",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    title: "Preview em Tempo Real",
    description: "Veja exatamente como sua bio ficará no Instagram antes mesmo de copiar.",
    icon: Smartphone,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Analytics Avançado",
    description: "Entenda quais tipos de bio geram mais interesse e acompanhe seu crescimento.",
    icon: BarChart3,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

const steps = [
  {
    num: "01",
    title: "Defina seu Nicho",
    description: "Escolha sua área de atuação e tom de voz desejado.",
  },
  {
    num: "02",
    title: "IA Gera Opções",
    description: "Nossa inteligência cria variações estratégicas para você.",
  },
  {
    num: "03",
    title: "Copie e Brilhe",
    description: "Escolha a melhor, copie e veja seu perfil se transformar.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50 backdrop-blur-md bg-background/50 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 glow-primary bg-background">
            <Image src="/logo.png" alt="Bio Flow Logo" fill className="object-cover" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Bio Flow
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 mr-8">
          <Link href="#funcionalidades" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</Link>
          <Link href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Como funciona</Link>
          <Link href="#precos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Preços</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Entrar
          </Link>
          <Link href="/dashboard" className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all glow-primary font-semibold">
            Começar Agora
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-48 pb-32 px-4 flex flex-col items-center text-center z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 text-primary backdrop-blur-md animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>Bio Flow AI 2.0 — O futuro do Posicionamento Digital</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
              Transforme seu Perfil em uma <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-400">
                Máquina de Conversão
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              Crie bios estratégicas que geram autoridade instantânea. Use IA treinada por especialistas em marketing para destacar seu perfil na multidão.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
              <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold text-xl hover:bg-primary/90 transition-all glow-primary hover:scale-105 shadow-2xl shadow-primary/20">
                Começar Grátis
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link href="#funcionalidades" className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm">
                Ver Funcionalidades
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="flex flex-wrap items-center justify-center gap-12 py-8 border-y border-white/5">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50k+</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Bios Geradas</div>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Aprovação</div>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9/5</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Estrelas</div>
              </div>
            </div>
          </motion.div>

          {/* Abstract Preview Image / Interactive Video Demo */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-20 relative w-full max-w-5xl px-4 flex justify-center"
          >
            <InteractiveVideoDemo />
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="funcionalidades" className="py-32 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Tudo que você precisa para <br /> um perfil de elite</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Esqueça ferramentas genéricas. O Bio Flow foi desenhado para resultados reais no Instagram, TikTok e LinkedIn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all flex flex-col gap-6"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${feature.bg}`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="como-funciona" className="py-32 px-4 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">Gere sua bio em <br /> menos de 30 segundos</h2>
              <div className="space-y-12">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-4xl font-black text-primary/20 font-mono tracking-tighter leading-none">{step.num}</div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2">{step.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                  Testar agora gratuitamente <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative rounded-[40px] border-[12px] border-[#222] overflow-hidden shadow-2xl">
                 <Image src="/app-preview.png" alt="App Preview" width={600} height={1200} className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials (Social Proof) */}
        <section className="py-32 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
            </div>
            <h3 className="text-3xl md:text-5xl font-medium italic mb-12 leading-snug">
              "O Bio Flow mudou o jogo do meu Instagram. Em menos de 1 semana comecei a receber mais mensagens no direct apenas pela clareza da minha nova bio."
            </h3>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-white/10 overflow-hidden">
                <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Testimonial" width={64} height={64} />
              </div>
              <div className="font-bold text-lg">Ricardo Almeida</div>
              <div className="text-muted-foreground text-sm">Estrategista Digital</div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="precos">
          <PricingCards />
        </section>

        {/* Final CTA */}
        <section className="py-40 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Pronto para elevar <br /> seu posicionamento?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Junte-se a milhares de creators que já estão usando o poder da IA para converter seguidores em fãs apaixonados.
            </p>
            <Link href="/dashboard" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-12 py-6 rounded-full font-bold text-2xl hover:bg-primary/90 transition-all glow-primary shadow-2xl shadow-primary/40">
              Gerar minha Bio Grátis
              <Sparkles className="w-6 h-6" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span className="font-bold text-xl">Bio Flow</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Elevando o nível do posicionamento digital através da inteligência artificial.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-6">Produto</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#funcionalidades" className="hover:text-primary transition-colors">Funcionalidades</Link></li>
              <li><Link href="#como-funciona" className="hover:text-primary transition-colors">Como funciona</Link></li>
              <li><Link href="#precos" className="hover:text-primary transition-colors">Preços</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Empresa</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/sobre" className="hover:text-primary transition-colors">Sobre nós</Link></li>
              <li><Link href="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
              <li><Link href="/privacidade" className="hover:text-primary transition-colors">Privacidade</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Social</h5>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Camera className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <PenTool className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 Bio Flow AI. Todos os direitos reservados.</p>
          <p>Feito com ❤️ por Antigravity</p>
        </div>
      </footer>
    </div>
  );
}

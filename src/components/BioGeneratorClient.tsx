"use client";

import { useState } from "react";
import Image from "next/image";
import { useCompletion } from "@ai-sdk/react";
import { Sparkles, Copy, RefreshCw, Heart, Crown, ArrowRight, Lock, Zap } from "lucide-react";
import { saveBio, toggleFavoriteBio } from "@/app/actions/bio";
import Link from "next/link";

const NICHES = ["Marketing Digital", "Saúde e Bem-estar", "Finanças", "Tecnologia", "Moda", "Negócios Locais", "Outro"];
const TONES = ["Profissional", "Descontraído", "Inspirador", "Direto ao ponto", "Engraçado"];
const OBJECTIVES = ["Vendas", "Autoridade", "Conversão de Leads", "Branding Pessoal", "Engajamento"];

function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass border border-primary/30 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-primary/20 animate-in zoom-in-95 duration-300">
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-primary/5 pointer-events-none" />

        <div className="flex flex-col items-center text-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center glow-primary">
            <Crown className="w-8 h-8 text-primary" />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Limite atingido!</h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              Você utilizou as <strong>2 bios gratuitas</strong>. Faça upgrade para o plano <strong className="text-primary">Pro</strong> e gere bios ilimitadas pelo valor de um café por semana.
            </p>
          </div>

          {/* Plan comparison */}
          <div className="w-full grid grid-cols-2 gap-3 py-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-xs text-muted-foreground mb-1">Free</div>
              <div className="font-bold">2 bios</div>
              <div className="text-xs text-muted-foreground mt-1">R$ 0/mês</div>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 text-center relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-semibold">
                Upgrade
              </div>
              <div className="text-xs text-primary mb-1 mt-1">Pro</div>
              <div className="font-bold">Ilimitado ✨</div>
              <div className="text-xs text-muted-foreground mt-1">R$ 27/mês</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Link
              href="/plano"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 glow-primary transition-all"
            >
              <Crown className="w-4 h-4" />
              Ver Planos e Fazer Upgrade
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onClose}
              className="w-full py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            >
              Agora não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BioGeneratorClient({ biosUsed = 0, subscriptionTier = "FREE" }: { biosUsed?: number; subscriptionTier?: string }) {
  const [formData, setFormData] = useState({
    profession: "",
    niche: "",
    objective: "",
    tone: "",
    differential: "",
    cta: "",
  });

  const [currentBioId, setCurrentBioId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const isFree = subscriptionTier === "FREE";
  const isAtLimit = isFree && biosUsed >= 2;

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/generate-bio",
    onFinish: async (prompt, result) => {
      const response = await saveBio(result, formData);
      if (response.success && response.bioId) {
        setCurrentBioId(response.bioId);
      }
      setIsFavorite(false);
    },
    onError: (error) => {
      // Handle limit reached error
      try {
        const parsed = JSON.parse(error.message);
        if (parsed.error === "LIMIT_REACHED") {
          setShowUpgradeModal(true);
        }
      } catch {
        console.error("Error generating bio:", error);
      }
    },
  });

  const handleGenerate = async () => {
    if (!formData.profession && !formData.niche) return;
    if (isAtLimit) {
      setShowUpgradeModal(true);
      return;
    }
    await complete(JSON.stringify(formData));
  };

  const handleCopy = () => {
    if (completion) navigator.clipboard.writeText(completion);
  };

  const handleFavorite = async () => {
    if (!currentBioId) return;
    setIsFavorite(!isFavorite);
    const response = await toggleFavoriteBio(currentBioId, isFavorite);
    if (!response.success) setIsFavorite(isFavorite);
  };

  return (
    <>
      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}

      {/* Free plan usage indicator */}
      {isFree && (
        <div className={`flex items-center justify-between p-4 rounded-xl border mb-6 ${isAtLimit ? "bg-red-500/10 border-red-500/30" : "bg-white/5 border-white/10"}`}>
          <div className="flex items-center gap-3">
            {isAtLimit ? <Lock className="w-4 h-4 text-red-400" /> : <Zap className="w-4 h-4 text-primary" />}
            <span className="text-sm font-medium">
              {isAtLimit ? (
                <span className="text-red-400">Limite atingido: 2/2 bios utilizadas</span>
              ) : (
                <span>{biosUsed}/2 bios gratuitas utilizadas</span>
              )}
            </span>
          </div>
          <Link href="/plano" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
            <Crown className="w-3 h-3" /> Upgrade Pro — Ilimitado
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className={`glass p-6 rounded-2xl border flex flex-col gap-6 ${isAtLimit ? "border-red-500/20 opacity-75" : "border-white/10"}`}>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Configuração da Bio
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">O que você faz? (Profissão/Cargo)</label>
              <input
                type="text"
                placeholder="Ex: Nutricionista Esportiva"
                className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                disabled={isAtLimit}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nicho</label>
                <select
                  className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 text-white [&>option]:bg-zinc-900 [&>option]:text-white"
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  disabled={isAtLimit}
                >
                  <option value="" disabled className="bg-zinc-900 text-white">Selecione...</option>
                  {NICHES.map(n => <option key={n} value={n} className="bg-zinc-900 text-white">{n}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tom de Voz</label>
                <select
                  className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 text-white [&>option]:bg-zinc-900 [&>option]:text-white"
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  disabled={isAtLimit}
                >
                  <option value="" disabled className="bg-zinc-900 text-white">Selecione...</option>
                  {TONES.map(t => <option key={t} value={t} className="bg-zinc-900 text-white">{t}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Qual seu maior diferencial/prova social?</label>
              <input
                type="text"
                placeholder="Ex: +1000 alunos transformados"
                className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
                value={formData.differential}
                onChange={(e) => setFormData({ ...formData, differential: e.target.value })}
                disabled={isAtLimit}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Objetivo Principal</label>
                <select
                  className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 text-white [&>option]:bg-zinc-900 [&>option]:text-white"
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  disabled={isAtLimit}
                >
                  <option value="" disabled className="bg-zinc-900 text-white">Selecione...</option>
                  {OBJECTIVES.map(o => <option key={o} value={o} className="bg-zinc-900 text-white">{o}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Call to Action (CTA)</label>
                <input
                  type="text"
                  placeholder="Ex: Agende sua consulta"
                  className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
                  value={formData.cta}
                  onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                  disabled={isAtLimit}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || (!formData.profession && !formData.niche && !isAtLimit)}
            className={`mt-4 w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all ${
              isAtLimit
                ? "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 glow-primary"
                : "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary disabled:opacity-50"
            }`}
          >
            {isLoading ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Analisando posicionamento estratégico...</>
            ) : isAtLimit ? (
              <><Crown className="w-4 h-4" /> Fazer Upgrade para Continuar</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Gerar Bio Premium</>
            )}
          </button>
        </div>

        {/* Preview Instagram */}
        <div className="flex flex-col items-center justify-center p-8 glass rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50" />

          <div className="w-[320px] bg-[#121212] rounded-[40px] border-[8px] border-[#2a2a2a] overflow-hidden relative shadow-2xl z-10 font-sans">
            <div className="h-7 w-full flex justify-center items-end pb-1 bg-[#121212]">
              <div className="w-1/3 h-4 bg-black rounded-b-xl" />
            </div>
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
              <span className="font-bold text-sm tracking-tight">seuperfil.oficial</span>
              <div className="flex gap-4">
                <span className="w-5 h-5 border-2 border-white rounded-md" />
                <span className="w-5 h-5 border-y-2 border-white flex flex-col justify-between py-1"><span className="w-full h-px bg-white" /></span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/20 p-1">
                  <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center">
                    <Image src="/logo.png" alt="Avatar" width={40} height={40} className="rounded-full opacity-50" />
                  </div>
                </div>
                <div className="flex flex-1 justify-around text-center">
                  <div><div className="font-bold">128</div><div className="text-xs">Posts</div></div>
                  <div><div className="font-bold">10.5K</div><div className="text-xs">Followers</div></div>
                  <div><div className="font-bold">450</div><div className="text-xs">Following</div></div>
                </div>
              </div>
              <div className="text-sm">
                <div className="font-bold mb-1">{formData.profession || "Seu Nome Completo"}</div>
                <div className="text-white/60 mb-1">{formData.niche || "Empreendedor(a)"}</div>
                <div className="whitespace-pre-line leading-snug">
                  {isLoading && !completion ? (
                    <div className="space-y-2 py-2">
                      <div className="h-3 w-3/4 bg-white/10 rounded animate-pulse" />
                      <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
                      <div className="h-3 w-5/6 bg-white/10 rounded animate-pulse" />
                      <div className="h-3 w-1/2 bg-white/10 rounded animate-pulse" />
                    </div>
                  ) : completion ? completion : (
                    <span className="text-white/40 italic">Sua bio gerada por inteligência artificial aparecerá aqui.</span>
                  )}
                </div>
                <div className="mt-2 text-[#E0F1FF] font-medium">linktr.ee/seuperfil</div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-white/10 rounded-lg py-1.5 text-sm font-semibold">Edit profile</button>
                <button className="flex-1 bg-white/10 rounded-lg py-1.5 text-sm font-semibold">Share profile</button>
              </div>
            </div>
          </div>

          {completion && !isLoading && (
            <div className="mt-8 flex gap-3 z-10 animate-in slide-in-from-bottom-4">
              <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
                <Copy className="w-4 h-4" /> Copiar
              </button>
              <button
                onClick={handleFavorite}
                disabled={!currentBioId}
                className={`flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium transition-colors ${isFavorite ? "text-red-400 bg-red-400/10 border-red-400/20" : "hover:bg-white/10"}`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? "Favoritado" : "Favoritar"}
              </button>
              <button onClick={handleGenerate} disabled={isAtLimit} className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-xl text-sm font-medium text-primary hover:bg-primary/30 transition-colors disabled:opacity-50">
                <RefreshCw className="w-4 h-4" /> Regenerar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}



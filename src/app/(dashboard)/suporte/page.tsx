import { HelpCircle, Mail, MessageSquare, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
          <HelpCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suporte ao Cliente</h1>
          <p className="text-muted-foreground mt-1">Estamos aqui para ajudar você a crescer o seu perfil.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp Support */}
        <div className="glass p-8 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col gap-6 group hover:border-primary/40 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
            <MessageSquare className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">WhatsApp Prioritário</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Fale diretamente com nosso time técnico para dúvidas rápidas e suporte imediato.
            </p>
            <Link 
              href="https://wa.me/5541984372637?text=Olá! Preciso de suporte com o Bio Flow." 
              target="_blank"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all glow-primary"
            >
              Iniciar Chat <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Email Support */}
        <div className="glass p-8 rounded-2xl border border-white/10 flex flex-col gap-6 hover:border-white/20 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
            <Mail className="w-7 h-7 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Suporte por E-mail</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Para questões comerciais ou problemas complexos, envie um e-mail para nosso time.
            </p>
            <Link 
              href="mailto:suporte@bioflow.app" 
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
            >
              Enviar E-mail
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Preview */}
      <section className="glass p-8 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold mb-6">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {[
            { q: "Como cancelar minha assinatura?", a: "Você pode cancelar a qualquer momento na aba 'Configurações' ou diretamente no painel de faturamento do Stripe." },
            { q: "As bios geradas são únicas?", a: "Sim, nossa IA gera combinações estratégicas únicas baseadas nos dados específicos que você fornece." },
            { q: "O plano Pro tem limite diário?", a: "Não! O plano Pro oferece gerações ilimitadas para você testar quantas variações desejar." }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
              <h4 className="font-bold text-sm mb-1">{item.q}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import { Bell, Shield, CreditCard, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export function SettingsList() {
  const items = [
    { icon: Bell, label: "Notificações", desc: "Gerencie alertas e emails" },
    { icon: Shield, label: "Privacidade & Segurança", desc: "Senhas e autenticação" },
    { icon: CreditCard, label: "Faturamento", desc: "Histórico de pagamentos e faturas" },
  ];

  const handleClick = (label: string) => {
    toast.info(`${label}: Esta funcionalidade estará disponível em breve! 🚀`);
  };

  return (
    <div className="glass rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/5">
      {items.map(({ icon: Icon, label, desc }) => (
        <button 
          key={label} 
          onClick={() => handleClick(label)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <Icon className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">{label}</div>
              <div className="text-xs text-muted-foreground">{desc}</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
}

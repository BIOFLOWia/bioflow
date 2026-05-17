"use client";

import { useState } from "react";
import { 
  Bell, 
  Shield, 
  CreditCard, 
  ChevronRight, 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  Check, 
  Save,
  Download
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

interface SettingsContainerProps {
  initialUser: {
    name: string | null;
    email: string | null;
    image: string | null;
    subscriptionTier: string;
  };
}

type TabType = null | "profile" | "notifications" | "privacy" | "billing";

export function SettingsContainer({ initialUser }: SettingsContainerProps) {
  const [activeTab, setActiveTab] = useState<TabType>(null);
  const [userName, setUserName] = useState(initialUser.name || "");
  const [saving, setSaving] = useState(false);

  // States for Notifications Form
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [aiTips, setAiTips] = useState(true);

  // States for Security Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);

  const isFree = initialUser.subscriptionTier === "FREE";

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API update call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSaving(false);
    toast.success("Perfil atualizado com sucesso!");
    setActiveTab(null);
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaving(false);
    toast.success("Preferências de notificação salvas!");
    setActiveTab(null);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("A nova senha e a confirmação não coincidem!");
      return;
    }
    
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSaving(false);
    toast.success("Senha alterada com sucesso!");
    
    // Clear password inputs
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setActiveTab(null);
  };

  const handleToggleMfa = () => {
    const newState = !mfaEnabled;
    setMfaEnabled(newState);
    if (newState) {
      toast.success("Autenticação de Dois Fatores ativada! 🔒");
    } else {
      toast.warning("Autenticação de Dois Fatores desativada.");
    }
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 pb-4 border-b border-white/5">
              <button 
                type="button" 
                onClick={() => setActiveTab(null)}
                className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-bold text-lg">Editar Perfil</h3>
                <p className="text-xs text-muted-foreground">Atualize suas informações pessoais.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome Completo</label>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  value={initialUser.email || ""} 
                  disabled
                  className="flex h-11 w-full rounded-xl border border-white/5 bg-white/5 opacity-50 px-3 py-2 text-sm cursor-not-allowed"
                />
                <p className="text-[11px] text-muted-foreground">O endereço de email não pode ser alterado diretamente.</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
              <button 
                type="button" 
                onClick={() => setActiveTab(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-white/10 hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={saving}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 glow-primary disabled:opacity-50"
              >
                {saving ? "Salvando..." : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </form>
        );

      case "notifications":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 pb-4 border-b border-white/5">
              <button 
                onClick={() => setActiveTab(null)}
                className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-bold text-lg">Notificações</h3>
                <p className="text-xs text-muted-foreground">Escolha como e quando deseja receber alertas.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="space-y-1">
                  <div className="font-medium text-sm">Alertas por Email</div>
                  <div className="text-xs text-muted-foreground">Receba relatórios semanais de desempenho de bios.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={emailAlerts}
                  onChange={() => setEmailAlerts(!emailAlerts)}
                  className="w-5 h-5 rounded border-white/10 text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="space-y-1">
                  <div className="font-medium text-sm">Atualizações da Conta</div>
                  <div className="text-xs text-muted-foreground">Receba e-mails sobre pagamentos, faturas e segurança.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={marketingEmails}
                  onChange={() => setMarketingEmails(!marketingEmails)}
                  className="w-5 h-5 rounded border-white/10 text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="space-y-1">
                  <div className="font-medium text-sm">Dicas de IA & Novidades</div>
                  <div className="text-xs text-muted-foreground">Seja o primeiro a saber sobre novos modelos de IA e novidades no app.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={aiTips}
                  onChange={() => setAiTips(!aiTips)}
                  className="w-5 h-5 rounded border-white/10 text-primary focus:ring-primary accent-primary cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
              <button 
                onClick={() => setActiveTab(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-white/10 hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSaveNotifications}
                disabled={saving}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 glow-primary"
              >
                {saving ? "Salvando..." : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar Preferências
                  </>
                )}
              </button>
            </div>
          </div>
        );

      case "privacy":
        return (
          <form onSubmit={handleUpdatePassword} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 pb-4 border-b border-white/5">
              <button 
                type="button" 
                onClick={() => setActiveTab(null)}
                className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-bold text-lg">Privacidade & Segurança</h3>
                <p className="text-xs text-muted-foreground">Mantenha sua conta protegida com senhas seguras.</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Autenticação de Dois Fatores */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
                <div className="space-y-1">
                  <div className="font-medium text-sm">Autenticação de Dois Fatores (MFA)</div>
                  <div className="text-xs text-muted-foreground">Adicione uma camada extra de segurança para login.</div>
                </div>
                <button 
                  type="button"
                  onClick={handleToggleMfa}
                  className={`w-12 h-6 rounded-full p-1 transition-all ${mfaEnabled ? 'bg-primary flex justify-end' : 'bg-white/10 flex justify-start'}`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>

              <div className="h-px bg-white/5 my-4" />

              <h4 className="font-semibold text-sm">Alterar Senha</h4>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Senha Atual</label>
                  <input 
                    type="password" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Nova Senha</label>
                    <input 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Confirmar Nova Senha</label>
                    <input 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
              <button 
                type="button" 
                onClick={() => setActiveTab(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-white/10 hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={saving}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 glow-primary"
              >
                {saving ? "Alterando..." : (
                  <>
                    <Lock className="w-4 h-4" />
                    Alterar Senha
                  </>
                )}
              </button>
            </div>
          </form>
        );

      case "billing":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 pb-4 border-b border-white/5">
              <button 
                onClick={() => setActiveTab(null)}
                className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-bold text-lg">Faturamento</h3>
                <p className="text-xs text-muted-foreground">Monitore sua assinatura e histórico de faturas.</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Plano details card */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Plano Atual</div>
                  <div className="font-bold text-xl mt-1 text-primary">Bio Flow {initialUser.subscriptionTier}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {isFree ? "Controle básico e limites normais" : "Acesso premium completo com IA ilimitada"}
                  </div>
                </div>
                <Link 
                  href="/plano" 
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  {isFree ? "Assinar Pro ✨" : "Alterar Plano"}
                </Link>
              </div>

              {/* Invoice History */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Histórico de Transações</h4>
                
                {isFree ? (
                  <div className="text-center p-6 text-sm text-muted-foreground rounded-xl bg-white/[0.01] border border-dashed border-white/5">
                    Nenhum pagamento efetuado. Você está na versão gratuita.
                  </div>
                ) : (
                  <div className="overflow-hidden border border-white/5 rounded-xl divide-y divide-white/5 bg-white/[0.01]">
                    {[
                      { date: "17 Mai 2026", desc: "Bio Flow Premium (Mensal)", amt: "R$ 29,90", status: "Pago" },
                      { date: "17 Abr 2026", desc: "Bio Flow Premium (Mensal)", amt: "R$ 29,90", status: "Pago" },
                    ].map((inv, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 text-sm">
                        <div>
                          <div className="font-medium">{inv.desc}</div>
                          <div className="text-xs text-muted-foreground">{inv.date}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="font-semibold">{inv.amt}</div>
                          <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                            {inv.status}
                          </span>
                          <button 
                            onClick={() => toast.success("Fatura baixada com sucesso! 📄")}
                            className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                            title="Baixar PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/5">
              <button 
                onClick={() => setActiveTab(null)}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="glass rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/5">
            {[
              { id: "notifications" as TabType, icon: Bell, label: "Notificações", desc: "Gerencie alertas e emails" },
              { id: "privacy" as TabType, icon: Shield, label: "Privacidade & Segurança", desc: "Senhas e autenticação" },
              { id: "billing" as TabType, icon: CreditCard, label: "Faturamento", desc: "Histórico de pagamentos e faturas" },
            ].map(({ id, icon: Icon, label, desc }) => (
              <button 
                key={label} 
                onClick={() => setActiveTab(id)}
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
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-2">Gerencie sua conta e preferências.</p>
      </div>

      {/* Profile Card */}
      <div className="glass p-6 rounded-2xl border border-white/10">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">Perfil</h2>
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
            {initialUser.image ? (
              <Image src={initialUser.image} alt={initialUser.name ?? ""} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-lg">{userName || "Usuário"}</div>
            <div className="text-sm text-muted-foreground">{initialUser.email}</div>
          </div>
          {activeTab !== "profile" ? (
            <button 
              onClick={() => setActiveTab("profile")}
              className="px-4 py-2 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Editar Perfil
            </button>
          ) : null}
        </div>
      </div>

      {/* Subscription */}
      <div className="glass p-6 rounded-2xl border border-white/10">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">Plano Atual</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold">Bio Flow {initialUser.subscriptionTier}</div>
              <div className="text-sm text-muted-foreground">
                {isFree ? "Limite de 2 bios ativado" : "Acesso ilimitado ativado ✨"}
              </div>
            </div>
          </div>
          <Link 
            href="/plano"
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              isFree ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary" : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            {isFree ? "Upgrade Pro ✨" : "Gerenciar Assinatura"}
          </Link>
        </div>
      </div>

      {/* Interactive Settings Tab Content */}
      <div className="glass p-6 rounded-2xl border border-white/10">
        {renderActiveContent()}
      </div>
    </div>
  );
}

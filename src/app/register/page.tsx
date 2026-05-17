"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Sparkles, UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerUser } from "@/app/actions/register";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("Conta criada com sucesso! Faça login para continuar.");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-16 relative z-10">
        <div className="max-w-sm w-full mx-auto space-y-8">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 mb-6 w-fit">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden glow-primary bg-background">
                <Image src="/logo.png" alt="Bio Flow" fill className="object-cover" />
              </div>
              <span className="font-bold text-xl">Bio Flow</span>
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight">Criar sua conta</h1>
            <p className="text-muted-foreground text-sm">Comece a gerar bios estratégicas em segundos.</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              Cadastrar com Google
            </button>
            <button 
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              Cadastrar com GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Ou com email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="name">Nome</label>
              <input 
                id="name" 
                name="name"
                type="text" 
                required
                placeholder="Seu nome" 
                className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
              <input 
                id="email" 
                name="email"
                type="email" 
                required
                placeholder="nome@exemplo.com" 
                className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="password">Senha</label>
              <input 
                id="password" 
                name="password"
                type="password" 
                required
                className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full h-11 inline-flex items-center justify-center rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors glow-primary disabled:opacity-50"
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">Fazer login</Link>
          </p>
        </div>
      </div>

      {/* Right side - Visuals */}
      <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden items-center justify-center border-l border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-black z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 glass p-8 rounded-2xl max-w-md border border-white/10 shadow-2xl space-y-6">
          <div className="flex gap-2 text-primary">
            <UserPlus className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold">Junte-se à revolução da IA</h2>
          <p className="text-muted-foreground leading-relaxed">
            Mais de 10.000 perfis já foram transformados. Comece seu período gratuito hoje mesmo.
          </p>
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-3 text-sm text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Geração ilimitada no Pro</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Preview instantâneo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

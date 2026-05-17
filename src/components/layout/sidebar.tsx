import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  PenTool, 
  History, 
  Star, 
  BarChart, 
  CreditCard, 
  LifeBuoy, 
  Settings,
  LogOut
} from "lucide-react";
import { signOut } from "@/lib/auth";
import type { User } from "next-auth";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Gerar Bio", href: "/gerar", icon: PenTool },
  { name: "Histórico", href: "/historico", icon: History },
  { name: "Favoritos", href: "/favoritos", icon: Star },
  { name: "Analytics", href: "/analytics", icon: BarChart },
];

const secondaryNav = [
  { name: "Meu Plano", href: "/plano", icon: CreditCard },
  { name: "Suporte", href: "/suporte", icon: LifeBuoy },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
];

export function Sidebar({ user }: { user?: User | null }) {
  return (
    <aside className="w-64 flex flex-col border-r border-white/5 bg-background/50 backdrop-blur-xl h-full p-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 glow-primary bg-background">
          <Image src="/logo.png" alt="Bio Flow Logo" fill className="object-cover" />
        </div>
        <span className="font-bold text-xl tracking-tight">Bio Flow</span>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 space-y-1">
        <div className="text-xs font-medium text-muted-foreground mb-4 px-2 uppercase tracking-wider">Menu</div>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Secondary Nav */}
      <nav className="mt-4 space-y-1">
        <div className="text-xs font-medium text-muted-foreground mb-4 px-2 uppercase tracking-wider">Conta</div>
        {secondaryNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Footer */}
      {user && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-primary/20">
              {user.image ? (
                <Image src={user.image} alt={user.name ?? ""} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-primary">
                  {user.name?.[0] ?? "U"}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name ?? "Usuário"}</div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
            <form action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}>
              <button type="submit" className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors" title="Sair">
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}

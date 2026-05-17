"use client";

import { Copy, Heart, Trash2, Star, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { toggleFavoriteBio, deleteBio } from "@/app/actions/bio";
import { useRouter } from "next/navigation";

interface Bio {
  id: string;
  content: string;
  isFavorite: boolean;
  createdAt: Date;
}

export function HistoryList({ initialBios }: { initialBios: Bio[] }) {
  const [bios, setBios] = useState(initialBios);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const router = useRouter();

  const handleCopy = (bio: Bio) => {
    navigator.clipboard.writeText(bio.content);
    setCopiedId(bio.id);
    toast.success("Bio copiada com sucesso!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFavorite = async (bio: Bio) => {
    const newStatus = !bio.isFavorite;
    
    // Optimistic update
    setBios(bios.map(b => b.id === bio.id ? { ...b, isFavorite: newStatus } : b));
    
    const result = await toggleFavoriteBio(bio.id, bio.isFavorite);
    
    if (result.success) {
      toast.success(newStatus ? "Adicionado aos favoritos" : "Removido dos favoritos");
      router.refresh();
    } else {
      // Revert if failed
      setBios(bios.map(b => b.id === bio.id ? { ...b, isFavorite: bio.isFavorite } : b));
      toast.error("Erro ao favoritar");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta bio?")) return;

    // Optimistic update
    setBios(bios.filter(b => b.id !== id));
    
    const result = await deleteBio(id);
    
    if (result.success) {
      toast.success("Bio excluída");
      router.refresh();
    } else {
      toast.error("Erro ao excluir");
      // Revert if possible (refetch)
      router.refresh();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bios.map((bio) => (
        <div key={bio.id} className="glass p-6 rounded-2xl border border-white/10 flex flex-col gap-4 relative group hover:border-primary/50 transition-all">
          {bio.isFavorite && (
            <div className="absolute top-4 right-4">
              <Heart className="w-5 h-5 fill-red-400 text-red-400" />
            </div>
          )}
          
          <div className="flex items-center gap-2 mb-2 opacity-60 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {new Date(bio.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>

          <div className="flex-1 text-sm whitespace-pre-line leading-relaxed font-medium">
            {bio.content}
          </div>

          {/* Botões de Ação na Listagem */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => handleCopy(bio)}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 rounded-lg text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              {copiedId === bio.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              {copiedId === bio.id ? "Copiado" : "Copiar"}
            </button>
            <button 
              onClick={() => handleFavorite(bio)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-colors ${
                bio.isFavorite ? "bg-red-400/10 text-red-400" : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <Star className={`w-3 h-3 ${bio.isFavorite ? "fill-current" : ""}`} />
              {bio.isFavorite ? "Favorito" : "Favoritar"}
            </button>
            <button 
              onClick={() => handleDelete(bio.id)}
              className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold hover:bg-red-500/20 transition-colors"
              title="Excluir"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { canGenerateBio } from '@/lib/plans';

// Permite execução de longa duração (até 30 segundos na Vercel Free, 60s+ no Pro)
export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: 'Não autorizado. Faça login para continuar.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Verificar limite do plano
  const [user, biosUsed] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { subscriptionTier: true },
    }),
    prisma.bio.count({
      where: { userId: session.user.id },
    }),
  ]);

  const tier = user?.subscriptionTier ?? 'FREE';

  if (!canGenerateBio(tier, biosUsed)) {
    return new Response(
      JSON.stringify({
        error: 'LIMIT_REACHED',
        message: `Você atingiu o limite de 2 bios do plano gratuito. Faça upgrade para gerar bios ilimitadas!`,
      }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { profession, niche, objective, tone, differential, cta } = await req.json();

  const prompt = `Você é um copywriter especialista em branding pessoal e Instagram. 
Crie uma bio para o Instagram estratégica e altamente conversiva com base nas seguintes informações do usuário:
- Profissão: ${profession || 'Não informado'}
- Nicho: ${niche || 'Geral'}
- Objetivo Principal: ${objective || 'Atrair seguidores e mostrar autoridade'}
- Tom de Voz: ${tone || 'Profissional e Engajador'}
- Diferencial/Prova Social: ${differential || 'Nenhum informado'}
- Call to Action (CTA): ${cta || 'Clique no link abaixo'}

Regras:
1. A bio deve ter no máximo 150 caracteres (limite do Instagram).
2. Não use hashtags soltas. Use no máximo 2 ou 3 emojis bem posicionados no início ou fim das linhas.
3. Formatação: Use 3 a 4 linhas curtas separadas por quebra de linha. 
   - Linha 1: Título/Autoridade
   - Linha 2: O que faz/Transformação + Diferencial
   - Linha 3: Call to Action apontando para baixo (ex: 👇)
4. Retorne APENAS o texto da bio, sem explicações, aspas ou introduções.
`;

  try {
    const result = await streamText({
      model: openai('gpt-4o-mini'), // Use 'gpt-4o' if premium
      system: 'Você é um redator especialista em mídias sociais focado em Instagram.',
      prompt: prompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Erro ao gerar bio com a IA.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

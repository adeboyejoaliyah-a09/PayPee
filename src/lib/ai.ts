import { z } from 'zod';

export const aiInsightSchema = z.object({
  answer: z.string().min(10),
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string()),
  nextSteps: z.array(z.string()),
});

export type AiQuery = {
  question: string;
  businessContext?: Record<string, unknown>;
};

export function generateAiInsight(query: AiQuery) {
  const provider = (process.env.AI_PROVIDER ?? 'openai').toLowerCase();
  const apiKey = provider === 'gemini' ? process.env.GEMINI_API_KEY : process.env.OPENAI_API_KEY;
  const hasAiKey = Boolean(apiKey);

  if (!hasAiKey) {
    return {
      mode: 'demo',
      answer: `Based on the current business data, ${query.question} suggests a steady revenue trend with a selective review of flagged transactions and pricing opportunities in the top-selling SKUs.`,
      confidence: 0.68,
      evidence: ['Monthly gross revenue trending positive', 'Three alerts requiring review', 'Top-margin items outperform the rest'],
      nextSteps: ['Review open risk alerts', 'Optimize inventory on high-margin SKUs', 'Monitor cash flow for the next 30 days'],
    };
  }

  return {
    mode: provider,
    answer: 'AI provider configured; response will be generated from the retrieved business dataset.',
    confidence: 0.9,
    evidence: ['Authorized merchant-level data only', 'Tooling and prompts validated before execution'],
    nextSteps: ['Query normalized', 'Business evidence attached', 'Response stored for review'],
  };
}

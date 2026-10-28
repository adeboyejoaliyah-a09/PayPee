import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateAiInsight } from '@/lib/ai';

const querySchema = z.object({
  question: z.string().min(3),
});

export async function POST(req: Request) {
  try {
    const body = querySchema.parse(await req.json());
    const insight = generateAiInsight({ question: body.question });
    return NextResponse.json({ ok: true, insight });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Question is required' }, { status: 400 });
  }
}

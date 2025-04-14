import { NextResponse } from 'next/server';
import { getNIAResponse } from '@/lib/agents/openai';

export async function POST(req: Request) {
  try {
    const { message, role } = await req.json();
    
    if (!message || !role) {
      return NextResponse.json(
        { error: 'Message and role are required' },
        { status: 400 }
      );
    }

    const response = await getNIAResponse(role, message);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
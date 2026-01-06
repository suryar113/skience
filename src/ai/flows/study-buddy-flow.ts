'use server';

import { ai } from '@/ai/genkit';
import {
  type StudyBuddyInput,
  type StudyBuddyOutput,
  StudyBuddyInputSchema,
  StudyBuddyOutputSchema,
} from './types';

const prompt = ai.definePrompt(
  {
    name: 'studyBuddyPrompt',
    input: { schema: StudyBuddyInputSchema },
    output: { schema: StudyBuddyOutputSchema },
    prompt: `You are an expert biology tutor called 'Study Buddy'. Your goal is to help a student understand biology concepts.

The student is currently studying the topic: '{{topic}}'.

You should be friendly, encouraging, and clear in your explanations.
If the user asks a question not related to biology, gently guide them back to the topic.
Keep your answers concise and easy to understand. Use markdown for formatting, like bolding key terms or using lists.

Student's question:
"{{message}}"`,
  }
);

const studyBuddyFlow = ai.defineFlow(
  {
    name: 'studyBuddyFlow',
    inputSchema: StudyBuddyInputSchema,
    outputSchema: StudyBuddyOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function askStudyBuddy(input: StudyBuddyInput): Promise<StudyBuddyOutput> {
  return await studyBuddyFlow(input);
}
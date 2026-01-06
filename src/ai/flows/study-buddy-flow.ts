
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const StudyBuddyInputSchema = z.object({
  topic: z.string().describe('The current biology topic being discussed.'),
  message: z.string().describe('The user\'s message or question.'),
});
export type StudyBuddyInput = z.infer<typeof StudyBuddyInputSchema>;

const StudyBuddyOutputSchema = z.string();
export type StudyBuddyOutput = z.infer<typeof StudyBuddyOutputSchema>;

export async function askStudyBuddy(input: StudyBuddyInput): Promise<StudyBuddyOutput> {
  return studyBuddyFlow(input);
}

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

'use server';
/**
 * @fileOverview A flow for generating flashcards based on a topic.
 *
 * - generateFlashcards - A function that handles flashcard generation.
 * - GenerateFlashcardsInput - The input type for the generateFlashcards function.
 * - GenerateFlashcardsOutput - The return type for the generateFlashcards function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateFlashcardsInputSchema = z.object({
  topic: z.string().describe('The topic to generate flashcards for.'),
});
export type GenerateFlashcardsInput = z.infer<typeof GenerateFlashcardsInputSchema>;

const FlashcardSchema = z.object({
    question: z.string().describe('The question for the flashcard.'),
    answer: z.string().describe('The answer to the flashcard question.'),
});

const GenerateFlashcardsOutputSchema = z.object({
  flashcards: z.array(FlashcardSchema).describe('An array of generated flashcards.'),
});
export type GenerateFlashcardsOutput = z.infer<typeof GenerateFlashcardsOutputSchema>;


export async function generateFlashcards(input: GenerateFlashcardsInput): Promise<GenerateFlashcardsOutput> {
  return flashcardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flashcardPrompt',
  input: { schema: GenerateFlashcardsInputSchema },
  output: { schema: GenerateFlashcardsOutputSchema },
  prompt: `You are a helpful study assistant. Your task is to generate a set of 5 flashcards for the given biology topic. Each flashcard should have a clear question and a concise answer.

Topic: {{{topic}}}`,
});

const flashcardFlow = ai.defineFlow(
  {
    name: 'flashcardFlow',
    inputSchema: GenerateFlashcardsInputSchema,
    outputSchema: GenerateFlashcardsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

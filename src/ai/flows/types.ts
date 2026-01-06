import { z } from 'zod';

export const StudyBuddyInputSchema = z.object({
  topic: z.string().describe('The current biology topic being discussed.'),
  message: z.string().describe("The user's message or question."),
});
export type StudyBuddyInput = z.infer<typeof StudyBuddyInputSchema>;

export const StudyBuddyOutputSchema = z.string().describe("The AI tutor's response.");
export type StudyBuddyOutput = z.infer<typeof StudyBuddyOutputSchema>;


import { z } from 'zod';

const StudyBuddyInputSchema = z.object({
  topic: z.string().describe('The current biology topic being discussed.'),
  message: z.string().describe("The user's message or question."),
});
export type StudyBuddyInput = z.infer<typeof StudyBuddyInputSchema>;

const StudyBuddyOutputSchema = z.string();
export type StudyBuddyOutput = z.infer<typeof StudyBuddyOutputSchema>;

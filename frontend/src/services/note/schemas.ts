import { z } from "zod";

export const NoteWithoutMetaSchema = z.object({
  title: z.string().max(25, "Wrong title format: Title must be shorter than or equal to 25 characters!"),
  description: z.string().max(75, "Wrong description format: Description must be shorter than or equal to 75 characters!"),
  content: z.string().max(10000, "Wrong content format: Content must be shorter than or equal to 10,000 characters!"),
  color: z.string().regex(/^#(?:[0-9a-fA-F]{3,4}){1,2}$/, "Wrong color format: Color must be a hex!"),
  coordinates: z.tuple([z.number(), z.number()]),
});

export const PartialNoteWithoutMetaSchema = NoteWithoutMetaSchema.partial();

export type NoteWithoutMetaType = z.infer<typeof NoteWithoutMetaSchema>;
export type PartialNoteWithoutMetaType = z.infer<typeof PartialNoteWithoutMetaSchema>;

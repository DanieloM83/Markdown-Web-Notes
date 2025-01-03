import { z } from "zod";

export const NoteTitleSchema = z.string().max(25, "Wrong title format: Title must be shorter than or equal to 25 characters!");
export const NoteDescriptionSchema = z.string().max(75, "Wrong description format: Description must be shorter than or equal to 75 characters!");

export const NoteIdSchema = z.object({
  _id: z.string().length(12, "Wrong ObjectID!"),
});
export const NoteWithoutMetaSchema = z.object({
  title: NoteTitleSchema,
  description: NoteDescriptionSchema,
  content: z.string().max(10000, "Wrong content format: Content must be shorter than or equal to 10,000 characters!"),
  color: z.string().regex(/^#(?:[0-9a-fA-F]{3,4}){1,2}$/, "Wrong color format: Color must be a hex!"),
  coordinates: z.tuple([z.number(), z.number()]),
});

export const PartialNoteWithoutMetaSchema = NoteWithoutMetaSchema.partial();
export const PartialNoteWithIdSchema = PartialNoteWithoutMetaSchema.merge(NoteIdSchema);

export type NoteWithoutMetaType = z.infer<typeof NoteWithoutMetaSchema>;
export type PartialNoteWithoutMetaType = z.infer<typeof PartialNoteWithoutMetaSchema>;
export type PartialNoteWithIdType = z.infer<typeof PartialNoteWithIdSchema>;

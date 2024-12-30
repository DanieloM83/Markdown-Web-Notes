import { deleteQuery, getQuery, patchQuery, postQuery } from "../config.ts";
import { NoteWithoutMetaType, Note, PartialNoteWithIdType } from ".";

export const createNote = async (data: NoteWithoutMetaType) => {
  const response = await postQuery<Note, NoteWithoutMetaType>("/notes", data);
  return response;
};

export const getNotes = async () => {
  const response = await getQuery<Note[]>("/notes");
  return response;
};

export const deleteNote = async (id: string) => {
  const response = await deleteQuery<string>(`/notes/${id}`);
  return response;
};

export const updateNotesBulk = async (data: PartialNoteWithIdType[]) => {
  const response = await patchQuery<string, PartialNoteWithIdType[]>(`/notes`, data);
  return response;
};

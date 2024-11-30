import { deleteQuery, getQuery, patchQuery, postQuery } from "../config.ts";
import { NoteWithoutMetaType, Note, PartialNoteWithoutMetaType } from ".";

export const createNote = async (data: NoteWithoutMetaType) => {
  const response = await postQuery<Note, NoteWithoutMetaType>("/notes", data);
  console.log(response);
  return response;
};

export const getNotes = async () => {
  const response = await getQuery<Note[]>("/notes");
  console.log(response);
  return response;
};

export const deleteNote = async (id: string) => {
  const response = await deleteQuery<string>(`/notes/${id}`);
  console.log(response);
  return response;
};

export const updateNote = async (id: string, data: PartialNoteWithoutMetaType) => {
  const response = await patchQuery<string, PartialNoteWithoutMetaType>(`/notes/${id}`, data);
  console.log(response);
  return response;
};

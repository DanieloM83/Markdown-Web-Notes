import { NoteWithoutMetaType } from ".";

export interface NoteMetaType {
  _id: string;
  author_id: string;
}

export interface Note extends NoteWithoutMetaType, NoteMetaType {}

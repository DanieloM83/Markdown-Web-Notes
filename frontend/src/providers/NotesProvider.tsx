import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getNotes, Note, PartialNoteWithoutMetaType, updateNote } from "../services/note";

interface NotesContextType {
  notesList: Note[];
  setNotesList: (notesList: Note[]) => void;
  selectedItems: Set<string>;
  setSelectedItems: (selectedItems: Set<string>) => void;
}

interface modifiedNotesType {
  [id: string]: PartialNoteWithoutMetaType;
}

export const NotesContext = createContext<NotesContextType>({ notesList: [], setNotesList: () => {}, selectedItems: new Set<string>(), setSelectedItems: () => {} });

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [oldNotesList, setOldNotesList] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotes = async () => {
      let response = await getNotes();
      if (response.success) {
        setNotesList(response.data);
        setOldNotesList(response.data);
      } else console.log(`Failed to fetch notes: ${response.message}`);

      setIsLoading(false);
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      sendModifiedNotesToServer();
    }, 10000);

    return () => clearInterval(interval);
  }, [notesList, oldNotesList]);

  const parseNotesChanges = (): modifiedNotesType => {
    let changedNotes: modifiedNotesType = {};
    notesList.forEach((note) => {
      const oldNote = oldNotesList.find((oldNote) => oldNote._id === note._id) || note;
      if (oldNote == undefined) setOldNotesList((prev) => [...prev, note]);
      for (const key in note) {
        if (oldNote[key as keyof Note] !== note[key as keyof Note]) {
          changedNotes[note._id] = changedNotes[note._id] || {};
          changedNotes[note._id][key] = note[key as keyof Note];
        }
      }
    });
    return changedNotes;
  };

  const sendModifiedNotesToServer = async () => {
    let changedNotes: modifiedNotesType = parseNotesChanges();
    if (Object.keys(changedNotes).length === 0) return;

    for (const [id, data] of Object.entries(changedNotes)) {
      const response = await updateNote(id, data);

      if (response.success) {
        setOldNotesList((prev) => prev.map((oldNote) => (oldNote._id === id ? notesList.find((note) => note._id === id) || oldNote : oldNote)));
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <NotesContext.Provider value={{ notesList, setNotesList, selectedItems, setSelectedItems }}>{children}</NotesContext.Provider>;
};

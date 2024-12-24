import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { getNotes, Note, PartialNoteWithoutMetaType, updateNote } from "../services/note";
import { AuthContext } from "./AuthProvider";
import { Loading } from "../components/ui";

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
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      let response = await getNotes();
      if (response.success && response.data) {
        setNotesList(response.data);
        setOldNotesList(response.data);
      } else console.log(`Failed to fetch notes: ${response.message}`);

      setIsLoading(false);
    };

    fetchNotes();
  }, [user]);

  useEffect(() => {
    if (notesList.length !== oldNotesList.length) {
      const newNotes = notesList.filter((note) => !oldNotesList.includes(note));
      const listToUpdate = [...oldNotesList];
      listToUpdate.push(...newNotes);
      setOldNotesList(listToUpdate.filter((note) => notesList.includes(note)));
    }

    const interval = setInterval(() => {
      sendModifiedNotesToServer();
    }, 10000);

    return () => clearInterval(interval);
  }, [notesList, oldNotesList]);

  const parseNotesChanges = (): modifiedNotesType => {
    let changedNotes: modifiedNotesType = {};

    for (const note of notesList) {
      const oldNote = oldNotesList.find((oldNote) => oldNote._id === note._id) as Note;
      for (const key in note) {
        if (oldNote[key as keyof Note] !== note[key as keyof Note]) {
          changedNotes[note._id] = changedNotes[note._id] || {};
          changedNotes[note._id][key as keyof PartialNoteWithoutMetaType] = note[key as keyof Note] as any;
        }
      }
    }

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
    return <Loading loadingText="Fetching notes data..." />;
  }

  return <NotesContext.Provider value={{ notesList, setNotesList, selectedItems, setSelectedItems }}>{children}</NotesContext.Provider>;
};

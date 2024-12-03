import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getNotes, Note } from "../services/note";

interface NotesContextType {
  notesList: Note[];
  setNotesList: (notesList: Note[]) => void;
}

export const NotesContext = createContext<NotesContextType>({ notesList: [], setNotesList: () => {} });

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotes = async () => {
      let response = await getNotes();
      if (response.success) setNotesList(response.data);
      else console.log(`Failed to fetch notes: ${response.message}`);

      setIsLoading(false);
    };

    fetchNotes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <NotesContext.Provider value={{ notesList, setNotesList }}>{children}</NotesContext.Provider>;
};

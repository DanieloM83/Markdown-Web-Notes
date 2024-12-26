import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { getNotes, Note, PartialNoteWithIdType, updateNotesBulk } from "../services/note";
import { AuthContext } from "./AuthProvider";
import { Loading } from "../components/ui";

interface NotesContextType {
  notesList: Note[];
  setNotesList: (notesList: Note[]) => void;
  selectedItems: Set<string>;
  setSelectedItems: (selectedItems: Set<string>) => void;
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
      } else console.error(`Failed to fetch notes: ${response.message}`);

      setIsLoading(false);
    };

    if (user) fetchNotes();
    else setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (notesList.length !== oldNotesList.length) {
      const newNotes = notesList.filter((note) => !oldNotesList.includes(note));
      const listToUpdate = [...oldNotesList];
      listToUpdate.push(...newNotes);
      setOldNotesList(listToUpdate.filter((note) => notesList.includes(note)));
    }

    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      event.preventDefault();
      await sendModifiedNotesToServer();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const interval = setInterval(() => {
      sendModifiedNotesToServer();
    }, 10000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [notesList, oldNotesList]);

  const parseNotesChanges = (): PartialNoteWithIdType[] => {
    let changedNotes: PartialNoteWithIdType[] = new Array();

    for (const note of notesList) {
      const oldNote = oldNotesList.find((oldNote) => oldNote._id === note._id) as Note;
      let partialNote: PartialNoteWithIdType = { _id: note._id };
      for (const key in note) {
        if (oldNote[key as keyof Note] !== note[key as keyof Note]) {
          partialNote[key as keyof PartialNoteWithIdType] = note[key as keyof Note] as any;
        }
      }
      if (Object.keys(partialNote).length > 1) changedNotes.push(partialNote);
    }

    return changedNotes;
  };

  const sendModifiedNotesToServer = async () => {
    let changedNotes = parseNotesChanges();
    if (changedNotes.length === 0) return;

    let response,
      counter = 0;
    const requestsLimit = 3;
    do {
      counter++;
      response = await updateNotesBulk(changedNotes);
      if (!response.success) {
        console.error(`Failed to update notes: ${response.message}`);
      }
      if (!response.success && counter < requestsLimit) {
        console.info("Retring to update notes...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } while (!response?.success && counter < requestsLimit);
    if (response?.success) setOldNotesList(notesList);
  };

  if (isLoading) {
    return <Loading loadingText="Fetching notes data..." />;
  }

  return <NotesContext.Provider value={{ notesList, setNotesList, selectedItems, setSelectedItems }}>{children}</NotesContext.Provider>;
};

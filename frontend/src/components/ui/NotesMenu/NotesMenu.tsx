import { Dispatch, FC, SetStateAction, useState } from "react";
import { NotesMenuElement, Note, styles } from ".";
import { Button } from "../";
import { createNote, deleteNote, NoteWithoutMetaType } from "../../../services/note";

const NEW_NOTE_TEMPLATE: NoteWithoutMetaType = {
  title: "New note",
  description: "",
  content: "",
  color: "#ffffff",
  coordinates: [0.0, 0.0],
};

interface NotesMenuProps {
  isMenuHided: boolean;
  setIsMenuHided: Dispatch<SetStateAction<boolean>>;
  notesList: Note[];
  setNotesList: Dispatch<SetStateAction<Note[]>>;
}

const NotesMenu: FC<NotesMenuProps> = ({ isMenuHided, setIsMenuHided, notesList, setNotesList }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelectAll = () => {
    if (selectedItems.size === notesList.length) {
      setSelectedItems(new Set());
    } else {
      const newSelectedItems = new Set(notesList.map((note) => note._id));
      setSelectedItems(newSelectedItems);
    }
  };
  const handleSelectItem = (id: string) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(id)) {
      newSelectedItems.delete(id);
    } else {
      newSelectedItems.add(id);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleAddButton = async () => {
    const response = await createNote(NEW_NOTE_TEMPLATE);
    if (!response.success) return;
    const newNote: Note = response.data;
    setNotesList([...notesList, newNote]);
    setSelectedItems(new Set([newNote._id]));
  };

  const handleDelButton = async () => {
    let newNotesList: Note[] = [];
    notesList.forEach(async (note) => {
      if (selectedItems.has(note._id)) {
        await deleteNote(note._id);
      } else {
        newNotesList.push(note);
      }
    });

    setNotesList(newNotesList);
    setSelectedItems(new Set());
  };

  return (
    <div className={`${styles.notes_menu} ${isMenuHided ? styles.hided : ""}`}>
      <div className={styles.notes_menu_header}>
        <div className={styles.control_buttons}>
          <input type="checkbox" className={styles.checkbox} checked={selectedItems.size == notesList.length} onChange={handleSelectAll} />
          <Button text="-" callback={handleDelButton} className={`${styles.button} ${styles.del}`} />
          <Button text="+" callback={handleAddButton} className={`${styles.button} ${styles.add}`} />
        </div>
        <Button text="<" callback={() => setIsMenuHided(!isMenuHided)} className={`${styles.button} ${styles.burger_button} ${isMenuHided ? styles.right : styles.left}`} />
      </div>

      <div className={styles.notes_menu_body}>
        {notesList.map((note) => (
          <NotesMenuElement key={note._id} data={note} selected={selectedItems.has(note._id)} handleSelect={() => handleSelectItem(note._id)} />
        ))}
      </div>
    </div>
  );
};

export default NotesMenu;

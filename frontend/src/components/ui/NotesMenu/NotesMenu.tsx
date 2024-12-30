import { Dispatch, FC, SetStateAction, useContext } from "react";
import { NotesMenuElement, Note, styles } from ".";
import { Button } from "../";
import { createNote, deleteNote, NoteWithoutMetaType } from "../../../services/note";
import { NotesContext } from "../../../providers";

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
}

const NotesMenu: FC<NotesMenuProps> = ({ isMenuHided, setIsMenuHided }) => {
  const { notesList, setNotesList, selectedItems, setSelectedItems } = useContext(NotesContext);

  const handleSelectAll = () => {
    selectedItems.size == notesList.length ? setSelectedItems(new Set()) : setSelectedItems(new Set(notesList.map((note) => note._id)));
  };
  const handleSelectItem = (id: string) => {
    const newSelectedItems = new Set(selectedItems);
    selectedItems.has(id) ? newSelectedItems.delete(id) : newSelectedItems.add(id);
    setSelectedItems(newSelectedItems);
  };

  const handleAddButton = async () => {
    const response = await createNote(NEW_NOTE_TEMPLATE);
    if (!response.success) return;
    const newNote = response.data as Note;
    setNotesList([...notesList, newNote]);
    setSelectedItems(new Set([newNote._id]));
  };
  const handleDelButton = async () => {
    const newNotes: Note[] = notesList.filter((note) => !selectedItems.has(note._id));
    selectedItems.forEach(async (id) => await deleteNote(id));
    setNotesList(newNotes);
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

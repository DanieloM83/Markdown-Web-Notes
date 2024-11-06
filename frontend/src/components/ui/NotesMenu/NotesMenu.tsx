import { Dispatch, FC, SetStateAction, useState } from "react";
import { NotesMenuElement, Note, styles } from ".";
import { Button } from "../";

interface NotesMenuProps {
  notes: Note[];
  isMenuHided: boolean;
  setIsMenuHided: Dispatch<SetStateAction<boolean>>;
}

const NotesMenu: FC<NotesMenuProps> = ({ notes, isMenuHided, setIsMenuHided }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelectAll = () => {
    if (selectedItems.size === notes.length) {
      setSelectedItems(new Set());
    } else {
      const newSelectedItems = new Set(notes.map((note) => note.id));
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

  return (
    <div className={`${styles.notes_menu} ${isMenuHided ? styles.hided : ""}`}>
      <div className={styles.notes_menu_header}>
        <div className={styles.control_buttons}>
          <input type="checkbox" className={styles.checkbox} checked={selectedItems.size == notes.length} onChange={handleSelectAll} />
          <Button text="-" callback={() => {}} className={`${styles.button} ${styles.del}`} />
          <Button text="+" callback={() => {}} className={`${styles.button} ${styles.add}`} />
        </div>
        <Button text="<" callback={() => setIsMenuHided(!isMenuHided)} className={`${styles.button} ${styles.burger_button} ${isMenuHided ? styles.right : styles.left}`} />
      </div>

      <div className={styles.notes_menu_body}>
        {notes.map((note) => (
          <NotesMenuElement key={note.id} data={note} selected={selectedItems.has(note.id)} handleSelect={handleSelectItem} />
        ))}
      </div>
    </div>
  );
};

export default NotesMenu;

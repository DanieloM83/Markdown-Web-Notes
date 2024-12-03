import { FC, HTMLAttributes, useContext } from "react";
import { Note, styles } from ".";
import { NotesContext } from "../../../providers";

interface NotesMenuElementProps extends HTMLAttributes<HTMLDivElement> {
  data: Note;
  selected: boolean;
  handleSelect(id: string): void;
}

const NotesMenuElement: FC<NotesMenuElementProps> = ({ data, selected, handleSelect, ...props }) => {
  const { notesList, setNotesList } = useContext(NotesContext);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    const newNotes = notesList.map((note) => (note._id === data._id ? { ...note, color: newColor } : note));
    setNotesList(newNotes);
  };

  return (
    <div {...props} className={`${styles.menu_element} ${selected ? styles.selected : ""}`}>
      <input type="checkbox" checked={selected} onChange={() => handleSelect(data._id)} className={styles.checkbox} />
      <p className={styles.title}>{data.title}</p>
      <input type="color" value={data.color} className={styles.color_selector} onChange={handleColorChange} />
    </div>
  );
};

export default NotesMenuElement;

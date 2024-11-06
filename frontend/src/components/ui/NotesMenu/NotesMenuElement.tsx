import { FC, HTMLAttributes } from "react";
import { Note, styles } from ".";

interface NotesMenuElementProps extends HTMLAttributes<HTMLDivElement> {
  data: Note;
  selected: boolean;
  handleSelect(id: string): void;
}

const NotesMenuElement: FC<NotesMenuElementProps> = ({ data, selected, handleSelect, ...props }) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    data.color = event.target.value;
  };

  return (
    <div {...props} className={`${styles.menu_element} ${selected ? styles.selected : ""}`}>
      <input type="checkbox" checked={selected} onChange={() => handleSelect(data.id)} className={styles.checkbox} />
      <p className={styles.title}>{data.title}</p>
      <input type="color" value={data.color} className={styles.color_selector} onChange={handleColorChange} />
    </div>
  );
};

export default NotesMenuElement;

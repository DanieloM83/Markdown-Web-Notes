import { FC, HTMLAttributes } from "react";
import { Note, styles } from ".";

interface NotesMenuElementProps extends HTMLAttributes<HTMLDivElement> {
  data: Note;
  selected: boolean;
  handleSelect(id: string): void;
}

const NotesMenuElement: FC<NotesMenuElementProps> = ({ data, selected, handleSelect, ...props }) => {
  return (
    <div {...props}>
      <input type="checkbox" checked={selected} onChange={() => handleSelect(data.id)} />
      <p>{data.title}</p>
      <input type="color" value={data.color} />
    </div>
  );
};

export default NotesMenuElement;

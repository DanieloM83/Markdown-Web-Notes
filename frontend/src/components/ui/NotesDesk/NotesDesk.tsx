import { FC, useContext } from "react";
import { NotesDeskElement, styles } from ".";
import { NotesContext } from "../../../providers";

interface NotesDeskProps {}

const NotesDesk: FC<NotesDeskProps> = () => {
  const { notesList } = useContext(NotesContext);

  return (
    <div className={styles.desk}>
      {notesList.map((note) => (
        <NotesDeskElement data={note} key={note._id} />
      ))}
    </div>
  );
};

export default NotesDesk;

import { FC } from "react";
import { Note, NotesDeskElement, styles } from ".";

interface NotesDeskProps {
  notesList: Note[];
}

const NotesDesk: FC<NotesDeskProps> = ({ notesList }) => {
  return (
    <div className={styles.desk}>
      {notesList.map((note) => (
        <NotesDeskElement data={note} key={note._id} />
      ))}
    </div>
  );
};

export default NotesDesk;

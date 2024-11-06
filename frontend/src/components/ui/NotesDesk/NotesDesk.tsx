import { FC } from "react";
import { Note, NotesDeskElement, styles } from ".";

interface NotesDeskProps {
  notes: Note[];
}

const NotesDesk: FC<NotesDeskProps> = ({ notes }) => {
  return (
    <div className={styles.desk}>
      {notes.map((note) => (
        <NotesDeskElement data={note} key={note.id} />
      ))}
    </div>
  );
};

export default NotesDesk;

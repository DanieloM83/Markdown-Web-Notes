import { FC } from "react";
import styles from "./NotesDesk.module.css";

interface NotesDeskProps {}

const NotesDesk: FC<NotesDeskProps> = () => {
  return <div className={styles.desk}></div>;
};

export default NotesDesk;

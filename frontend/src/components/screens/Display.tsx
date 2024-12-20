import { FC, useContext } from "react";
import { useParams } from "react-router-dom";
import { NotesContext } from "../../providers";
import styles from "./Display.module.css";
import { MarkdownRenderer } from "../ui";

interface DisplayProps {}

const Display: FC<DisplayProps> = () => {
  const { notesList } = useContext(NotesContext);
  const { id: noteID } = useParams();

  return <MarkdownRenderer className={styles.md_container} content={notesList.find((note) => note._id == noteID)?.content} />;
};

export default Display;

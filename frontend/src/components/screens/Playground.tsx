import { FC, useContext, useEffect, useState } from "react";
import { Header, NotesMenu, NotesDesk } from "../ui";
import { AuthContext } from "../../providers";
import { useNavigate } from "react-router-dom";
import { getNotes, Note } from "../../services/note";
import styles from "./Playground.module.css";

interface PlaygroundProps {}

const Playground: FC<PlaygroundProps> = () => {
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [isMenuHided, setIsMenuHided] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user]);

  useEffect(() => {
    const fetchNotes = async () => {
      let response = await getNotes();
      if (response.success) setNotesList(response.data);
      else console.log(`Failed to fetch notes: ${response.message}`);
    };

    fetchNotes();
  }, []);

  return (
    <>
      <Header />
      <div className={`${styles.container} ${isMenuHided ? styles.expanded : ""}`}>
        <NotesMenu {...{ isMenuHided, setIsMenuHided, notesList, setNotesList }} />
        <NotesDesk {...{ notesList }} />
      </div>
      <div className={styles.background}></div>
    </>
  );
};

export default Playground;

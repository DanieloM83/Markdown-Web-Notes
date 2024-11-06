import { FC, useContext, useEffect, useState } from "react";
import { Header, NotesMenu, NotesDesk } from "../ui";
import { AuthContext } from "../../providers";
import { useNavigate } from "react-router-dom";
import { Note } from "../../services/note";
import styles from "./Playground.module.css";

const notes: Note[] = [
  { id: "a", title: "Hello World!", description: "Something", content: "##H2", color: "#ffffff", coordinates: [0.1, 0.2] },
  { id: "b", title: "Bye World!", description: "Hii.", content: "#H1!", color: "#ff0000", coordinates: [0.3, 0.4] },
];

interface PlaygroundProps {}

const Playground: FC<PlaygroundProps> = () => {
  const [isMenuHided, setIsMenuHided] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  // }, [user]);

  return (
    <>
      <Header />
      <div className={`${styles.container} ${isMenuHided ? styles.expanded : ""}`}>
        <NotesMenu {...{ notes, isMenuHided, setIsMenuHided }} />
        <NotesDesk {...{ notes }} />
      </div>
      <div className={styles.background}></div>
    </>
  );
};

export default Playground;

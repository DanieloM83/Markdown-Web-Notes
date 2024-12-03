import { FC, useContext, useEffect, useState } from "react";
import { Header, NotesMenu, NotesDesk } from "../ui";
import { AuthContext, NotesProvider } from "../../providers";
import { useNavigate } from "react-router-dom";
import styles from "./Playground.module.css";

interface PlaygroundProps {}

const Playground: FC<PlaygroundProps> = () => {
  const [isMenuHided, setIsMenuHided] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user]);

  return (
    <NotesProvider>
      <Header />
      <div className={`${styles.container} ${isMenuHided ? styles.expanded : ""}`}>
        <NotesMenu {...{ isMenuHided, setIsMenuHided }} />
        <NotesDesk />
      </div>
      <div className={styles.background}></div>
    </NotesProvider>
  );
};

export default Playground;

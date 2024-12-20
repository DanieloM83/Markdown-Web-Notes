import { FC, useContext, useEffect, useState } from "react";
import { Header, NotesMenu, NotesDesk } from "../ui";
import { AuthContext } from "../../providers";
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
    <>
      <Header />
      <div className={`${styles.container} ${isMenuHided ? styles.expanded : ""}`}>
        <NotesMenu {...{ isMenuHided, setIsMenuHided }} />
        <NotesDesk />
      </div>
      <div className={styles.background}></div>
    </>
  );
};

export default Playground;

import { FC } from "react";
import styles from "./Loading.module.css";

interface LoadingProps {
  loadingText?: string;
}

const Loading: FC<LoadingProps> = ({ loadingText }) => (
  <div className={styles.container}>
    <span className={styles.spinner}></span>
    <p className={styles.text}>{loadingText ?? ""}</p>
  </div>
);

export default Loading;

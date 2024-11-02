import { FC, HTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  callback?: React.MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ text = "", callback, disabled = false, ...props }) => {
  return (
    <div
      {...props}
      onClick={disabled ? undefined : callback}
      className={`${styles.button} ${props.className ? props.className : ""}`}
      role="button"
      aria-disabled={disabled}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      <p>{text}</p>
    </div>
  );
};

export default Button;

import { FC, HTMLAttributes, useState } from "react";
import styles from "./EditableText.module.css";
import { ZodType } from "zod";

interface EditableTextProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  callback: (newValue: string) => void;
  validator?: ZodType<string>;
}

interface EditableTextConstructorProps extends EditableTextProps {
  inputType?: "input" | "textarea";
}

const EditableTextConstructor: FC<EditableTextConstructorProps> = ({ value = "", callback, validator, inputType = "input", className = "", ...props }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(value);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const validateInput = (input: string): boolean => {
    if (!validator) return true;
    try {
      validator.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleBlur = () => {
    callback(text);
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateInput(event.target.value)) setText(event.target.value);
    else event.target.value = text;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  if (inputType == "input") {
    return isEditing ? (
      <input type="text" value={text} className={`${styles.input} ${className || ""}`} onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur} autoFocus {...props} />
    ) : (
      <span onDoubleClick={handleDoubleClick} className={`${styles.span} ${className || ""}`} {...props}>
        {text || "_"}
      </span>
    );
  }
  if (inputType == "textarea") {
    return isEditing ? (
      <textarea type="text" value={text} className={`${styles.textarea} ${className || ""}`} onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur} autoFocus {...props} />
    ) : (
      <span onDoubleClick={handleDoubleClick} className={`${styles.spanarea} ${className || ""}`} {...props}>
        {text || "_"}
      </span>
    );
  }
};

export const EditableTextInput: FC<EditableTextProps> = ({ ...props }) => {
  return <EditableTextConstructor {...props} inputType="input" />;
};

export const EditableTextArea: FC<EditableTextProps> = ({ ...props }) => {
  return <EditableTextConstructor {...props} inputType="textarea" />;
};

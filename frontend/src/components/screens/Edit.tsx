import { FC, useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import styles from "./Edit.module.css";
import { BackFooter, MarkdownRenderer } from "../ui";
import { NotesContext } from "../../providers";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  const [leftWidth, setLeftWidth] = useState((innerWidth / 3) * 2);
  const containerRef = useRef<HTMLDivElement>(null);
  const { notesList, setNotesList } = useContext(NotesContext);
  const { id: noteID } = useParams();
  const [content, setContent] = useState(notesList.find((note) => note._id == noteID)?.content ?? "");

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = leftWidth;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const delta = e.clientX - startX;
      const containerWidth = containerRef.current.offsetWidth;

      const newWidth = Math.max(25, Math.min(containerWidth - 100, startWidth + delta));
      setLeftWidth(newWidth);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleChange = (data: string | undefined) => {
    if (data === undefined) return;
    setContent(data);
    setNotesList(notesList.map((note) => (note._id === noteID ? { ...note, content: data } : note)));
  };

  return (
    <div className={styles.content} ref={containerRef}>
      <Editor value={content} className={styles.editor} width={`${leftWidth}px`} language="markdown" theme="vs-dark" onChange={handleChange} />
      <div className={styles.divider} onMouseDown={handleMouseDown}></div>
      <MarkdownRenderer content={content} className={styles.preview} />
      <BackFooter />
    </div>
  );
};

export default Edit;

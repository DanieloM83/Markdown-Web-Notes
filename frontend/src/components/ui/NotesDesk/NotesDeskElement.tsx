import { FC, useRef } from "react";
import { useDraggable } from "../../../hooks";
import { Note, styles } from ".";

interface NotesDeskElementProps {
  data: Note;
}

const NotesDeskElement: FC<NotesDeskElementProps> = ({ data }) => {
  const positionStyle = {
    left: `${data.coordinates[0] * 100}%`,
    top: `${data.coordinates[1] * 100}%`,
    backgroundColor: data.color,
    boxShadow: `0 0 5px 2px ${data.color}`,
  };

  const divRef = useRef<HTMLDivElement>(null);
  const { handleDragStart } = useDraggable(divRef, data.coordinates[0], data.coordinates[1]);

  const handleDragStartExt = (event: React.DragEvent<HTMLElement>) => {
    console.log(data._id);
    handleDragStart(event);
  };

  return (
    <div className={styles.note} ref={divRef} style={positionStyle} onDragStart={handleDragStartExt}>
      <div className={styles.title}>{data.title}</div>
      <div className={styles.content}>{data.content}</div>
      <div className={styles.buttons}></div>
    </div>
  );
};

export default NotesDeskElement;

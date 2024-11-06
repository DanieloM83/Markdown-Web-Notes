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
    backgroundColor: "#ff0000",
    boxShadow: "0 0 5px 2px #ff0000",
  };

  const divRef = useRef<HTMLDivElement>(null);
  const { handleDragStart } = useDraggable(divRef, data.coordinates[0], data.coordinates[1]);

  return (
    <div className={styles.note} ref={divRef} style={positionStyle} onDragStart={handleDragStart}>
      asdas
    </div>
  );
};

export default NotesDeskElement;

import { FC, useContext, useRef } from "react";
import { useDraggable } from "../../../hooks";
import { Note, styles } from ".";
import { NotesContext } from "../../../providers";
import { deleteImage, displayImage, editImage, saveImage } from "../../../assets/images";
import { deleteNote, NoteTitleSchema, NoteDescriptionSchema } from "../../../services/note";
import { EditableTextArea, EditableTextInput } from "../";
import { useNavigate } from "react-router-dom";

interface NotesDeskElementProps {
  data: Note;
}

const NotesDeskElement: FC<NotesDeskElementProps> = ({ data }) => {
  const noteSize = 100;
  const elementStyles = {
    width: `${noteSize}px`,
    height: `${noteSize}px`,
    left: `${data.coordinates[0] * 100}%`,
    top: `${data.coordinates[1] * 100}%`,
    backgroundColor: data.color,
    boxShadow: `0 0 3px 2px ${data.color}`,
    zIndex: "1",
  };

  const divRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { notesList, setNotesList, selectedItems, setSelectedItems } = useContext(NotesContext);
  const { handleDragStart, handleDragEnd } = useDraggable(divRef, data.coordinates[0], data.coordinates[1], noteSize, noteSize);

  const handleDragStartExt = (event: React.DragEvent<HTMLElement>) => {
    if (divRef.current) divRef.current.style.zIndex = "2";
    handleDragStart(event);
  };

  const handleDragEndExt = (event: React.DragEvent<HTMLElement>) => {
    if (divRef.current) divRef.current.style.zIndex = "1";
    const x = divRef.current?.style.left || "0.00%";
    const y = divRef.current?.style.top || "0.00%";
    const newCords: [number, number] = [parseFloat(x.replace("%", "")) / 100 || 0, parseFloat(y.replace("%", "")) / 100 || 0];
    const newNotes = notesList.filter((note) => note._id != data._id);
    const currNote = notesList.find((note) => note._id === data._id);
    newNotes.unshift(currNote ? { ...currNote, coordinates: newCords } : { ...data, coordinates: newCords });
    setNotesList(newNotes);
    handleDragEnd(event);
  };

  const handleDelButton = async () => {
    const response = await deleteNote(data._id);
    if (!response.success) {
      console.error(`Failed to delete note ${data._id}: ${response.message}`);
      return;
    }
    selectedItems.delete(data._id);
    setSelectedItems(selectedItems);
    setNotesList(notesList.filter((note) => note._id != data._id));
  };

  const unpdateNotesList = (data: Note) => setNotesList(notesList.map((note) => (note._id === data._id ? data : note)));

  const handleEditTitle = (newTitle: string) => {
    if (data.title == newTitle) return;
    unpdateNotesList({ ...data, title: newTitle });
  };
  const handleEditDescription = (newDesc: string) => {
    if (data.description == newDesc) return;
    unpdateNotesList({ ...data, description: newDesc });
  };
  const handleSaveNote = () => {
    const noteblob = new Blob([data.content], { type: "text/plain" });
    const filename = `Note-${data.title}.md`;

    const aTag = document.createElement("a");

    aTag.href = URL.createObjectURL(noteblob);
    aTag.download = filename;
    aTag.click();
  };

  return (
    <div className={styles.note} ref={divRef} style={elementStyles} onDragStart={handleDragStartExt} onDragEnd={handleDragEndExt}>
      <EditableTextInput className={styles.title} value={data.title} callback={handleEditTitle} validator={NoteTitleSchema} />
      <EditableTextArea className={styles.description} value={data.description} callback={handleEditDescription} validator={NoteDescriptionSchema} />
      <div className={styles.buttons}>
        <img src={deleteImage} onClick={handleDelButton} />
        <div>
          <img className={styles.images_with_margin} src={saveImage} onClick={() => handleSaveNote()} />
          <img className={styles.images_with_margin} src={displayImage} onClick={() => navigate(`/display/${data._id}`)} />
          <img src={editImage} onClick={() => navigate(`/edit/${data._id}`)} />
        </div>
      </div>
    </div>
  );
};

export default NotesDeskElement;

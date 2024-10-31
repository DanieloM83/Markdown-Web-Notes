import { FC, PropsWithChildren } from "react";
import { ModalProps } from "../../../hooks";

interface ModalLayoutProps extends PropsWithChildren<ModalProps> {}

const ModalLayout: FC<ModalLayoutProps> = ({ open, onClose, animation, children }) => {
  if (!open) return null;

  return (
    <div onClick={onClose} className={`modal-layout ${animation === "out" ? "animate-fade-out" : "animate-fade-in"}`}>
      <div onClick={(e) => e.stopPropagation()} className="modal-body">
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;

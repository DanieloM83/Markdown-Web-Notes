import { FC, PropsWithChildren } from "react";
import ModalLayout from "./ModalLayout";
import ModalHeader from "./ModalHeader";
import { createPortal } from "react-dom";
import { ModalProps } from "../../../hooks";

interface ModalComponentProps extends PropsWithChildren<ModalProps> {}

const ModalComponent: FC<ModalComponentProps> = ({ children, ...layoutProps }) => {
  return createPortal(<ModalLayout {...layoutProps}>{children}</ModalLayout>, document.querySelector("#root-modals")!);
};

const Modal = Object.assign(ModalComponent, {
  Header: ModalHeader,
});

export default Modal;

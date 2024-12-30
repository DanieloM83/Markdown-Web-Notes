import { FC, PropsWithChildren } from "react";

const ModalHeader: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="modal-header">
      {children}
    </div>
  );
};

export default ModalHeader;

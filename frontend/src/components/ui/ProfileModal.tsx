import { FC, useContext, useState } from "react";
import { AuthContext } from "../../providers";
import { ModalProps } from "../../hooks";
import Modal from "./Modal";
import Button from "./Button.tsx";

import { logout } from "../../services/auth";
import styles from "./ProfileModal.module.css";

interface ProfileModalProps extends ModalProps {}

const ProfileModal: FC<ProfileModalProps> = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState<undefined | string>(undefined);

  const logoutButtonHandler: React.MouseEventHandler<HTMLElement> = async () => {
    let response = await logout();
    if (response.success) {
      setUser(undefined);
      setError(undefined);
      props.onClose();
    } else setError(response.message);
  };

  return (
    <Modal {...props}>
      <Modal.Header>
        <p>Hello, {user && user.username}!</p>
      </Modal.Header>
      <div className={styles.profile_modal_content}>
        <Button text="Logout" callback={logoutButtonHandler} />
        {error && <p className="error">{error}</p>}
      </div>
    </Modal>
  );
};

export default ProfileModal;

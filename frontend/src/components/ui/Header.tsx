import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { profileImage } from "../../assets/images";
import ProfileModal from "./ProfileModal.tsx";
import { AuthContext } from "../../providers";
import { useModal } from "../../hooks";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const profileModalProps = useModal();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const logoHandler: React.MouseEventHandler<HTMLElement> = () => {
    navigate("/");
  };

  const profileBlockHandler: React.MouseEventHandler<HTMLElement> = () => {
	if (user) profileModalProps.onOpen();
    else navigate("/login");
  };

  return (
    <header className="header">
      <p className="logo" onClick={logoHandler}>
        WebNotes
      </p>
      <div className="profile-container" onClick={profileBlockHandler}>
        <img className="profile-image" src={profileImage} alt="profile-img" loading="lazy" />
        <p>{user?.username ?? "Profile"}</p>
      </div>

      <ProfileModal {...profileModalProps} />
    </header>
  );
};

export default Header;

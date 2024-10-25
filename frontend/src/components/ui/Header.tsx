import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { profileImage } from "../../assets/images";

import { AuthContext } from "../../providers";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const logoHandler: React.MouseEvent<HTMLElement> = () => {
    navigate("/");
  };

  const profileImageHandler: React.MouseEvent<HTMLElement> = () => {
    navigate("/login");
  };
  console.log(user);
  return (
    <header className="header">
      <p className="logo" onClick={logoHandler}>
        {user?.username}
      </p>
      <img className="profile-image" src={profileImage} alt="profile-img" loading="lazy" onClick={profileImageHandler} />
    </header>
  );
};

export default Header;

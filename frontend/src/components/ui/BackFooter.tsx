import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from ".";

interface BackFooterProps {}

const BackFooter: FC<BackFooterProps> = () => {
  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate("/playground");
  };

  return (
    <footer className="back-footer">
      <Button text="<< Back" className="footer-button" callback={buttonHandler} />
    </footer>
  );
};

export default BackFooter;

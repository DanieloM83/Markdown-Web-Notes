import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from ".";

interface BackFooterProps {}

const BackFooter: FC<BackFooterProps> = () => {
  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate("/playground");
  };

  return <Button text="<< Back" className="footer-button" callback={buttonHandler} />;
};

export default BackFooter;

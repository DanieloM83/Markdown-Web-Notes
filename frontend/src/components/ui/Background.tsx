import { FC } from "react";
import { leftLower, rightLower, rightUpper } from "../../assets/images";

interface BackgroundProps {}

const Background: FC<BackgroundProps> = () => {
  return (
    <div className="background">
      <img className="left-lower" src={leftLower} loading="lazy" />
      <img className="right-lower" src={rightLower} loading="lazy" />
      <img className="right-upper" src={rightUpper} loading="lazy" />
    </div>
  );
};

export default Background;

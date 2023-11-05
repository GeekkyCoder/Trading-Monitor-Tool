import { useState } from "react";

const useSpeedDial = () => {
  const [direction, setDirection] = useState("right");
  const [hidden, setHidden] = useState(false);

  const handleSpeedDialShow = () => {
    setHidden(false);
  };

  const handleSpeedDialHide = () => {
    setHidden(true);
  };

  return {
    direction,
    hidden,
    handleSpeedDialShow,
    handleSpeedDialHide,
  };
};

export default useSpeedDial;

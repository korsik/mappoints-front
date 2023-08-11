import React from "react";

interface Props {
  onClick: () => void;
}
const CloseButton = ({ onClick }: Props) => {
  return (
    <button className="x_stratos" onClick={onClick}>
      <b>X</b>
    </button>
  );
};

export default CloseButton;

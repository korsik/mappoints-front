import React, { useState } from "react";

function EnablePopUpEditor({ onChange }) {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    console.log("here");
  };

  const functionsCaller = () => {
    handleToggle();

    onChange();
  };

  return (
    <div style={{}}>
      <input
        type="checkbox"
        className={"toggle toggle-primary"}
        checked={isToggled}
        onChange={() => functionsCaller()}
      />
    </div>
  );
}

export default EnablePopUpEditor;

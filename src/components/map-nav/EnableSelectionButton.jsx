import React, { useState } from "react";

function EnableSelectionButton({ onChange }) {
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
    <div style={{ width: "180px" }}>
      <p>Ενεργοποιήση Επιλογής</p>
      <input
        type="checkbox"
        style={{ marginTop: "10px" }}
        className={"toggle toggle-primary"}
        checked={isToggled}
        onChange={() => functionsCaller()}
      />
    </div>
  );
}

export default EnableSelectionButton;

import React, { useState } from "react";
import Switch from "@mui/material/Switch";

function SelectionMarketButton() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const functionsCaller = () => {
    handleToggle();
  };
  return (
    <div style={{ width: "150px" }}>
      <p>Μέθοδος</p>
      <input
        type="checkbox"
        style={{ marginTop: "10px" }}
        className={"toggle toggle-primary"}
        checked={isToggled}
        onChange={() => functionsCaller()}
      />
      <p>{isToggled ? "Μεμονομένη" : "Μαζική"}</p>
    </div>
  );
}

export default SelectionMarketButton;

import React, { useState } from "react";

function BulkEditButton({ extraToggle }) {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    console.log("here");
  };

  const functionsCaller = () => {
    handleToggle();

    extraToggle();
  };

  return (
    <div>
      <p>Bulk Edit</p>

      <input
        style={{ marginTop: "10px" }}
        type="checkbox"
        className={"toggle toggle-primary"}
        checked={isToggled}
        onChange={() => functionsCaller()}
      />

      <p>{isToggled ? "on" : "off"}</p>
    </div>
  );
}

export default BulkEditButton;

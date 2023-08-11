import React, { useState } from "react";
import BulkEditButton from "./BulkEditButton";
import ClearSelectionMarker from "./ClearSelectionMarkers";
import SelectionMarketButton from "./SelectionMarketButton";
import BulkEditor from "./BulkEditor";
import EnableSelectionButton from "./EnableSelectionButton";
function MapToolBar() {
  const [tableVisible, setTableVisible] = useState(false);

  const [menuVisible, seMenuVisible] = useState(false);

  const toggleTable = () => {
    setTableVisible(!tableVisible);
    //  if (!tableVisible) setTableVisible = false;
  };

  const toogleSubMenu = () => {
    seMenuVisible(!menuVisible);
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <EnableSelectionButton
            onChange={toogleSubMenu}
          ></EnableSelectionButton>
        </div>

        <div>{menuVisible ? <SelectionMarketButton /> : null}</div>

        <div>
          {menuVisible ? (
            <BulkEditButton extraToggle={toggleTable}></BulkEditButton>
          ) : null}
        </div>
        <div></div>
        <div style={{ marginLeft: "auto" }}>
          <div>{menuVisible ? <ClearSelectionMarker /> : null}</div>
        </div>
      </div>
      {tableVisible ? <BulkEditor /> : null}
    </>
  );
}

export default MapToolBar;

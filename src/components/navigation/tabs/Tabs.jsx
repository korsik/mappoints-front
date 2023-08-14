import React, { useEffect, useState } from "react";
import Map from "../../mainpage/map/Map";
import Table from "../../mainpage/table/Table";
import TableDrawer from "../sidedrawers/TableDrawer";
import DonutSymbol from "../../visuals/DonutSymbol";
import { useEntryInfoWindow, useSelectCategory } from "../../../state/AppState";
import { Reports } from "../../mainpage/reports/Reports";

import MapToolBar from "../../map-nav/MapToolBar";

const filter_options = {
  headings: ["Κατάσταση Φωτιστικού", "Σύμβολο"],
  types: [
    {
      category: "Αλλαγή",
      symbol: (
        <DonutSymbol
          color={Math.floor(Math.random() * 16777215).toString(16)}
        />
      ),
    },
    {
      category: "Καλή",
      symbol: (
        <DonutSymbol
          color={Math.floor(Math.random() * 16777215).toString(16)}
        />
      ),
    },
    {
      category: "Μέτρια",
      symbol: (
        <DonutSymbol
          color={Math.floor(Math.random() * 16777215).toString(16)}
        />
      ),
    },
  ],
};

const filter_options2 = {
  headings: ["Κατάσταση Φωτιστικού", "Σύμβολο"],
  types: [
    {
      category: "CFL",
      symbol: (
        <DonutSymbol
          color={Math.floor(Math.random() * 16777215).toString(16)}
        />
      ),
    },
    {
      category: "Ha",
      symbol: (
        <DonutSymbol
          color={Math.floor(Math.random() * 16777215).toString(16)}
        />
      ),
    },
    {
      category: "Hg",
      symbol: (
        <DonutSymbol
          color={Math.floor(Math.random() * 16777215).toString(16)}
        />
      ),
    },
    {
      category: "Hg + CFL",
      symbol: (
        <DonutSymbol
          color={Math.floor(Math.random() * 16777215).toString(16)}
        />
      ),
    },
    {
      category: "LED",
      symbol: (
        <DonutSymbol
          color={Math.floor(Math.random() * 16777215).toString(16)}
        />
      ),
    },
    {
      category: "Na",
      symbol: (
        <DonutSymbol
          color={Math.floor(Math.random() * 16777215).toString(16)}
        />
      ),
    },
    {
      category: "Na + CFL",
      symbol: (
        <DonutSymbol
          color={Math.floor(Math.random() * 16777215).toString(16)}
        />
      ),
    },
    {
      category: "Προβολέας",
      symbol: (
        <DonutSymbol
          color={Math.floor(Math.random() * 16777215).toString(16)}
        />
      ),
    },
  ],
};

const Tabs = () => {
  // const [toggleState, setToggleState] = useState(1);
  const [activeTab, setActiveTab] = React.useState(1);

  const resetShowInfoWindow = useEntryInfoWindow((state) => state.reset);

  const setCategory = useSelectCategory((state) => state.selectCategory);

  // const toggleTab = (index) => {
  //   setToggleState(index);
  // };

  useEffect(() => {
    handleTabClick(2);
  }, [setCategory]);

  const handleTabClick = (tabIndex) => {
    resetShowInfoWindow();
    setActiveTab(tabIndex);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return setCategory ? (
          <Table changeTab={handleTabClick} />
        ) : (
          <div className="grid h-screen place-items-center">
            Επιλογή Αντικειμένου
          </div>
        );
      case 2:
        return (
          <div>
            <Map />
          </div>
        );
      case 3:
        return (
          // <div className="flex flex-row">
          /* <div className="w-9/12">
              <Map />
            </div> */
          /* <div className="w-3/12"> */
          /* <TableDrawer table_data={filter_options2} /> */

          /* </div> */
          // </div>
          <Reports />
        );
      case 4:
        return (
          <div className="flex flex-row">
            <div className="w-9/12">
              <Map />
            </div>
            <div className="w-3/12">
              <TableDrawer table_data={filter_options} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-4 px-4 py-2 w-full drop-shadow-lg">
      <div className="tabs tabs-boxed flex space-x-4 px-4 py-2 w-full">
        <a
          id={1}
          onClick={() => handleTabClick(1)}
          className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
        >
          Πίνακας
        </a>
        <a
          id={2}
          onClick={() => handleTabClick(2)}
          className={`tab ${activeTab === 2 ? "tab-active" : ""}`}
        >
          Χάρτης
        </a>
        <a
          id={3}
          onClick={() => handleTabClick(3)}
          className={`tab ${activeTab === 3 ? "tab-active" : ""}`}
        >
          Αναφορές
        </a>
        {/*
        <a
          id={4}
          onClick={() => handleTabClick(4)}
          className={`tab ${activeTab === 4 ? "tab-active" : ""}`}
        >
          Κατάσταση Φωτιστικού
        </a> */}
      </div>

      <div className="w-full h-screen">{renderTabContent()}</div>
    </div>
  );
};

export default Tabs;

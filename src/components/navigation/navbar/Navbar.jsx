import React from "react";

import {
  useCreateEntry,
  useInsertStore,
  useProfileInStore,
  useUpdateButton,
} from "../../../state/AppState";
import Cookies from "js-cookie";

const Navbar = ({ toggleDrawer }) => {
  const toggleProfile = useProfileInStore((state) => state);
  const toggleInsert = useInsertStore((state) => state);

  const updateBtn = useUpdateButton((state) => state.toggleUpdateButtonState);
  const resetEntry = useCreateEntry((state) => state.reset);
  // const lights = true;
  // const navbar_options = [
  //   "ΚΑΤΑΧΩΡΗΣΗ ΜΕ ΠΡΟΦΙΛ",
  //   // "ΜΑΖΙΚΗ ΕΠΕΞΕΡΓΑΣΙΑ",
  //   "ΚΑΤΑΧΩΡΗΣΗ",
  //   // "ΑΝΑΖΗΤΗΣΗ",
  //   "ΦΟΡΤΩΣΗ",
  // ];

  // const list = navbar_options.map((option, index) => {
  //   // console.log(`The lights are ${lights} and the options are ${option}`);
  //   if (lights === false && option === "ΚΑΤΑΧΩΡΗΣΗ ΜΕ ΠΡΟΦΙΛ") return;
  //   return (
  //     <li key={index}>
  //       <a className="text-accent-content">{option}</a>
  //     </li>
  //   );
  // });

  const refreshPage = () => {
    window.location.reload(true);
  };

  let list_items = <></>;
  if (Cookies.get("user_role") !== "viewer") {
    list_items = (
      <>
        <li>
          <a
            id="insertProf"
            className="text-accent-content"
            onClick={() => {
              console.log(
                `The valus of profile is ${toggleProfile.toggleProfileInsert} and the value of single is ${toggleInsert.toggleInsert}`
              );
              toggleProfile.updateToggleProfileInsert(
                !toggleProfile.toggleProfileInsert
              );
              toggleInsert.updateToggleInsert(false);
            }}
          >
            ΚΑΤΑΧΩΡΗΣΗ ΕΙΔΟΥΣ
          </a>
        </li>
        <li>
          <a
            id="insertLoc"
            className="text-accent-content"
            onClick={() => {
              toggleProfile.updateToggleProfileInsert(false);
              toggleInsert.updateToggleInsert(!toggleInsert.toggleInsert);
              updateBtn(false);
              resetEntry();
            }}
          >
            ΚΑΤΑΧΩΡΗΣΗ
          </a>
        </li>
      </>
    );
  }

  return (
    <div className="navbar w-full mx-0 px-0 bg-accent">
      <div className="flex-none">
        <button
          onClick={() => toggleDrawer()}
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="inline-block text-accent-content w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-accent-content normal-case text-xl">
          Map Manager
        </a>
      </div>
      <div className="flex-none lg:block pr-14">
        <ul className="menu menu-horizontal">
          {list_items}
          <li>
            <a className="text-accent-content" onClick={refreshPage}>
              ΦΟΡΤΩΣΗ
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import Dropdown from "../../utils/Dropdown";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { getCategories } from "../../../services/categoryService";
import { useAuthStore, useSelectCategory } from "../../../state/AppState";
import Cookies from "js-cookie";
import CategoryModal from "../../modals/CategoryModal";
import mainLogo from "../../../assets/exalogo.png";

const LeftDrawer = ({ isModalOpen, modal, users_table, activeState }) => {
  const isLoggedIn = useAuthStore((state) => state.logOut);
  const user = useAuthStore((state) => state.user);

  const setCategory = useSelectCategory((state) => state.updateSelectCategory);

  const [username, setUsername] = useState(user.username);

  const userRole = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user")).role
    : "";

  useEffect(() => {
    // console.log(sessionStorage.user);
    setUsername(JSON.parse(sessionStorage.user).username);
  }, [sessionStorage.user]);

  const { data, isLoading, isError, error } = useQuery(
    ["categories"],
    () => getCategories(),
    {
      onError: (error) => {
        console.error("An error occurred:", error);
      },
    }
  );
  // console.log(Cookies.get("jwtToken"));

  if (data === 401) {
    isLoggedIn();
    // Cookies.remove("jwtToken");
  }

  let list = <li>No items found</li>;
  if (Array.isArray(data)) {
    // console.log("Why here")
    console.log(data);
    list = data.map((option) => {
      return (
        <li key={option.pub_id} onClick={() => setCategory(option)}>
          <a>{option.name}</a>
        </li>
      );
    });
  }

  return (
    <div className="flex flex-col  h-screen ">
      {/* drop-shadow-md */}
      <div className="bg-base-100 h-20 flex justify-center items-center">
        <div>
          <img className="" src={mainLogo} alt="exa logo" />
        </div>
      </div>

      <div className="bg-primary rounded-lg justify-center items-center m-2 flex h-40">
        <div className="space-y-2 flex flex-col w-4/5">
          {/* <label>Username</label> */}
          {/* <label>Δήμος</label> */}
          <Dropdown name={username} canOpen={true} />
          <Dropdown name="Δήμος" />
        </div>
      </div>
      {isLoading ? <LoadingSpinner /> : <></>}
      {userRole === "admin" || userRole === "super_admin" ? (
        <div className="p-2 text-base-content flex h-15">
          {/* {" "} */}
          <button
            className={`btn btn-outline btn-primary leftdrawerButton p-1 rounded-lg  ${
              activeState ? "bg-primary" : ""
            }`}
            onClick={users_table}
          >
            <a className="text-base-content">Χρήστες</a>
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="p-2 text-base-content flex h-15">
        <button
          className={`btn btn-outline btn-primary leftdrawerButton p-2  rounded-lg   ${
            isModalOpen ? "bg-primary" : ""
          }`}
          onClick={modal}
        >
          <a className="text-base-content">προσθηκη αντικειμενου</a>
        </button>
      </div>
      <div className="bg-base-100 px-4 text-base-content"></div>

      <div className="max-h-screen h-1/2 overflow-auto">
        <ul className="menu px-4 bg-base-100 text-base-content ">
          {/* h-screen */}
          {isError ? <></> : list}
        </ul>
      </div>
      {/* <div className="absolute bottom-0 p-2 py-4 text-base-content">
        <button
          className={`btn btn-outline btn-primary btn-wide p-2  rounded-lg  ${
            isModalOpen ? "bg-primary" : ""
          }`}
          onClick={modal}
        >
          <a className="text-base-content">προσθηκη κατηγοριας</a>
        </button>
      </div> */}

      {/* </div> */}
    </div>
  );
};

export default LeftDrawer;

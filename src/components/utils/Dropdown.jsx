import React, { useState } from "react";
import { useAuthStore, useUpdateButton } from "../../state/AppState";
import UserModal from "../user_management/UserModal";
import { useUpdateUser } from "../../state/AppState";
import { useCreateUser } from "../../state/AppState";

const Dropdown = (props) => {
  const isLoggedIn = useAuthStore((state) => state.logOut);
  // const user = useAuthStore((state) => state.user);
  const toggleUpdateButtonState = useUpdateButton(
    (state) => state.toggleUpdateButtonState,
  );
  const updateUser = useUpdateUser((state) => state.userIdToUpdate);
  const createUser = useCreateUser((state) => state);

  const [isModalOpen, setModalOpen] = useState(false);

  const updateButtonPressed = () => {
    let user = "";
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    // console.log(user);
    openModal(null);

    createUser.updateUser({
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      username: user.username,
    });
    updateUser(user.pub_id);
    // toggleUpdateButtonState(true);
    // setModalOpen(true);
  };

  const openModal = () => {
    createUser.reset();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    toggleUpdateButtonState(false);
  };

  return (
    <>
      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn btn-xs sm:btn-sm 
      text-info-content hover:text-accent-content hover:bg-primary-focus bg-inherit 
      m-1 w-full normal-case"
        >
          {props.name}
        </label>
        {props.canOpen ? (
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={() => updateButtonPressed()}>Προφίλ</a>
            </li>
            <li>
              <a onClick={() => isLoggedIn()}>Log Out</a>
            </li>
          </ul>
        ) : (
          <a></a>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed flex w-full inset-0 justify-center items-center z-20">
          <UserModal closeModal={closeModal} fromTable={false} updateState={true} />
          {/* <button className="btn" onClick={}>
          Close Modal
        </button> */}
        </div>
      )}
    </>
  );
};

export default Dropdown;

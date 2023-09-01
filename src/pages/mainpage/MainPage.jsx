import React, { useEffect, useState } from "react";
import Tabs from "../../components/navigation/tabs/Tabs";
import LeftDrawer from "../../components/navigation/sidedrawers/LeftDrawer";
import ProfileInsertDrawer from "../../components/navigation/sidedrawers/ProfileInsertDrawer";
import InsertionDrawer from "../../components/navigation/sidedrawers/InsertionDrawer";
import {
  useInsertStore,
  useProfileInStore,
  useSuccessModal,
  useUpdateButton,
} from "../../state/AppState";
import Navbar from "../../components/navigation/navbar/Navbar";
import UserTable from "../../components/user_management/UserTable";
import CategoryModal from "../../components/modals/CategoryModal";

const MainPage = () => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(true);
  const toggleInsert = useInsertStore((state) => state.toggleInsert);
  const [isUserTableOpen, setUserTableOpen] = useState(false);

  const updateBtn = useUpdateButton((state) => state.updateButtonState);

  const toggleProfile = useProfileInStore((state) => state.toggleProfileInsert);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleDrawer = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };

  const toggleUserTable = () => {
    setUserTableOpen(!isUserTableOpen);
  };

  return (
    <div className="w-full">
      {/* <div class="w-full h-screen"> */}
      {/* <div class="relative z-0"> */}
      <Navbar toggleDrawer={toggleDrawer} />
      <div className="relative z-0">
        {/* h-screen */}
        <div className="flex z-10 ">
          <div className="flex w-full ">
            {/* h-screen */}
            {isSideDrawerOpen ? (
              <div className="mitsos">
                {/* w-1/4 */}
                <LeftDrawer
                  isModalOpen={isModalOpen}
                  modal={openModal}
                  users_table={toggleUserTable}
                  activeState={isUserTableOpen}
                />
              </div>
            ) : null}

            {isUserTableOpen ? <UserTable /> : <Tabs />}
            {/* <Tabs /> */}
            {/* <UserTable /> */}
          </div>

          {toggleInsert || updateBtn ? (
            <div className="absolute bg-base-100 end-0 justify-center items-center overflow-auto p-3 shadow-lg rounded-lg w-1/4 z-30">
              <InsertionDrawer />
            </div>
          ) : (
            <></>
          )}

          {toggleProfile && (
            <div className="absolute bg-base-100 end-0 justify-center items-center overflow-auto p-3 shadow-lg rounded-lg w-1/4 z-30">
              <ProfileInsertDrawer />
              {/* className="flex h-screen content-end w-1/6" */}
            </div>
          )}

          {isModalOpen && (
            <div className="fixed w-full inset-0 flex items-center justify-center z-20">
              <CategoryModal closeModal={closeModal} />
              {/* <button className="btn" onClick={}>
            Close Modal
          </button> */}
            </div>
          )}

         



        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default MainPage;

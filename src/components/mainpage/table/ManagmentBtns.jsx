import React, { useState } from "react";
import { useEntryInfoWindow, useUpdateButton } from "../../../state/AppState";
import { deleteEntryService } from "../../../services/EntriesService";
import { deleteUserService } from "../../../services/UserService";
import { useMutation } from "@tanstack/react-query";

const ManagmentBtns = ({ openModal, table, data, mapBtn }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const showInfoWindowEntry = useEntryInfoWindow((state) => state.updateEntry);
  const openShowInfo = useEntryInfoWindow((state) => state.setIsOpen);
  const updateBtn = useUpdateButton((state) => state.toggleUpdateButtonState);

  const updateButtonPressed = () => {
    openModal(data);
    updateBtn(true);
  };

  const mapRedirect = () => {
    mapBtn(2);
    showInfoWindowEntry(data);
    openShowInfo(true);
  };

  const delEntry = useMutation(deleteEntryService, {
    onSuccess: (data) => {
      console.log("Success");
      setOpenDeleteModal(false);
      window.location.reload(true);
    },
  });

  const delUser = useMutation(deleteUserService, {
    onSuccess: (data) => {
      console.log("Success");
      setOpenDeleteModal(false);
      window.location.reload(true);
    },
  });

  const deleteEntry = () => {
    console.log(data.pub_id);
    delEntry.mutateAsync(data.pub_id);
  };

  const deleteUser = () => {
    console.log(data.pub_id);
    delUser.mutateAsync(data.pub_id);
  };

  const deleteData = () => {
    if (table === "users") {
      console.log("Delete User");
      deleteUser();
    } else if (table === "entries") {
      console.log("Delete Entries");
      deleteEntry();
    }
  };

  return (
    <>
      <div className="space-x-2 h-14 justify-center items-center">
        {table === "users" ? (
          <></>
        ) : (
          <button
            className="bg-base-300 rounded-lg hover:btn-success btn-square"
            onClick={mapRedirect}
          >
            <svg
              //   id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
              fill="#231F20"
              xmlns="http://www.w3.org/2000/svg"
              //   xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <path
                  //   class="st0"
                  d="M472.9,136.6L368.2,66.3c-4.6-3.1-10.4-3.1-15.1,0L256,131.5l-97.1-65.2c-4.6-3.1-10.5-3.1-15.1,0L39.1,136.6   c-4.4,2.9-7.1,8.3-7.1,14v281c0,5.9,2.8,11.3,7.4,14.3c4.6,2.9,10.3,2.8,14.8-0.2l97.1-65.2l97.1,65.2c4.7,3.1,10.4,3.1,15.1,0   l97.2-65.2l97.1,65.2c2.3,1.5,4.9,2.4,7.5,2.4c2.5,0,5-0.7,7.2-2.1c4.6-2.9,7.4-8.4,7.4-14.3v-281   C480,144.9,477.3,139.5,472.9,136.6z M135,353.2l-71,49.4V160.9l71-49.4V353.2z M167,352.8V230.4c1,0.7,2,1.3,2.9,2l9.3-13   c-3.8-2.7-8-5.3-12.2-7.5V111l73,49v108.7c-5.5-1.9-10.9-4.4-16.4-7.9l-8.5,13.6c6.8,4.3,13.6,7.5,20.7,9.8l4.2-12.8v130.3   L167,352.8z M272,401.7V288.3c0.2,0,0.4,0,0.5,0c2.9-0.2,5.8-0.5,8.5-0.9l-2.5-15.8c-2.1,0.3-4.3,0.6-6.6,0.7V160l73-49v119.2   l-5.3-4.8c-3,3.3-5.8,6.6-8.6,9.7c-1.8,2.1-3.6,4.1-5.3,6.1l12,10.6c1.8-2,3.6-4.1,5.4-6.2c0.6-0.7,1.2-1.4,1.9-2.1v109.2   L272,401.7z M448,401.7l-71-48.4V216.1c3.6-1.6,7.4-2.8,11.1-3.6l-3.2-15.7c-2.7,0.5-5.3,1.3-8,2.1v-87.5l71,48.5V401.7z"
                />
                <path
                  //   class="st0"
                  d="M98.9,256c1.9-5.9,3.5-11,7.1-16.3l-13.2-9c-4.9,7.2-7.1,13.9-9.2,20.5l-0.2,0.8l15.2,4.9L98.9,256z"
                />
                <path
                  //   class="st0"
                  d="M128.8,221.1c2.2-1.2-1.4-1.1,1-1.8l-4.9-15.2c-3.3,1.1-6.5,2.4-9.6,4.1c-3.8,2.1-7.7,4.9-11.3,8.3l10.9,11.7   C117.5,225.7,126.1,222.5,128.8,221.1z"
                />
                <path
                  //   class="st0"
                  d="M296.3,266.1l7,14.4c6.6-3.2,12.8-7.4,19.1-13l-10.6-12C306.6,260.1,301.6,263.6,296.3,266.1z"
                />
                <path
                  //   class="st0"
                  d="M197.8,237.8c-1-1.2-2-2.4-3-3.6l-12.2,10.4c1,1.2,2,2.3,2.9,3.5c3.6,4.3,7.3,8.7,11.6,12.8l11-11.6   C204.5,245.8,201.3,241.9,197.8,237.8z"
                />
                <polygon
                  //   class="st0"
                  points="407.7,229.7 418,219.3 428.3,229.7 439.7,218.3 429.3,208 439.7,197.7 428.3,186.3 418,196.7    407.7,186.3 396.3,197.7 406.7,208 396.3,218.3  "
                />
              </g>
            </svg>
          </button>
        )}

        <button
          className="bg-base-300 rounded-lg hover:btn-warning btn-square"
          onClick={updateButtonPressed}
        >
          <svg
            //   class="feather feather-edit"
            fill="none"
            stroke="#231F20"
            strokeLinecap="round" //stroke-linecap
            strokeLinejoin="round" //stroke-linejoin
            strokeWidth="2" // stroke-width
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        <button
          className="bg-base-300 rounded-lg hover:btn-error btn-square"
          onClick={() => setOpenDeleteModal(true)}
        >
          {/* <div className="w-full h-full"> */}
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2px"
          >
            <title />
            <g id="trash">
              <rect className="cls-1" height="22" width="18" x="7" y="7" />
              <line className="cls-1" x1="3" x2="29" y1="7" y2="7" />
              <line className="cls-1" x1="13" x2="19" y1="3" y2="3" />
              <line className="cls-1" x1="13" x2="13" y1="12" y2="22" />
              <line className="cls-1" x1="19" x2="19" y1="12" y2="22" />
            </g>
          </svg>
          {/* </div> */}
        </button>
      </div>

      {openDeleteModal ? (
        <div className="fixed flex w-full inset-0 justify-center items-center z-20">
          <div className="flex w-2/3 bg-white items-center justify-center h-auto">
            <div className="h-3/4 w-full bg-white shadow-lg p-6 m-6 rounded-lg">
              <p>Διαγραφή της καταχώρησης {data.name};</p>
              <div className="flex flex-row justify-between space-x-14">
                <div className="modal-action">
                  <button className="btn btn-primary" onClick={deleteData}>
                    Διαγραφη
                  </button>
                </div>
                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn btn-error"
                    onClick={() => setOpenDeleteModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ManagmentBtns;

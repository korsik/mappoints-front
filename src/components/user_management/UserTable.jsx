import React, { useEffect, useRef, useState } from "react";
import { useAuthStore, useCreateUser, useUpdateButton, useUpdateUser } from "../../state/AppState";
import { getUsers } from "../../queries/UserQueries";
import LoadingSpinner from "../utils/LoadingSpinner";
import Pagination from "../utils/Pagination";
import ManagmentBtns from "../mainpage/table/ManagmentBtns";
import UserModal from "./UserModal";

const UserTable = () => {
  const isLoggedIn = useAuthStore((state) => state.logOut);
  // const updateBtnState = useUpdateButton(state => state.updateButtonState);
  const toggleUpdateButtonState = useUpdateButton(state => state.toggleUpdateButtonState);
  const updateUser = useUpdateUser(state => state.userIdToUpdate);

  const createUser = useCreateUser((state) => state);

  const [updateState, setUpdateState] = useState(false);
  const [records, setRecords] = useState({ records: [], npage: 1, numbers: 1 });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const [isModalOpen, setModalOpen] = useState(false);

  const editBtn = (data) => {
    createUser.updateUser({
      name: data.name,
      surname: data.surname,
      email: data.email,
      role: data.role,
      username: data.username
    });
    updateUser(data.pub_id);
    setModalOpen(true);
    setUpdateState(true);
  }

  const openModal = () => {
    createUser.reset();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    toggleUpdateButtonState(false);
    if(updateState)  {
      setUpdateState(false);
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const { data, refetch, isLoading } = getUsers();

  useEffect(() => {
    if (data) {
      setRecords({
        records: data.slice(firstIndex, lastIndex),
        npage: Math.ceil(data.length / recordsPerPage),
        numbers: [
          ...Array(Math.ceil(data.length / recordsPerPage) + 1).keys(),
        ].slice(1),
      });
      //   entries.updateEntries(data);
    }
  }, [data, currentPage]);

  if (data === 401) {
    // Cookies.remove("jwtToken");
    isLoggedIn();
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex flex-col overflow-auto space-y-4 px-4 py-2 w-full h-screen">
        <div className="grow overflow-auto">
          {/* h-screen */}
          <table className="table w-full h-auto">
            {/* head */}
            <thead>
              <tr>
                <th>A/A</th>
                <th>ΚΩΔΙΚΟΣ</th>
                <th>Ονοματεπώνυμο</th>
                <th>ρόλος</th>
                <th>ΕΝΕΡΓΕΙΕΣ</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {records.records.map((row, index) => (
                <tr key={row.pub_id} className="hover">
                  <td>{index}</td>
                  <td>{row.pub_id}</td>
                  <td>{`${row.name} ${row.surname}`}</td>
                  <td>{row.role}</td>
                  <td>
                    <ManagmentBtns openModal={editBtn} table="users" data={row} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-none h-16">
          <div className="absolute bottom-0">
            <div className="flex flex-row inset-0 justify-between items-center">
              <Pagination curPage={changePage} pageNum={records.numbers} />
              <button className="btn btn-primary" onClick={openModal}>
                Δημιοργία Χρήστη
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed flex w-full inset-0 justify-center items-center z-20">
          <UserModal closeModal={closeModal} fromTable={!updateState} updateState={updateState} />
          {/* <button className="btn" onClick={}>
            Close Modal
          </button> */}
        </div>
      )}
    </>
  );
};

export default UserTable;

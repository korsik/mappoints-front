import React, { useEffect, useState } from "react";
import ManagmentBtns from "./ManagmentBtns";
import Pagination from "../../utils/Pagination";
import ExportExcel from "../../utils/ExportExcel";
import {
  useAuthStore,
  useCreateEntry,
  useEntries,
  useSelectCategory,
  useUpdateEntry,
} from "../../../state/AppState";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Cookies from "js-cookie";
import { getEntriesQ } from "../../../queries/EntriesQueries";

const Table = ({ changeTab }) => {
  const isLoggedIn = useAuthStore((state) => state.updateIsLoggedIn);
  const userRole = JSON.parse(sessionStorage.getItem("user")).role;

  const selectCategory = useSelectCategory((state) => state.selectCategory);

  const entries = useEntries((state) => state);

  const createEntry = useCreateEntry((state) => state.updateEntry);
  const updateEntry = useUpdateEntry((state) => state.entryIdToUpdate);

  const [records, setRecords] = useState({ records: [], npage: 1, numbers: 1 });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const [isModalOpen, setModalOpen] = useState(false);

  const editBtn = (data) => {
    console.log("Hello");
    createEntry({
      name: data.name,
      address: data.address,
      lat: data.lat,
      long: data.long,
      color: data.color,
      data: data.data ? JSON.parse(data.data) : [],
    });
    updateEntry(data.pub_id);
    setModalOpen(true);
    changeTab(2);
  };

  const openModal = () => {
    createUser.reset();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    toggleUpdateButtonState(false);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const { data, refetch, isLoading } = getEntriesQ(selectCategory.pub_id);

  useEffect(() => {
    if (data) {
      setRecords({
        records: data.slice(firstIndex, lastIndex),
        npage: Math.ceil(data.length / recordsPerPage),
        numbers: [
          ...Array(Math.ceil(data.length / recordsPerPage) + 1).keys(),
        ].slice(1),
      });
      entries.updateEntries(data);
    }
  }, [data, currentPage]);

  useEffect(() => {
    refetch();
  }, [selectCategory]);

  if (data === 401) {
    Cookies.remove("jwtToken");
    isLoggedIn(false);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <div className="grow overflow-auto">
        <table className="table w-full h-auto">
          {/* head */}
          <thead>
            <tr>
              <th>A/A</th>
              <th>ΚΩΔΙΚΟΣ</th>
              <th>ΟΔΟΣ</th>
              <th>ΕΝΕΡΓΕΙΕΣ</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {records.records.map((row, index) => (
              <tr key={row.pub_id} className="hover">
                <td>{index}</td>
                <td>{row.pub_id}</td>
                <td>{row.address}</td>
                <td>
                  {userRole !== "viewer" ? (
                    <ManagmentBtns
                      openModal={editBtn}
                      table="entries"
                      data={row}
                      mapBtn={changeTab}
                    />
                  ) : (
                    <></>
                  )}
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
            <ExportExcel
              excelData={records.records}
              fileName={selectCategory.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

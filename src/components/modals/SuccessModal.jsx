import React from "react";

const SuccessModal = ({ message, modalOpen }) => {
  return (
    <div className="fixed flex w-full inset-0 justify-center items-center z-20">
      <div className="flex w-2/3 bg-white items-center justify-center h-auto">
        <div className="h-3/4 w-full bg-white shadow-lg p-6 m-6 rounded-lg">
          <p>{message}</p>
          <div className="flex flex-row justify-between space-x-14">
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={modalOpen}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BulkEditHeadersExtra from "./BulkEditHeadersExtra";

import BulkEditExtraData from "./BulkEditExtraData";
import {
  getSelected,
  getSelectedHeadersExtra,
  getSelectedDataExtra,
} from "../map-nav/mapController";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 1,
  p: 0,
};

const dataas = [
  { id: 1689699254586, name: "checking", value: "q" },
  { id: 1689699261314, name: "the", value: "q" },
  { id: 1689699267076, name: "names", value: "q" },
];

function BulkEditor() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  console.log(getSelected());
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            style={{
              minHeight: "400px",
              minWidth: "350px",
              maxHeigth: "500px",
            }}
          >
            <Box style={{ background: "rgb(219, 219, 219)" }}>
              <h6>Μαζική Επεξεργασία</h6>
            </Box>
            <Box
              style={{ overflow: "scroll", height: "500px", padding: "5px" }}
            >
              <div className="overflow-x-auto">
                <table className="table w-full h-full">
                  {/* head */}
                  <thead>
                    <tr className="outline-1 h-1/6">
                      <th className="">Id</th>
                      <th>Ονομασία</th>
                      <th>Χρώμα</th>

                      <BulkEditHeadersExtra
                        data={getSelectedHeadersExtra()}
                      ></BulkEditHeadersExtra>
                    </tr>
                  </thead>
                  <tbody>
                    {getSelected().map((type) => (
                      <tr key={type.id} className="hover outline-1">
                        <td>{type.id} </td>
                        <td>{type.name}</td>
                        <td>{type.color}</td>
                        <BulkEditExtraData data={type.data}></BulkEditExtraData>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                background: "rgb(219, 219, 219)",
              }}
            >
              <div style={{ marginLeft: "auto" }}>
                <button
                  style={{ background: "grey!important", margin: "5px" }}
                  className="btn"
                >
                  Ακυρωση
                </button>
              </div>
              <div>
                <button className="btn btn-primary" style={{ margin: "5px" }}>
                  Καταχωρηση
                </button>
              </div>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default BulkEditor;

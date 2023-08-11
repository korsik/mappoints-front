import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EnablePopUpEditor from "./EnablePopUpEditor";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 1,
  p: 0,
};

const export_date = (date) => {
  date = date.replace("T", " ");
  date = date.split(".")[0];
  let dateParts = date.split(" ");
  let dateFormated = dateParts[0].split("-");
  return (
    dateFormated[2] +
    "/" +
    dateFormated[1] +
    "/" +
    dateFormated[0] +
    " " +
    dateParts[1]
  );
};
const EditMarkerPopPup = ({ marker }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isReadonly, setIsReadOnly] = useState(true);

  const [editorEnable, setEditorEnable] = useState(false);
  const togglePopUpEditor = () => {
    setEditorEnable(!editorEnable);
    setIsReadOnly(!isReadonly);
  };
  const handleFieldsChange = (marker, fieldName, newValue) => {
    console.log(newValue);
    marker[fieldName] = newValue;
    console.log(marker);
  };

  return (
    <>
      <div>
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
              width: "20%",
              maxHeigth: "580px",
            }}
          >
            <Box style={{ background: "#ff6400" }}>
              <h6
                style={{
                  marginLeft: "5px",
                  fontSize: "20px",
                  fontWeight: "400",
                }}
              >
                {marker.name}
              </h6>
            </Box>
            <Box></Box>
            <Box
              style={{ overflow: "scroll", height: "500px", padding: "10px" }}
            >
              <div className="form-group">
                <label
                  htmlFor={marker.name}
                  className="w-full max-w-xs"
                  style={{ fontWeight: "400" }}
                >
                  Ονομασία
                </label>
                <br></br>
                <input
                  style={{
                    borderBottom: "solid #ff6400 1px",
                    width: "100%",
                  }}
                  type="text"
                  name="name"
                  key={"name"}
                  className=""
                  value={marker.name}
                  onChange={(e) =>
                    handleFieldsChange(marker, "name", e.target.value)
                  }
                />
              </div>
              {!editorEnable ? (
                <div className="form-group" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor={marker.created}
                    className="w-full max-w-xs"
                    style={{ fontWeight: "400" }}
                  >
                    Δημιουργήθηκε
                  </label>
                  <br></br>
                  <input
                    style={{ borderBottom: "solid #ff6400 1px", width: "100%" }}
                    type="text"
                    readOnly
                    className=""
                    value={export_date(marker.createdAt)}
                  />
                </div>
              ) : (
                ""
              )}
              {!editorEnable ? (
                <div className="form-group" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor={marker.created}
                    className="w-full max-w-xs"
                    style={{ fontWeight: "400" }}
                  >
                    Ενημερώθηκε
                  </label>
                  <br></br>
                  <input
                    style={{ borderBottom: "solid #ff6400 1px", width: "100%" }}
                    type="text"
                    readOnly
                    className=""
                    value={export_date(marker.updateddAt)}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="form-group" style={{ marginTop: "10px" }}>
                <label
                  htmlFor={marker.created}
                  className="w-full max-w-xs"
                  style={{ fontWeight: "400" }}
                >
                  Διεύθυνση
                </label>
                <br></br>
                <input
                  style={{ borderBottom: "solid #ff6400 1px", width: "100%" }}
                  type="text"
                  className=""
                  value={marker.address}
                />
              </div>
              <div className="form-group" style={{ marginTop: "10px" }}>
                <label
                  htmlFor={marker.created}
                  className="w-full max-w-xs"
                  style={{ fontWeight: "400" }}
                >
                  Γεωγραφικό Πλάτος
                </label>
                <br></br>
                <input
                  style={{ borderBottom: "solid #ff6400 1px", width: "100%" }}
                  type="text"
                  className=""
                  key={marker.lat}
                  value={marker.lat}
                />
              </div>
              <div className="form-group" style={{ marginTop: "10px" }}>
                <label
                  htmlFor={marker.created}
                  className="w-full max-w-xs"
                  style={{ fontWeight: "400" }}
                >
                  Γεωγραφικό Μήκος
                </label>
                <br></br>
                <input
                  style={{ borderBottom: "solid #ff6400 1px", width: "100%" }}
                  type="text"
                  readOnly
                  className=""
                  value={marker.long}
                />
              </div>
              <div className="form-group" style={{ marginTop: "10px" }}>
                <label
                  htmlFor={marker.created}
                  className="w-full max-w-xs"
                  style={{ fontWeight: "400" }}
                >
                  Χρώμα
                </label>
                <br></br>
                <input
                  type="color"
                  name="color"
                  placeholder="color"
                  value={marker.color}
                  className="input input-bordered input-primary w-full "
                />
              </div>
              <br></br>
              <h6 style={{ fontWeight: "bold" }} className="text-center">
                Extra Πεδία
              </h6>
              <hr
                style={{
                  width: "30px",
                  marginLeft: "45%",
                  background: "#ff6400",
                  height: "2px",
                }}
              ></hr>
              <br></br>
              {JSON.parse(marker.data).map((item) => (
                <div className="form-group" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor={item.id}
                    className="w-full max-w-xs"
                    style={{ fontWeight: "400" }}
                  >
                    {item.name}
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    style={{ borderBottom: "solid #ff6400 1px", width: "100%" }}
                  />
                </div>
              ))}
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                height: "55px",
                background: "rgb(219, 219, 219)",
              }}
            >
              <div>
                <label>Επεξεργασία</label>
                <EnablePopUpEditor onChange={togglePopUpEditor} />
              </div>
              {editorEnable ? (
                <>
                  <div style={{ marginLeft: "auto" }}>
                    <button
                      style={{ background: "grey!important", margin: "10px" }}
                      onClick={handleClose}
                      className="btn"
                    >
                      Ακυρωση
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      style={{ margin: "10px" }}
                    >
                      Καταχωρηση
                    </button>
                  </div>
                </>
              ) : null}
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default EditMarkerPopPup;

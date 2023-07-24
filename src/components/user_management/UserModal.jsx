import React, { useMemo, useRef, useState } from "react";
import {
  useCreateUser,
  useUpdateButton,
  useUpdateUser,
} from "../../state/AppState";
import ArrowDropDown from "../utils/ArrowDropDown";
import {
  createUserService,
  updateUserService,
} from "../../services/UserService";
import { useMutation } from "@tanstack/react-query";

const UserModal = ({ closeModal, fromTable = true, updateState=false }) => {
  const createUser = useCreateUser((state) => state);
  const updateUserId = useUpdateUser((state) => state.userId);
  // const updateBtnState = useUpdateButton((state) => state.updateButtonState);

  // if(updateBtnState) {
  //   console.log("Hello");
  //   console.log(createUser.user);

  // }

  const [validatePassword, setValPassowrd] = useState("");
  const [isPassValid, setIsPassValid] = useState(true);
  const [role, setRole] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    createUser.updateUser({ [name]: value });
  };

  const updateRole = (role) => {
    setRole(role);
    // createUser.updateUser({ role: value });
    console.log(role);
  };

  const save = useMutation(createUserService, {
    onSuccess: (data) => {
      console.log("Success");
      closeModal();
    },
  });

  const update = useMutation(updateUserService, {
    onSuccess: (data) => {
      console.log("Success");
      closeModal();
    },
  });

  const submitUser = () => {
    createUser.updateUser({
      ...createUser.user,
      role: role,
    });


    if (createUser.user.role === "") {
      console.log("No role selected");
      return;
    }

    if (!update && createUser.user.password !== "") {
      if (createUser.user.password !== validatePassword) {
        setIsPassValid(false);
        return;
      }
    }
    setIsPassValid(true);
    // closeModal();
    if (updateState) {
      console.log(createUser.user);
      const userData = createUser.user;
      const reqData = {
        userId: updateUserId,
        userData
      }
      update.mutateAsync(reqData);
    }
    else {
      save.mutateAsync(createUser.user);
    }
    
  };

  return (
    <div className="flex items-center justify-center h-auto">
      <div className="h-3/4 w-2/4 bg-white shadow-lg p-6 m-6 rounded-lg">
        <h3 className="font-bold text-lg">Δημιουργία Χρήστη</h3>
        <input
          type="text"
          name="name"
          placeholder="Όνομα"
          className="input input-bordered input-primary my-3 w-full max-w-xs"
          {...(fromTable ? {} : { disabled: true })}
          value={createUser.user.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="Επώνυμο"
          className="input input-bordered input-primary my-3 w-full max-w-xs"
          {...(fromTable ? {} : { disabled: true })}
          value={createUser.user.surname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="e-mail"
          className="input input-bordered input-primary my-3 w-full max-w-xs"
          {...(fromTable ? {} : { disabled: true })}
          value={createUser.user.email}
          onChange={handleInputChange}
        />
        {/* <input
        type="text"
        name="role"
        placeholder="Ρόλος"
        className="input input-bordered input-primary my-3 w-full max-w-xs"
        value={createUser.user.role}
        onChange={handleInputChange}
      /> */}
        <ArrowDropDown
          name={"Ρόλος"}
          data={fromTable ? ["editor", "viewer"] : [createUser.user.role]}
          // data={["editor", "viewer"]}
          updateData={updateRole}
        />
        <input
          type="text"
          name="username"
          placeholder="Όνομα χρήστη"
          className="input input-bordered input-primary my-3 w-full max-w-xs"
          {...(fromTable ? {} : { disabled: true })}
          value={createUser.user.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Κωδικός"
          className="input input-bordered input-primary my-3 w-full max-w-xs"
          value={createUser.user.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="val_password"
          placeholder="Επαλύθευση κωδικού"
          className={`input input-bordered ${
            isPassValid ? "input-primary" : "input-error"
          } my-3 w-full max-w-xs`}
          value={validatePassword}
          onChange={(e) => {
            setValPassowrd(e.target.value);
          }}
        />
        <div className="flex flex-row space-x-14">
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}

            <button className="btn btn-primary" onClick={submitUser}>
              {updateState ? "Ενημερωση" : "Δημιουργία"}
            </button>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;

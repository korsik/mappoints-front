import React, { useState } from "react";
import { useCreateUser } from "../../state/AppState";
import { useMutation } from "@tanstack/react-query";
import ArrowDropDown from "../utils/ArrowDropDown";
import { createCategoryService } from "../../services/categoryService";

const CategoryModal = ({ closeModal }) => {
  const [createCategory, setCreateCategory] = useState({
    name: "",
    description: "",
    fields: [],
  });

  const [fieldList, setFieldList] = useState([]);

  const [type, setType] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCreateCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateType = (type) => {
    setType(type);
    // createUser.updateUser({ role: value });
    console.log(type);
  };

  const save = useMutation(createCategoryService, {
    onSuccess: (data) => {
      console.log("Success");
      closeModal();
    },
  });

  const submitUser = () => {
    console.log(fieldList);

    if (createCategory.name === "") {
      console.log("Empty name. Please give a name to the field");
      return;
    }

    save.mutateAsync(createCategory);
  };

  const handleAddField = () => {
    const newField = {
      id: Date.now(), // unique identifier for the field
      name: "", // field value
      isRequired: false, // requirement flag
      type: "text", // field type
    };
    setFieldList((prevList) => [...prevList, newField]);
  };

  const handleInputChange = (id, name, value) => {
    // setFieldList((prevList) => {
    //   const newList = prevList.map((field) => {
    //     if (field.id === id) {
    //       return { ...field, [name]: value };
    //     }
    //     return field;
    //   });
    //   return newList;
    // });

    setFieldList((prevList) => {
      const newList = prevList.map((field) => {
        if (field.id === id) {
          return { ...field, [name]: value };
        }
        return field;
      });

      setCreateCategory((prevData) => ({
        ...prevData,
        fields: newList,
      }));

      return newList;
    });
  };

  return (
    <div className="flex w-full justify-center h-auto">
      <div className="flex flex-col bg-white justify-center shadow-lg p-6 m-6 rounded-lg">
        <h3 className="font-bold text-center text-lg">Δημιουργία Οντότητας</h3>
        <input
          type="text"
          name="name"
          placeholder="Όνομα"
          className="input input-bordered input-primary my-3 w-full"
          value={createCategory.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Περιγραφή"
          className="input input-bordered input-primary my-3 w-full"
          value={createCategory.description}
          onChange={handleChange}
        />
        <h2 className="font-bold text-center my-4 text-lg">πεδία</h2>

        {/* <input
          type="password"
          name="password"
          placeholder="Κωδικός"
          className="input input-bordered input-primary my-3 w-full"
          value={createUser.user.password}
          onChange={handleInputChange}
        />
        <label className="label cursor-pointer">
          <span className="label-text">Υποχρεωτικό πεδίο</span>
          <input
            type="checkbox"
            className={`toggle ${isRequired ? "toggle-primary" : ""}`}
            onClick={() => setIsRequired(!isRequired)}
          />
        </label>
        <ArrowDropDown name={"Tύπος Πεδίου"} data={["κείμενο", "αριθμός"]} updateData={updateType} /> */}
        <div className="max-h-48 overflow-y-auto scrollbar-w-2 scrollbar-thumb-primary scrollbar-track-primary">
          {fieldList.map((field) => (
            <div key={field.id}>
              <input
                type="text"
                name={`${field.name}`}
                placeholder="Όνομα πεδίου"
                className="input input-bordered input-primary my-3 w-full"
                value={field.name}
                onChange={(e) =>
                  handleInputChange(field.id, "name", e.target.value)
                }
              />
              <label className="label cursor-pointer">
                <span className="label-text">Υποχρεωτικό πεδίο</span>
                <input
                  type="checkbox"
                  className={`toggle ${
                    field.isRequired ? "toggle-primary" : ""
                  }`}
                  checked={field.isRequired}
                  onChange={(e) =>
                    handleInputChange(field.id, "isRequired", e.target.checked)
                  }
                />
              </label>
              <ArrowDropDown
                name={"Tύπος Πεδίου"}
                data={["κείμενο", "αριθμός"]}
                updateData={(value) =>
                  handleInputChange(field.id, "type", value)
                }
              />
              <div className="divider"></div>
            </div>
          ))}
        </div>

        <button className="btn my-4 btn-secondary" onClick={handleAddField}>
          προσθηκη
        </button>
        <div className="flex flex-row justify-between space-x-14">
          <div className="modal-action">
            <button className="btn btn-primary" onClick={submitUser}>
              Δημιουργία
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

export default CategoryModal;

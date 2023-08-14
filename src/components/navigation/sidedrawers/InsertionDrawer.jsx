import React, { useEffect, useReducer, useState } from "react";
import {
  useCreateEntry,
  useSelectCategory,
  useInsertStore,
  useUpdateButton,
  useUpdateEntry,
} from "../../../state/AppState";
import {
  createEntryService,
  updateEntryService,
} from "../../../services/EntriesService";
import { useMutation } from "@tanstack/react-query";
import { getProfileQ } from "../../../queries/ProfilesQueries";
import ArrowDropDown from "../../utils/ArrowDropDown";
import CloseButton from "../../CloseButton";
import ImageUpload from "../../utils/ImageUpload";

const InsertionDrawer = () => {
  const createEntry = useCreateEntry((state) => state);
  const selectCategory = useSelectCategory((state) => state.selectCategory);
  const updateBtn = useUpdateButton((state) => state.updateButtonState);
  const toggleBtnState = useUpdateButton(
    (state) => state.toggleUpdateButtonState
  );

  const toggleInsert = useInsertStore((state) => state);
  const updateEntryId = useUpdateEntry((state) => state.entryId);

  const { data, refetch, isLoading } = getProfileQ(selectCategory?.pub_id);

  // console.log(selectCategory);
  const [fieldList, setFieldList] = useState(
    selectCategory
      ? selectCategory.fields.map((field) => {
          return {
            id: field.id,
            name: field.name,
            value: "",
          };
        })
      : []
  );

  useEffect(() => {
    console.log(createEntry);
    if (updateBtn && createEntry.entry.data) {
      const data = createEntry.entry.data;
      // console.log(data);

      setFieldList((prevList) => {
        const newList = data.map((field) => {
          return {
            id: field.id,
            name: field.name,
            value: field.value,
          };
        });

        createEntry.updateEntry({
          ...createEntry.entry,
          data: newList,
        });

        // console.log(newList)
        return newList;
      });
    }
  }, [updateBtn]);

  useEffect(() => {
    if (!updateBtn) {
      setFieldList(
        selectCategory
          ? selectCategory.fields.map((field) => {
              return {
                id: field.id,
                name: field.name,
                value: "",
              };
            })
          : []
      );
    }
  }, [selectCategory]);

  const handleFieldsChange = (id, name, value) => {
    if (!id) {
      return;
    }
    // const dt = )
    // console.log(dt);
    setFieldList((prevList) => {
      const newList = prevList.map((field) => {
        if (field.id === id) {
          return { ...field, [name]: value };
        }
        return field;
      });

      createEntry.updateEntry({
        ...createEntry.entry,
        data: newList,
      });

      // console.log(newList)
      return newList;
    });
  };

  // useEffect(() => {
  //   const { name, address, lat, long, color, data } = createEntry.entry;
  //   // Logic to update the fields based on the updated entry
  //   console.log(data);
  // }, [createEntry.entry]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    createEntry.updateEntry({ [name]: value });
  };

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const save = useMutation(createEntryService, {
    onSuccess: (data) => {
      console.log("Success");
      // forceUpdate();
      createEntry.reset();
      createEntry.updateEntry({
        ...createEntry.entry,
        data: fieldList,
      });
    },
  });

  const update = useMutation(updateEntryService, {
    onSuccess: (data) => {
      console.log("Success");
      // closeModal();
      toggleBtnState(false);
    },
  });

  const submitEntry = () => {
    createEntry.updateEntry({
      ...createEntry.entry,
      category: selectCategory.pub_id,
    });

    // console.log(createEntry.entry)
    if (createEntry.entry.category === "") {
      return;
    }

    console.log(createEntry.entry);
    if (updateBtn && updateEntryId) {
      const entryData = createEntry.entry;
      const reqData = {
        entryId: updateEntryId,
        entryData,
      };
      update.mutateAsync(reqData);
    } else {
      save.mutateAsync(createEntry.entry);
    }
  };

  return (
    <div className="flex-col h-100 bg-base-100 p-5">
      <div className="flex  w-full h-8 content-end justify-center items-center rounded-lg mb-2">
        ΚΑΤΑΧΩΡΗΣΗ
        <CloseButton
          onClick={() => {
            toggleInsert.updateToggleInsert(false);
            toggleBtnState(false);
            // var a = document.getElementById("insertLoc");
            // a.click();
          }}
        ></CloseButton>
      </div>
      <input
        type="text"
        name="address"
        placeholder="Διεύθυνση"
        className="input input-bordered input-primary  w-full"
        value={createEntry.entry.address}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Όνομα"
        className="input input-bordered input-primary my-3 w-full"
        value={createEntry.entry.name}
        onChange={handleInputChange}
      />
      <div className="flex flex-col">
        <label className="w-full max-w-xs ">Γεωγραφικό Μήκος</label>
        <input
          type="number"
          name="lat"
          placeholder="lat"
          className="input input-bordered input-primary  w-full "
          value={createEntry.entry.lat}
          onChange={handleInputChange}
        />
        <label>Γεωγραφικό Πλάτος</label>

        <input
          type="number"
          name="lng"
          placeholder="lng"
          className="input input-bordered input-primary  w-full "
          value={createEntry.entry.long}
          onChange={handleInputChange}
        />
      </div>
      <ArrowDropDown
        name="Ειδος"
        data={data ? data.map((d) => d.name) : ["Δεν υπάρχει Είδος"]}
        updateData={() => {}}
      />
      {selectCategory &&
        selectCategory.fields.map((field, index) => {
          return (
            <>
              <label>{field.name}</label>
              <input
                key={index}
                type="text"
                name={field.name}
                placeholder={field.name}
                className="input input-bordered input-primary w-full "
                value={field.value}
                // createEntry.entry.fields
                onChange={(e) =>
                  handleFieldsChange(field.id, "value", e.target.value)
                }
              />
            </>
          );
        })}
        <div className="my-9">
          <div className="my-2">Επιλογές Μάρκερ</div>
        <ImageUpload />
        {/* </div>
      <div className="my-5"> */}
        <input
          type="color"
          name="color"
          placeholder="color"
          value={createEntry.entry.color}
          className="input input-bordered input-primary my-3 w-full "
          onChange={handleInputChange}
        />
      </div>

      
      <div className="flex ">
        <button
          className=" stratis btn btn-primary text-white mt-7"
          onClick={submitEntry}
        >
          Αποθηκευση
        </button>
      </div>
    </div>
  );
};

export default InsertionDrawer;

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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfileQ } from "../../../queries/ProfilesQueries";
import ArrowDropDown from "../../utils/ArrowDropDown";
import CloseButton from "../../CloseButton";
import ImageUpload from "../../utils/ImageUpload";
import ImageUploadMultiple from "../../utils/ImageUploadMultiple";
import { getEntriesQ } from "../../../queries/EntriesQueries";

const InsertionDrawer = () => {
  const createEntry = useCreateEntry((state) => state);
  const selectCategory = useSelectCategory((state) => state.selectCategory);
  const updateBtn = useUpdateButton((state) => state.updateButtonState);
  const toggleBtnState = useUpdateButton(
    (state) => state.toggleUpdateButtonState,
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
      : [],
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
          : [],
      );
    }
  }, [selectCategory]);

  const handleFieldsChange = (id, name, value) => {
    if (!id) {
      return;
    }
    // const dt = )
    console.log(value);
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

      console.log(newList);
      return newList;
    });
  };

  // useEffect(() => {
  //   const { name, address, lat, long, color, data } = createEntry.entry;
  //   // Logic to update the fields based on the updated entry
  //   console.log(data);
  // }, [createEntry.entry]);

  const handleInputChange = (e) => {
    
    const { name, value } = e.name ? e : e.target;
    createEntry.updateEntry({ [name]: value });
    setColor(e.value);
  };

  // const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const save = useMutation(createEntryService, {
    onSuccess: (data) => {
      console.log("Success");
      // forceUpdate();
      refetch_e();
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
      refetch_e();
      toggleBtnState(false);
    },
  });

  const { data_e, refetch_e, isLoading_e } = getEntriesQ(selectCategory?.pub_id);

  const queryClient = useQueryClient();

  const setProfileData = (profile_a) => {
    console.log("hello profile");
    console.log(profile_a);
    let prof_data = null;
    if(!Array.isArray(data)) {
      return;
    }
    data.forEach(profile => {
      if(profile.data !== {}) {
        console.log(JSON.parse(profile.data));
        console.log(profile);
        prof_data = JSON.parse(profile.data);
      }
    })
    
    // handleInputChange({name: "color", value: profile_a.color})
    createEntry.updateEntry({ color: profile_a.color });
    setColor(profile_a.color);


    selectCategory.fields.forEach((field) => {
      console.log(`Profile id ${profile_a.id}`);
      console.log(`Field id ${field.id}`);
      const id = profile_a.data ? prof_data.find((obj) => obj.id === field.id) : null;
      if(id) {
        handleFieldsChange(field.id, "value", id.value);
      }
    });
  };

  const [color, setColor] = useState(createEntry.entry.color);

  useEffect(() => {
    console.log(createEntry.entry);
  }, [createEntry.entry])

  useEffect(() => {
    if(!color) {
      return;
    }
    createEntry.updateEntry({ ["color"]: color});
  }, [color]);

  const submitEntry = () => {
    createEntry.updateEntry({
      ...createEntry.entry,
      category: selectCategory.pub_id,
      color: createEntry.entry.color
    });

    // console.log(createEntry.entry)
    if (createEntry.entry.category === "") {
      console.log("No category");
      console.log(createEntry.entry.category);
      console.log({
        ...createEntry.entry,
        category: selectCategory.pub_id,
        color: createEntry.entry
      });
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
    queryClient.invalidateQueries(["entries"]);
    // refetch_e();
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
        data={data ? data  : ["Δεν υπάρχει Είδος"]} //.map((d) => {return {name: d.name, icon: d.icon }})
        updateData={setProfileData}
      />
      {/* {selectCategory &&
        selectCategory.fields.map((field, index) => {
          return (
            <div key={field.id}>
            <label>{field.name}</label>
            <input
              type="text"
              name={field.name}
              placeholder={field.name}
              className="input input-bordered input-primary w-full"
              value={field.value}
              onChange={(e) => handleFieldsChange(field.id, "value", e.target.value)}
            />
          </div>
          );
        })} */}
      {selectCategory &&
        fieldList.map((field, index) => {
          // Use fieldList instead of selectCategory.fields
          return (
            <div key={field.id}>
              <label>{field.name}</label>
              <input
                type="text"
                name={field.name}
                placeholder={field.name}
                className="input input-bordered input-primary w-full"
                value={field.value}
                onChange={(e) =>
                  handleFieldsChange(field.id, "value", e.target.value)
                }
              />
            </div>
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
          // value={createEntry.entry.color}
          value={color}
          className="input input-bordered input-primary my-3 w-full "
          onChange={handleInputChange}
        />
      </div>
      <div className="my-9">
        <div className="my-2">Φωτογραφίες καταχώρησης</div>
        <ImageUploadMultiple />
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

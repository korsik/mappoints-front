import React, { useEffect, useState } from "react";
import {
  useCreateProfile,
  useProfileInStore,
  useSelectCategory,
} from "../../../state/AppState";
import { useMutation } from "@tanstack/react-query";
import { createProfilesService } from "../../../services/profileService";

const ProfileInsertDrawer = () => {
  const fruits = ["Apple", "Mango", "Banana", "GFG"];
  const createProfile = useCreateProfile((state) => state);

  const selectCategory = useSelectCategory((state) => state.selectCategory);

  console.log(selectCategory);
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
  }, [selectCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    createProfile.updateProfile({ [name]: value });
  };



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

      createProfile.updateProfile({
        ...createProfile.profile,
        data: newList,
      });

      // console.log(newList)
      return newList;
    });
  };

  const save = useMutation(createProfilesService, {
    onSuccess: (data) => {
      console.log("Success");
      window.location.reload(true);
    },
  });

  const submitEntry = () => {
    createProfile.updateProfile({
      ...createProfile.entry,
      category: createProfile.pub_id,
    });

    // console.log(createEntry.entry)
    if (createProfile.profile.category === "") {
      return;
    }

    console.log(createProfile.profile);
    save.mutateAsync(createProfile.profile);
  };

  const fields =
    selectCategory !== null
      ? selectCategory.fields.map((field, index) => {
          return (
            <input
              key={index}
              type="text"
              name={field.name}
              placeholder={field.name}
              className="input input-bordered input-primary my-3 w-full max-w-xs"
              value={createProfile.profile.fields}
              onChange={(e) =>
                handleFieldsChange(field.id, "value", e.target.value)
              }
            />
          );
        })
      : [];

  // if (toggleProfile) {
  return (
    <div className="flex-row h-screen overflow-auto">
      <div className="flex bg-primary w-full h-8 content-end justify-center items-center rounded-lg">
        ΚΑΤΑΧΩΡΗΣΗ ΠΡΟΦΙΛ
      </div>
      <input
        type="text"
        name="name"
        placeholder="Όνομα"
        className="input input-bordered input-primary my-3 w-full max-w-xs"
        value={createProfile.profile.name}
        onChange={handleInputChange}
      />
      {fields}
      <button className="btn btn-secondary mt-7 m-2" onClick={submitEntry}>
        Αποθηκευση
      </button>
    </div>
  );
  // }
};

export default ProfileInsertDrawer;

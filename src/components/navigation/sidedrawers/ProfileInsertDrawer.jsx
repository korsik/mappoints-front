import React, { useEffect, useState } from "react";
import {
  useCreateProfile,
  useProfileInStore,
  useSelectCategory,
  useSuccessModal,
} from "../../../state/AppState";
import { useMutation } from "@tanstack/react-query";
import { createProfilesService } from "../../../services/profileService";
import ImageUpload from "../../utils/ImageUpload";
import CloseButton from "../../CloseButton";
import SuccessModal from "../../modals/SuccessModal";

const ProfileInsertDrawer = () => {
  const fruits = ["Apple", "Mango", "Banana", "GFG"];
  const createProfile = useCreateProfile((state) => state);
  const toggleProfile = useProfileInStore((state) => state);
  const selectCategory = useSelectCategory((state) => state.selectCategory);

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
  }, [selectCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    createProfile.updateProfile({ [name]: value });
  };

  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    setImage(selectedImage);

    // console.log(selectedImage);

    
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

  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const closeModal = () => {
    setIsSuccessModal(false);
  }

  const save = useMutation(createProfilesService, {
    onSuccess: (data) => {
      console.log("Success");
      // window.location.reload(true);
      setIsSuccessModal(true);
    },
  });

  const submitEntry = async () => {
    createProfile.updateProfile({
      ...createProfile.profile,
      category: selectCategory.pub_id,
    });

    // console.log(createEntry.entry)
    if (createProfile.profile.pub_id === "") {
      // console.log({
      //   ...createProfile.profile,
      //   category: selectCategory.pub_id,
      // });
      // console.log("Papakia")
      return;
    }

    const jsonPayload = {
      ...createProfile.profile,
      category: selectCategory.pub_id,//,
    }

    const selectedImage = image;

    // console.log(createProfile.profile);
    
    const formData = new FormData();
    formData.append('file', selectedImage);
    // formData.append('jsonPayload', JSON.stringify(jsonPayload));
    formData.append('name', jsonPayload.name);
    formData.append('data', JSON.stringify(jsonPayload.data));
    formData.append('color', jsonPayload.color);
    formData.append('category', selectCategory.pub_id);

    // Object.keys(jsonPayload).forEach((key) => {
    //   const value = jsonPayload[key];
    
    //   if (Array.isArray(value)) {
    //     value.forEach((item, index) => {
    //       Object.keys(item).forEach((itemKey) => {
    //         formData.append(`${key}[${index}].${itemKey}`, item[itemKey]);
    //       });
    //     });
    //   } else {
    //     formData.append(key, value);
    //   }
    // });

    

    try {
      await save.mutateAsync(formData);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    // save.mutateAsync({
    //   ...createProfile.profile,
    //   category: selectCategory.pub_id,
    // });
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
  const CloseButtonE = () => {
    var a = document.getElementById("insertLoc");
    a.click();
  };
  const CustomButton = ({ onPress }) => {
    return (
      <button
        className="x_stratos"
        type="button"
        onClick={() => {
          var a = document.getElementById("insertLoc");
          a.click();
        }}
      >
        <b>X</b>
      </button>
    );
  };
  // if (toggleProfile) {
  return (
    <div className="flex-row h-screen overflow-auto">
      <div className="flex bg-base-100 w-full h-8 content-end justify-center items-center rounded-lg">
        ΚΑΤΑΧΩΡΗΣΗ ΕΙΔΟΥΣ
        <CloseButton
          onClick={() => {
            toggleProfile.updateToggleProfileInsert(false);
            // var a = document.getElementById("insertLoc");
            // a.click();
          }}
        ></CloseButton>
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

      <div className="my-9">
        <div className="my-2">Επιλογές Μάρκερ</div>
        <ImageUpload setImageForSave={handleImageUpload} />
        {/* </div>
      <div className="my-5"> */}
        <input
          type="color"
          name="color"
          placeholder="color"
          value={createProfile.profile.color}
          className="input input-bordered input-primary my-3 w-full "
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <button
          className=" stratis btn btn-primary text-white mt-7"
          onClick={submitEntry}
        >
          Αποθηκευση
        </button>
      </div>

      {isSuccessModal && (
        <SuccessModal message="Profile created Succesfully" modalOpen={closeModal} />
      )}
      
    </div>
  );
  // }
};

export default ProfileInsertDrawer;

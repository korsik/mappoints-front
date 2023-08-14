import React, { useState } from 'react';

const ImageUpload = ({setImageForSave}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setImageForSave(event);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" />
      )}
    </div>
  );
};

export default ImageUpload;
import React, { useState } from 'react';

const ImageUploadMultiple = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files);
    setSelectedImages([...selectedImages, ...newImages]);
  };

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <div>
        {selectedImages.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageUploadMultiple;
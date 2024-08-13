// components/ImageUploader.js
import React from 'react';

const ImageUploader = ({ addImage }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        addImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
    </div>
  );
};

export default ImageUploader;

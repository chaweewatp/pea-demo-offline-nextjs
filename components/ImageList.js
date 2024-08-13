// components/ImageList.js
import React from 'react';

const ImageList = ({ imageList }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {imageList.map((imageSrc, index) => (
        <div key={index} className="w-64 h-64 overflow-hidden border rounded-md">
          <img src={imageSrc} alt={`Thumbnail ${index + 1}`} className="object-cover w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default ImageList;

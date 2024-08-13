// app/tasks/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ImageUploader from '../../../components/ImageUploader';
import ImageList from '../../../components/ImageList';

export default function TaskPage() {
  const { id } = useParams(); // Use `useParams` to get the task ID
  const [imageList, setImageList] = useState([]);

  // Load images for the specific task from localStorage
  useEffect(() => {
    if (id) {
      const storedImages = JSON.parse(localStorage.getItem(`task_${id}_images`)) || [];
      setImageList(storedImages);
    }
  }, [id]);

  // Function to add an image to the task-specific list
  const addImage = (newImage) => {
    const updatedImages = [...imageList, newImage];
    setImageList(updatedImages);
    localStorage.setItem(`task_${id}_images`, JSON.stringify(updatedImages));
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Task {id} - Upload and Display Photos</h1>
      <ImageUploader addImage={addImage} />
      <h2 className="text-xl font-semibold mt-8 mb-4">Image Thumbnails</h2>
      <ImageList imageList={imageList} />
    </div>
  );
}

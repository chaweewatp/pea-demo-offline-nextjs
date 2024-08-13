// app/tasks/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ImageUploader from '../../../components/ImageUploader';
import ImageList from '../../../components/ImageList';

export default function TaskPage() {
  const { id } = useParams();
  const [imageList, setImageList] = useState([]);
  const [task, setTask] = useState({ name: '' });
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect only runs on the client side
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial check
    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (id) {
      if (isOnline) {
        fetch(`/api/tasks/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setTask(data.task || { name: '' });
            // Preserve existing images or set new ones
            const existingImages = JSON.parse(localStorage.getItem(`task_${id}_images`)) || [];
            const fetchedImages = data.images || [];
            const updatedImages = [...existingImages, ...fetchedImages];
            setImageList(updatedImages);
            localStorage.setItem(`task_${id}_images`, JSON.stringify(updatedImages));
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching task data:', error);
            setIsLoading(false);
          });
      } else {
        const storedTask = JSON.parse(localStorage.getItem(`task_${id}`)) || { name: '' };
        const storedImages = JSON.parse(localStorage.getItem(`task_${id}_images`)) || [];
        setTask(storedTask);
        setImageList(storedImages);
        setIsLoading(false);
      }
    }
  }, [id, isOnline]);

  const addImage = (newImage) => {
    const updatedImages = [...imageList, newImage];
    setImageList(updatedImages);
    localStorage.setItem(`task_${id}_images`, JSON.stringify(updatedImages));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Task {id} - {task.name || 'No Name'}</h1>
      <ImageUploader addImage={addImage} />
      <h2 className="text-xl font-semibold mt-8 mb-4">Image Thumbnails</h2>
      <ImageList imageList={imageList} />
    </div>
  );
}

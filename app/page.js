// app/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const tasks = [
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' },
  { id: 3, name: 'Task 3' },
];

export default function TaskList() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
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

  const sendData = async () => {
    if (!isOnline) {
      alert('No internet connection. Please try again later.');
      return;
    }

    try {
      const taskData = tasks.map((task) => {
        const images = JSON.parse(localStorage.getItem(`task_${task.id}_images`)) || [];
        return { id: task.id, name: task.name, images };
      });

      // Simulate sending data to the server
      const response = await fetch('/api/sendData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        // Clear localStorage after successful data transfer
        tasks.forEach((task) => {
          localStorage.removeItem(`task_${task.id}_images`);
        });
        alert('Data sent successfully and tasks deleted.');
      } else {
        alert('Failed to send data. Please try again.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <ul className="list-disc pl-5">
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            <Link href={`/tasks/${task.id}`} className="text-blue-600 hover:underline">
              {task.name}
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={sendData}
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${
          !isOnline ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
        disabled={!isOnline}
      >
        Send All Data
      </button>
    </div>
  );
}

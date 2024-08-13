// pages/api/tasks/[id].js
export default async function handler(req, res) {
    const { id } = req.query;
  
    if (req.method === 'GET') {
      try {
        // Fetch task details from database or other data source
        // Example:
        // const task = await fetchTaskFromDatabase(id);
        const task = { id, name: `Task ${id}` }; // Replace with actual data fetching
        const images = JSON.parse(localStorage.getItem(`task_${id}_images`)) || [];
  
        res.status(200).json({ task, images });
      } catch (error) {
        console.error('Error fetching task details:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
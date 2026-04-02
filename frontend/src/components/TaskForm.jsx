import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '' });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        deadline: editingTask.deadline,
      });
    } else {
      setFormData({ title: '', description: '', deadline: '' });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    if (editingTask) {
      const response = await axiosInstance.put(`/api/tasks/${editingTask._id}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
    } else {
      const response = await axiosInstance.post('/api/tasks', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks([...tasks, response.data]);
    }
    setEditingTask(null);
    setFormData({ title: '', description: '', deadline: '' });
    // } catch (error) {
    //   alert('Failed to save task.');
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingTask ? 'Your Form Name: Edit Operation' : 'Your Form Name: Create Operation'}</h1>
      <input
        type="text"
        placeholder="Washing Machine"
        value={formData.itemName}
        onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <select>
        <option value="livingRoom" selected>Living room</option>
        <option value="kitchen">Kitchen</option>
        <option value="bathRoom">Bath room</option>
        <option value="bedRoom">Bed room</option>
      </select>

      <input
        type="price"
        placeholder="$1.000"
        value={formData.itemPrice}
        onChange={(e) => setFormData({ ...formData, itemPrice: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="ABC123D"
        value={formData.modelNum}
        onChange={(e) => setFormData({ ...formData, modelNum: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="S/N123456789"
        value={formData.serialNum}
        onChange={(e) => setFormData({ ...formData, serialNum: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="date"
        value={formData.purchaseDate}
        onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingTask ? 'Update Button' : 'Create Button'}
      </button>
    </form>
  );
};

export default TaskForm;

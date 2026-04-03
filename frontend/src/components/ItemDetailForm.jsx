import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ItemDetailForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    itemPrice: "",
    modelNum: "",
    serialNum: "",
    purchaseDate: "",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        itemName: editingTask.itemName || "",
        category: editingTask.category || "",
        itemPrice: editingTask.itemPrice || "",
        modelNum: editingTask.modelNum || "",
        serialNum: editingTask.serialNum || "",
        purchaseDate: editingTask.purchaseDate || "",
      });
    } else {
      setFormData({
        itemName: "",
        category: "",
        itemPrice: "",
        modelNum: "",
        serialNum: "",
        purchaseDate: "",
      });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await axiosInstance.put(
          `/api/tasks/${editingTask._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          });

        setTasks(tasks.map((task) =>
          (task._id === response.data._id ? response.data : task)));
      } else {
        const response = await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks([...tasks, response.data]);
      }
      setEditingTask(null);
      setFormData({
        itemName: "",
        category: "",
        itemPrice: "",
        modelNum: "",
        serialNum: "",
        purchaseDate: "",
      });
    } catch (error) {
      alert('Failed to save task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">ITM0001:ItemNum</h1>
        <h1 className="text-2xl font-bold mb-4">{editingTask ? 'Item Name: Edit Operation' : 'Item Name: Create Operation'}</h1>
        <h1 className="text-2xl font-bold mb-4">{editingTask ? 'Category: Edit Operation' : ''}</h1>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Delete
        </button>
      </div>

      <input
        type="text"
        placeholder="Washing Machine"
        value={formData.itemName}
        onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">--Please choose a category--</option>
        <option value="livingRoom">Living room</option>
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
        Cancel
      </button>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingTask ? 'Update Button' : 'Create Button'}
      </button>
    </form>
  );
};

export default ItemDetailForm;

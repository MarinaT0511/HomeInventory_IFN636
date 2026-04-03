import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ItemDetailForm from '../components/ItemDetailForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';
import { useParams } from "react-router-dom";

const ItemDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [modelNum, setModelNum] = useState("");
    const [serialNum, setSerialNum] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            // try {
            const response = await axiosInstance.get('/api/tasks', {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setTasks(response.data);
            // } catch (error) {
            //     alert('Failed to fetch tasks.');
            // }
        };

        fetchTasks();
    }, [user]);

    return (
        <div className="container mx-auto p-6">

            <div>
                <h1>Item Detail</h1>
                <p>ID: {id}</p>
            </div>

            {/* const[category, setCategory] = useSatate(""); */}
            <ItemDetailForm
                itemName={itemName}
                setItemName={setItemName}
                category={category}
                setCategory={setCategory}
                itemPrice={itemPrice}
                setItemPrice={setItemPrice}
                modelNum={modelNum}
                setModelNum={setModelNum}
                serialNum={serialNum}
                setSerialNum={setSerialNum}
                purchaseDate={purchaseDate}
                setPurchaseDate={setPurchaseDate}
                tasks={tasks}
                setTasks={setTasks}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
            />
            <TaskList
                tasks={tasks}
                setTasks={setTasks}
                setEditingTask={setEditingTask}
            />
        </div>
    );
};

export default ItemDetail;

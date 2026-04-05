import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ItemDetailForm from '../components/ItemDetailForm';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const ItemDetail = ({ mode }) => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [item, setItem] = useState(null);
    const isCreateMode = mode === 'create';
    const isViewMode = mode === 'view';
    const isEditMode = mode === 'edit';
    console.log("params itemId:", itemId);
    console.log("mode:", mode);
    console.log("user:", user);
    console.log("token:", user?.token);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axiosInstance.get(`/api/item/${itemId}`);
                console.log('Items detail is found:', response.data);
                setItem(response.data);
            } catch (error) {
                console.log('Items detail is failes:', error);
                alert('Failed to fetch item.');
            }
        };

        if (!isCreateMode && itemId) {
            fetchItem();
        }
    }, [itemId, user?.token, isCreateMode]);

    const handleCreate = async (formData) => {
        console.log("handleCreate called", formData);
        try {

            const response = await axiosInstance.post(`/api/item`, formData);
            alert('Item created successfully.');
            navigate(`/inventory/item/${response.data.itemId}`);
        } catch (error) {
            console.error(error);
            alert('Failed to create item.');
        }
    };

    const handleUpdate = async (formData) => {
        console.log("handleDelete called");
        try {

            const response = await axiosInstance.put(`/api/item/${itemId}`, formData);
            setItem(response.data);
            alert('Item updated successfully.');
            navigate(`/inventory/item/${itemId}`);
        } catch (error) {
            console.error(error);
            alert('Failed to update item.');
        }
    };

    const handleDelete = async () => {
        console.log("handleDelete called");
        try {
            await axiosInstance.delete(`/api/item/${itemId}`);
            alert('Item deleted successfully.');
            navigate(`/inventory`);
        } catch (error) {
            console.error(error);
            alert('Failed to delete item.');
        }
    };

    const handleCancel = () => {
        if (isCreateMode) {
            navigate('/inventory');
        } else if (isEditMode) {
            navigate(`/inventory/item/${itemId}`);
        } else {
            navigate('/inventory');
        }
    };

    const handleEdit = () => {
        console.log("handleEdit called");
        navigate(`/inventory/item/${itemId}/edit`);
    };

    return (

        <div className="container mx-auto p-6">
            {/* const[category, setCategory] = useSatate(""); */}
            <ItemDetailForm
                initialData={item}
                onSubmit={isCreateMode ? handleCreate : handleUpdate}
                onDelete={handleDelete}
                onCancel={handleCancel}
                onEdit={handleEdit}
                isEditMode={isEditMode}
                readOnly={isViewMode}
            />
        </div>
    );
};

export default ItemDetail;

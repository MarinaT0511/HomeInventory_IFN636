import ItemList from "../components/ItemList";
import { useNavigate } from 'react-router-dom';

function Inventory() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

    };

    return (
        <div>
            <div style={{ padding: "40px" }}>
                <div className='flex justify-end' >
                    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded" style={{ boxShadow: 'none' }}>
                        <button
                            type="button"
                            onClick={() => navigate(`/inventory/item/new`)}
                            className="w-full bg-blue-600 text-white p-2 rounded">
                            Add New Item
                        </button>
                    </form>
                </div>
                <div class='h5'>Inventory</div>
                <ItemList />
            </div>
        </div>
    );
}

export default Inventory;
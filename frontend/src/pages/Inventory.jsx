import ItemList from "../components/ItemList";
import { useNavigate } from 'react-router-dom';

function Inventory() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

    };

    return (
        <div>
            <div style={{ padding: "40px" }}>
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                    <button
                        type="button"
                        onClick={() => navigate(`/inventory/item/new`)}
                        className="w-full bg-blue-600 text-white p-2 rounded">
                        Add New Item
                    </button>
                </form>
                <ItemList />
            </div>
        </div>
    );
}

export default Inventory;
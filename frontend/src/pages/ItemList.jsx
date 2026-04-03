import Inventory from "../components/Inventory";

function ItemList() {
    const handleSubmit = async (e) => {

    };

    return (
        <div>
            <div style={{ padding: "40px" }}>
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                        Add New Item
                    </button>
                </form>
                <Inventory />
            </div>
        </div>
    );
}

export default ItemList;
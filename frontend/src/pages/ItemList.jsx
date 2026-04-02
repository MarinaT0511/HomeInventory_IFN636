import Inventory from "../components/Inventory";

function ItemList() {
    const handleSubmit = async (e) => {

    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                {/* <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full mb-4 p-2 border rounded"
                /> */}
                {/* <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full mb-4 p-2 border rounded"
                /> */}
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                    UPDATE
                </button>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                    DELETE
                </button>
            </form>
            <div style={{ padding: "40px" }}>
                <Inventory />
            </div>
        </div>
    );
}

export default ItemList;
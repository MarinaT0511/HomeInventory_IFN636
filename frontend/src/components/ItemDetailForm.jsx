import { useState, useEffect } from 'react';

const categoryMap = {
  C001: "livingRoom",
  C002: "kitchen",
  C003: "bathRoom",
  C004: "bedRoom",
};

const ItemDetailForm = ({
  initialData,
  onSubmit,
  onDelete,
  onCancel,
  onEdit,
  isEditMode,
  readOnly
}) => {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    shop: "",
    itemPrice: "",
    modelNum: "",
    serialNum: "",
    purchaseDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        itemName: initialData.itemName || "",
        category: categoryMap[initialData.category] || "",
        shop: initialData.shop || "",
        itemPrice: initialData.itemPrice || "",
        modelNum: initialData.modelNum || "",
        serialNum: initialData.serialNum || "",
        purchaseDate: initialData.purchaseDate
          ? initialData.purchaseDate.slice(0, 10)
          : '',
      });
    } else {
      setFormData({
        itemName: "",
        category: "",
        shop: "",
        itemPrice: "",
        modelNum: "",
        serialNum: "",
        purchaseDate: "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">
          {initialData?.itemId || "New Item"}
          : {readOnly ? "View Item"
            : isEditMode ? "Edit Item" : "Create Item"
          }
          {/* {initialData?.itemId || "New Item"} : {formData.itemName || ""} */}
        </h1>

        {isEditMode && (
          <button
            type="button"
            onClick={onDelete}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Delete
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Washing Machine"
        value={formData.itemName}
        readOnly={readOnly}
        onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <select
        value={formData.category}
        disabled={readOnly}
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
        type="text"
        placeholder="JB HI-FI"
        value={formData.shop}
        readOnly={readOnly}
        onChange={(e) => setFormData({ ...formData, shop: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="number"
        placeholder="$1.000"
        value={formData.itemPrice}
        readOnly={readOnly}
        onChange={(e) => setFormData({ ...formData, itemPrice: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="ABC123D"
        value={formData.modelNum}
        readOnly={readOnly}
        onChange={(e) => setFormData({ ...formData, modelNum: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="S/N123456789"
        value={formData.serialNum}
        readOnly={readOnly}
        onChange={(e) => setFormData({ ...formData, serialNum: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="date"
        value={formData.purchaseDate}
        disabled={readOnly}
        onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="button"
        onClick={onCancel}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {readOnly ? 'Go back to inventory' : 'Cancel'}
      </button>

      {readOnly && (
        <button type="button"
          onClick={onEdit}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Change the detail
        </button>
      )}

      {!readOnly && (
        <button type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {isEditMode ? 'Update' : 'Create'}
        </button>
      )}
    </form>
  );
};

export default ItemDetailForm;

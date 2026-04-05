import { useState, useEffect } from 'react';

const categoryMap = {
  C001: "livingRoom",
  C002: "kitchen",
  C003: "bathRoom",
  C004: "bedRoom",
};

const reverseCategoryMap = {
  livingRoom: "C001",
  kitchen: "C002",
  bathRoom: "C003",
  bedRoom: "C004",
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
    price: "",
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
        price: initialData.price || "",
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
        price: "",
        modelNum: "",
        serialNum: "",
        purchaseDate: "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submit called");
    console.log("formData =", formData);
    console.log("form submit called");


    onSubmit({
      ...formData,
      category: reverseCategoryMap[formData.category] || "",
      price: formData.price === "" ? "" : Number(formData.price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">
          {initialData?.itemId || "New Item"} : {formData.itemName || ""}
        </h1>

        {isEditMode && (
          <button
            type="button"
            onClick={onDelete}
            className="w-full bg-blue-600 text-white p-2 rounded "
            style={{ width: "10%" }}
          >
            Delete
          </button>
        )}
      </div>

      <label>Item Name</label>
      <input
        type="text"
        placeholder="Washing Machine"
        value={formData.itemName}
        readOnly={readOnly}
        onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <label>Category</label>
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

      <label>Shop</label>
      <input
        type="text"
        placeholder="JB HI-FI"
        value={formData.shop}
        readOnly={readOnly}
        onChange={(e) => setFormData({ ...formData, shop: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <label>Price</label>
      <input
        type="number"
        placeholder="$1.000"
        value={formData.price}
        readOnly={readOnly}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label>Model Number</label>
      <input
        type="text"
        placeholder="ABC123D"
        value={formData.modelNum}
        readOnly={readOnly}
        onChange={(e) => setFormData({ ...formData, modelNum: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label>Serial Number</label>
      <input
        type="text"
        placeholder="S/N123456789"
        value={formData.serialNum}
        readOnly={readOnly}
        onChange={(e) => setFormData({ ...formData, serialNum: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label>Purchase Date</label>
      <input
        type="date"
        value={formData.purchaseDate}
        disabled={readOnly}
        onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <div className="flex justify-center items-center" style={{ width: "50%" }}>
        <button type="button"
          onClick={onCancel}
          className="w-full bg-blue-600 text-white p-2 rounded mx-2 my-2"
        >
          {readOnly ? 'Go back to inventory' : 'Cancel'}
        </button>

        {readOnly && (
          <button type="button"
            onClick={onEdit}
            className="w-full bg-blue-600 text-white p-2 rounded mx-2 my-2"
          >
            Change the detail
          </button>
        )}

        {!readOnly && (
          <button type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mx-2 my-2"
          >
            {isEditMode ? 'Update' : 'Create'}
          </button>
        )}
      </div>
    </form >
  );
};

export default ItemDetailForm;

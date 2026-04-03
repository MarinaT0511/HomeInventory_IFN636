import React, { useState } from "react";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import "../itemlist.css";
import { useNavigate } from "react-router-dom";

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

function ItemList() {
    const navigate = useNavigate();
    const [rowData] = useState([
        { id: "01", itemName: "Model Y", category: "living", price: 64950, lastUpdate: "01/04/2026" },
        { id: "02", itemName: "F-Series", category: "living", price: 33850, lastUpdate: "01/04/2026" },
        { id: "03", itemName: "Corolla", category: "kitchen", price: 29600, lastUpdate: "01/04/2026" },
    ]);

    const [colDefs] = useState([
        { field: "id", headerName: "ID", editable: false },
        { field: "itemName", headerName: "Item Name", editable: false },
        { field: "category", headerName: "Category", editable: false },
        { field: "price", headerName: "Price", editable: false },
        { field: "lastUpdate", headerName: "Last Update", editable: false },
        {
            headerName: "Actions",
            width: 120,
            cellClass: "actions-cell",
            cellRenderer: (params) => (
                <div className="actions-inner">
                    <button
                        className="action-btn"
                        onClick={() => navigate(`/item/${params.data.id}`)}
                    >›</button>
                </div>
            ),
        }
    ]);

    return (
        <AgGridProvider modules={[AllCommunityModule]}>
            <div style={{ width: "100%", height: "400px" }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    suppressCellFocus={true}
                />
            </div>
        </AgGridProvider>
    );
}

export default ItemList;
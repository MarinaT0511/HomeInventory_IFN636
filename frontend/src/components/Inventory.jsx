import React, { useState } from "react";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import "../inventory.css";

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

function Inventory() {
    const [rowData] = useState([
        { id: "Tesla", itemName: "Model Y", category: "living", price: 64950, lastUpdate: "01/04/2026" },
        { id: "Ford", itemName: "F-Series", category: "living", price: 33850, lastUpdate: "01/04/2026" },
        { id: "Toyota", itemName: "Corolla", category: "kitchen", price: 29600, lastUpdate: "01/04/2026" },
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
            cellRenderer: () => (
                <div className="actions-inner">
                    <button className="action-btn">›</button>
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

export default Inventory;
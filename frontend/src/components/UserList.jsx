import React, { useState } from "react";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
// import "../inventory.css";

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

function UserList() {
    const [rowData] = useState([
        { id: "Tesla", userName: "Model Y", email: "living", itemNum: 64950, status: "active", lastUpdate: "01/04/2026" },
        { id: "Ford", userName: "F-Series", email: "living", itemNum: 33850, status: "active", lastUpdate: "01/04/2026" },
        { id: "Toyota", userName: "Corolla", email: "kitchen", itemNum: 29600, status: "active", lastUpdate: "01/04/2026" },
    ]);

    const [colDefs] = useState([
        { field: "id", headerName: "UserID", editable: false },
        { field: "userName", headerName: "Item Name", editable: false },
        { field: "email", headerName: "email", editable: false },
        { field: "itemNum", headerName: "itemNum", editable: false },
        { field: "status", headerName: "status", editable: false },
        { field: "lastUpdate", headerName: "Last Update", editable: false },
        {
            headerName: "Go to Detail",
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

export default UserList;
import React, { useState } from "react";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

function Inventory() {
    const [rowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    const [colDefs] = useState([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" },
    ]);

    return (
        <AgGridProvider modules={[AllCommunityModule]}>
            <div style={{ width: "100%", height: "400px" }}>
                <AgGridReact rowData={rowData} columnDefs={colDefs} />
            </div>
        </AgGridProvider>
    );
}

export default Inventory;
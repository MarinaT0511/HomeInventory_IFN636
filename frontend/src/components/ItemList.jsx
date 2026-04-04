// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import "../itemlist.css";
import { useNavigate } from "react-router-dom";

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

function ItemList() {
    const navigate = useNavigate();

    //setting to display DB data
    // const [rowData] = useState([

    //setting to display DB data
    const [rowData, setRowData] = useState([]);

    //setting field title 
    const [colDefs] = useState([
        { field: "itemId", headerName: "ID", editable: false },
        { field: "itemName", headerName: "Item Name", editable: false },
        { field: "category", headerName: "Category", editable: false },
        { field: "price", headerName: "Price", editable: false },
        { field: "lastUpdateDate", headerName: "Last Update", editable: false },
        {
            headerName: "Actions",
            width: 120,
            cellClass: "actions-cell",
            cellRenderer: (params) => (
                <div className="actions-inner">
                    <button
                        className="action-btn"
                        onClick={() => navigate(`/inventory/item/${params.data.itemId}`)}
                    >›</button>
                </div>
            ),
        }
    ]);

    useEffect(() => {
        console.log("useEffect is running");
        const fetchItem = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/item/itemlist");
                const data = await res.json();

                console.log("API response:", data);
                setRowData(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchItem();
    }, []);

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
import React, { useState, useEffect } from "react";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
// import "../inventory.css";

function UserList() {
    const navigate = useNavigate();
    //setting to display DB data
    const [rowData, setRowData] = useState([
    ]);

    //setting field title 
    const [colDefs] = useState([
        { field: "userId", headerName: "UserID", },
        { field: "name", headerName: "User Name" },
        { field: "email", headerName: "Email" },
        { field: "userStatus", headerName: "Status" },
        { field: "role", headerName: "Role" },
        {
            headerName: "Go to Detail",
            width: 120,
            cellClass: "actions-cell",
            cellRenderer: (params) => (
                <div className="actions-inner">
                    <button
                        className="action-btn"
                        onClick={() => navigate(`/profile/${params.data.userId}`)}
                    >›</button>
                </div>
            ),
        }
    ]);

    useEffect(() => {
        console.log("useEffect is running");
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/auth/userlist");
                const data = await res.json();

                console.log("API response:", data);
                setRowData(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsers();
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

export default UserList;
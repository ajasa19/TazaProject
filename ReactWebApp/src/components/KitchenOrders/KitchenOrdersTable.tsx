import React from "react";
import { useState } from "react";
import Axios from "axios";
import { useHistory } from 'react-router-dom';

//MUI Imports
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

var tempIdString = localStorage.getItem("profileId");
var profileId;
if (tempIdString)
    profileId = JSON.parse(tempIdString || '');

const KitchenTable = (props) => {
    const [kitchens, setKitchens] = useState<any[]>([]);

    React.useEffect(() => {
        Axios.get<any>("http://localhost:3001/kitchenOrders/getOrderBasic", {
            params: {
                userId: profileId,
            },
        }).then(
            (response) => {
                    setKitchens(response.data);
            }
        );
    }, []);

    const rows: GridRowsProp = kitchens;

    return (
        <DataGrid
            autoHeight
            disableSelectionOnClick
            rows={rows}
            columns={columns}
            getRowClassName={(params) =>
                `super-app-theme--${params.getValue(params.id, "status")}`
            }
        />
    );
};

const RenderViewInfoButton = (params) => {

    let history = useHistory();

    return (
        <strong>
            <Button
                variant="contained"
                color="info"
                size="small"
                onClick={() => {
                    history.push('/profile/KitchenOrders/KitchenOrdersDetails:' + params.id);
                }}
            >
                View Info
            </Button>
        </strong>
    );
};

const renderStatusButton = (params) => {
    if (params.row.status === "PICKUP") {
        return (
            <strong>
                <Button variant="contained" color="success" size="small">
                    {params.row.status}
                </Button>
            </strong>
        );
    } else if (params.row.status === "MOVING") {
        return (
            <strong>
                <Button variant="contained" color="success" size="small">
                    {params.row.status}
                </Button>
            </strong>
        );
    } else if (params.row.status === "UNREGISTERED") {
        return (
            <strong>
                <Button variant="contained" color="error" size="small">
                    {params.row.status}
                </Button>
            </strong>
        );
    } else if (params.row.status === "COOKING") {
        return (
            <strong>
                <Button variant="contained" color="warning" size="small">
                    {params.row.status}
                </Button>
            </strong>
        );
    }
    return;
};


const columns: GridColDef[] = [

    { field: "id", headerName: "Order id", minWidth: 50 },
    { field: "customerUserName", headerName: "Customer username", minWidth: 170 },
    { field: "driverUserName", headerName: "Driver username", minWidth: 170 },
    { field: "orderPrice", headerName: "Order price", minWidth: 100 },
    { field: "dropOffLocation", headerName: "Customer's address", minWidth: 350 },
    { field: "orderTimeplaced", headerName: "Order time placed", minWidth: 150 },
    { field: "orderTimePickup", headerName: "Order time finished", minWidth: 150 },
    { field: "orderQty", headerName: "Number of items", minWidth: 150 },

    {
        field: "orderStatusId",
        headerName: "Status",
        minWidth: 150,
        align: 'center',
        renderCell: renderStatusButton,
    },
    {
        field: "viewButton",
        headerName: "",
        minWidth: 170,
        sortable: false,
        disableColumnMenu: true,
        renderCell: RenderViewInfoButton,
    },
];

export default KitchenTable;

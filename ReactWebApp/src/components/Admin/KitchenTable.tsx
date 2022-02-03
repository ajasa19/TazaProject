import React from "react";
import { useState } from "react";
import Axios from "axios";
import {
    BrowserRouter as Router,
    withRouter
  } from "react-router-dom";

//MUI Imports
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";



const renderStatusButton = (params) => {
  if (params.row.status === "APPROVED") {
    return (
      <strong>
        <Button variant="contained" color="success" size="small">
          {params.row.status}
        </Button>
      </strong>
    );
  } else if (params.row.status === "DENIED") {
    return (
      <strong>
        <Button variant="contained" color="error" size="small">
          {params.row.status}
        </Button>
      </strong>
    );
  } else if (params.row.status === "PENDING") {
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

const KitchenTable = (props) => {

  const {history} = props;
  const handleLinkClick = (pageURL) => {
    history.push(pageURL)
  }   

  const [kitchens, setKitchens] = useState<any[]>([]);
  //const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    Axios.get<any>("http://localhost:3001/admin/getKitchens", {}).then(
      (response) => {
        setKitchens(response.data);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderViewInfoButton = (params) => {
  return (
    <strong>
      <Button
        variant="contained"
        color="info"
        size="small"
        onClick={() => {
           handleLinkClick(`/admin/viewKitchenInfo/${params.id}`);
        }}
      >
        View Info
      </Button>
    </strong>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "Kitchen Id", minWidth: 100 },
  { field: "name", headerName: "Name", minWidth: 150, flex: 0.05  },
  { field: "userId", headerName: "User Id", minWidth: 75 },
  { field: "userName", headerName: "Username", minWidth: 150, flex: 0.05  },
  { field: "emailAddress", headerName: "Email", minWidth: 150, flex: 0.05  },
  { field: "phoneNumber", headerName: "Phone Number", minWidth: 150 },
  {
    field: "status",
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
    renderCell: renderViewInfoButton,
  },
];

  const rows: GridRowsProp = kitchens;

  return (
    <Router>
      <DataGrid
        autoHeight
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          `super-app-theme--${params.getValue(params.id, "status")}`
        }
      />
    </Router>
  );
};

export default withRouter(KitchenTable);

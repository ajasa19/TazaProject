import React from "react";
import { useState } from "react";
import Axios from "axios";

//MUI Imports
import { DataGrid, GridRowsProp, GridColDef  } from "@mui/x-data-grid";

const ProfileTable = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  //const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    Axios.get<any>("http://localhost:3001/admin/getProfiles", {}).then(
      (response) => {
        setProfiles(response.data);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

//   const renderViewInfoButton = (params) => {
//   return (
//     <strong>
//       <Button
//         variant="contained"
//         color="info"
//         size="small"
//         onClick={() => {
//             console.log(params.id)
//         }}
//       >
//         View Info
//       </Button>
//     </strong>
//   );
// };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 70 },
    { field: "userName", headerName: "Username", minWidth: 150, flex: 0.03 },
    { field: "firstName", headerName: "First Name", minWidth: 150, flex: 0.03 },
    { field: "lastName", headerName: "Last Name", minWidth: 150, flex: 0.03 },
    { field: "emailAddress", headerName: "Email", minWidth: 150, flex: 0.05 },
    { field: "phoneNumber", headerName: "Phone Number", minWidth: 150 },
  // {
  //   field: "viewButton",
  //   headerName: "",
  //   minWidth: 170, 
  //   sortable: false,
  //   disableColumnMenu: true,
  //   renderCell: renderViewInfoButton,
  // },
  ];

  const rows: GridRowsProp = profiles;

  return (
    <DataGrid
      autoHeight
      disableSelectionOnClick
      rows={rows}
      columns={columns}
    />
  );
};

export default ProfileTable;

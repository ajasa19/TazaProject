import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Axios from 'axios';
import { useState } from 'react';

const renderStatusButton = (params) => {
  if (params.row.status === "On Route") {
    return (
      <strong>
        <Button variant="contained" color="success" size="small">
          {params.row.status}
        </Button>
      </strong>
    );
  } else if (params.row.status === "Pending") {
    return (
      <strong>
        <Button variant="contained" color="error" size="small">
          {params.row.status}
        </Button>
      </strong>
    );
  } else if (params.row.status === "In Kitchen") {
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
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'quantity', headerName: 'Quantity', width: 300 },
      { field: 'name', headerName: 'Type of Food', width: 300 },
      { field: 'price', headerName: 'Price', width: 300 },
      { field: 'kitchenName', headerName: 'Kitchen Name', width: 400 },
      { 
          field: 'status', 
          headerName: 'Status of Food', 
          width: 120, 
          align: 'center',
          renderCell: renderStatusButton, 
      },
    ];
    const Tablerows = [
      { id: 1, quantity: '1', name: 'Mozzarella Sticks', price: 7.47, kitchenName: "Bistro Mexicana", status: "Pending" },
      { id: 2, quantity: '1', name: 'Potato Skins', price: 5.97, kitchenName: "Bistro Mexicana", status: "Pending" },
      { id: 3, quantity: '1', name: 'Gourdon-Hamsey Burger', price: 5.44, kitchenName: "Bistro Mexicana", status: "Pending" },
    ];
const OrderCards = () => {
  const [orders, setOrders] = useState<any[]>([]);
  React.useEffect(() => {

    var tempIdString = localStorage.getItem("profileId");
      var profileId;
      var cartId;
      if(tempIdString)
          profileId = JSON.parse(tempIdString || '');

    Axios.get<any>("http://localhost:3001/cart/getCartId", {
      params: {
        profileId: profileId,
      },
    }).then(
      (response) => {
        //console.log(response.statusText)
        cartId = response.data[0].id

        if(response.statusText === "OK"){
            Axios.get<any>("http://localhost:3001/cart/getOrders", {
               params: {
                  cartId: cartId,
                },
            }).then(
              (response) => {
                if(response.statusText === "OK"){
                  console.log(JSON.stringify(response.data))
                  setOrders(response.data);
                }
              }
            );
        }
      }
    );
  }, []);

  const rows: GridRowsProp = Tablerows;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: 1600 }}>
      <Box
        sx={{
          width: 1600,
          justifyContent: 'center',
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(1, 1fr)',
        }}
      >
      <Card>
        <CardContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Active Orders</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DataGrid
                autoHeight
                disableSelectionOnClick
                rows={rows}
                columns={columns}
                getRowClassName={(params) =>
                  `super-app-theme--${params.getValue(params.id, "status")}`
                }
              />
              
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              >
              <Typography>Order History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button type="submit" variant="contained" color="primary" href="/">Order</Button>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
      </Box>
    </div>
    </div>
  );
}

export default OrderCards;

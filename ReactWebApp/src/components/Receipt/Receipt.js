import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Axios from 'axios';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField, Button, Grid } from '@mui/material';
import { useHistory } from "react-router-dom";




const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Food_Name', width: 150 },
    { field: 'col2', headerName: 'Quantity', width: 150 },
    { field: 'col3', headerName: 'Price', width: 150 },
    { field: 'col4', headerName: 'Total', width: 150 },
    { field: 'col5', headerName: '', width: 150 },



];
let sum = 0;

let userId = 1;
let totalPrice = 0;
let address = 0;
let currentTime = 0;
let tempCartId = 0;
let orderId = 0;
let foodItemId = 0;
let quantity = 0;

let status = false;


function setTotal(price, quantity) {
    sum = sum + (price * quantity);
}

function getTotal() {
    return sum.toFixed(2);
}

function onClickHandler() {
    totalPrice = getTotal();
    console.log("ToTAL PRICE: ", totalPrice)

    // sql stuff

    Axios.get("http://localhost:3001/orders/getProfile", {
        params: {
            userId: parseInt(userId),
        },
    }).then((response) => {
        address = response.data[0].address;
        console.log('RESPONSE FROM PROFILE TABLE ', response.data);
        currentTime = new Date().toLocaleTimeString();
        console.log('DATE  ', currentTime);

    });

    setTimeout(() => {


        Axios.post('http://localhost:3001/orders/addOrder', {

            userId: parseInt(userId),
            totalPrice: totalPrice,
            address: address,
            currentTime: currentTime
        }).then((response) => {
            
            console.log(response.data);



        });




    }, 2000);
    setTimeout(() => {
        Axios.get("http://localhost:3001/orders/getCartId", {
            params: {
                userId: parseInt(userId),
            },
        }).then((response) => {

            console.log('RESPONSE FROM CART TABLE ', response.data);
            tempCartId = response.data[0].id;
            console.log('THIS IS CAART SHTUFF!!: ', tempCartId)

        });
        //setTimeout(() => {
        //    console.log(userId)
        //    Axios.get("http://localhost:3001/orders/getOrderId", {
        //        params: {
        //            userId: parseInt(userId),
        //        },
                
        //    }).then((response) => {
                
              
               
        //        var count = Object.keys(response.data).length;
        //        console.log(count);

        //        orderId = response.data[count - 1].id;
        //        console.log('GET ORDER ID REQUEST => ', orderId)
        //        console.log('LAST ELEMENT IS : ', orderId)
        //    });
        //}, 1000);
        //setTimeout(() => {
        //    console.log('front userid =',userId)
        //    Axios.get("http://localhost:3001/orders/getItems", {
                
        //        params: {
        //            userId: parseInt(userId),
        //        },
                
        //    }).then((response) => {
        //        console.log('GET ORDER ID REQUEST => ', response.data)

        //        quantity = response.data[0].quantity;
        //        foodItemId = response.data[0].foodItemId;
        //        console.log('Order id = ', orderId)
        //        console.log('quantity = ', quantity)
        //        console.log('foodItemId = ', foodItemId)


                


        //    });
        //}, 1000);
        //setTimeout(() => {
        //    console.log('foodItemId ID IN ADDITEMS ', foodItemId)
        //    console.log('quantity ID IN ADDITEMS ', quantity)

        //    console.log('ORDER ID IN ADDITEMS ',orderId)
        //Axios.post("http://localhost:3001/orders/addItems", {
           
        //        orderId: orderId,
        //        foodItemId: parseInt(foodItemId),
        //        quantity: parseInt(quantity),
            
        //}).then((response) => {
        //    console.log('GET 22 ', response.data)



        //});
        //}, 3000);
      
        Axios.delete("http://localhost:3001/orders/deleteCartId", {
            params: {
                id: parseInt(tempCartId),
            },
        }).then((response) => {

            console.log('DELETION SUCCESSFUL ');


        });

        Axios.delete("http://localhost:3001/orders/deleteCartItemsId", {
            params: {
                id: parseInt(tempCartId),
            },
        }).then((response) => {

            console.log('DELETION SUCCESSFUL 2 ');
            status = true

        });

    }, 2000);

  

}

const Receipt = () => {
    useEffect(() => {

        sum = 0;
    }, []);
    const history = useHistory();
    let total = 0;
    const [item, setItem] = useState([]);


    useEffect(() => {
        console.log('use effect passed!');
        console.log('Inside the useEffect reloading once (userId) => ', userId)
        var profileId = localStorage.getItem("profileId");
        userId = profileId;
        console.log('ProfileId : ', userId)
        // Connect to the database (front end to backend) => use axios
        Axios.get('http://localhost:3001/receipt/get',
            {
                params: {
                    userId: parseInt(userId),
                }
            }
        ).then((response) => {
            console.log('kjkjkj', response.data);

       
           
            userId = String(response.data[0].userId);
            
            console.log(userId)

            setItem(response.data);
            console.log('userId is in axios: ', userId)
        })
        



    }, []);
    console.log('list data: ', item);
    return (
        <>
            <div style={{ textAlign: 'center', fontSize: '30px' }}>
                <br />
                Thank you for ordering!
                <br />
            </div>
            <br />
            <Container fixed>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Food_Name</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Price</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {item.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    {setTotal(row.price, row.quantity)}

                                    <TableCell align="right">{row.quantity}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>



                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <br />
            <div style={{ textAlign: 'center' }}>
                <h6>Total: ${getTotal()}</h6>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <Button style={{ textAlign: 'center', width: '20%' }} color="primary" variant="contained" autoComplete="off" type="submit" onClick={() => {
                    onClickHandler();
                    if (status === true) { history.push("/") } else { status = false }
                }} >Next</Button>
            </div>
        </>
    );

}

export default Receipt;
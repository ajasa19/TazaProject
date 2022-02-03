import * as React from 'react';
import { useParams } from 'react-router-dom';
import Axios from "axios";


import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

let DefaultKitchen = {
    name: "No name",
    location: "No email address",
    status: "No status",
    imageURL: ""
}

const ViewInfo = () => {
    
    const id : any = useParams();

    const [kitchen, setkitchen] = React.useState<any>(DefaultKitchen);
    
    const [currentStatus, setcurrentStatus] = React.useState("PENDING");
    const [foodHandler, setfoodHandler] = React.useState("");
    const [foodInspection, setfoodInspection] = React.useState("");

     React.useEffect(() => {
        Axios.get<any>("http://localhost:3001/kitchen/getKitchen", 
        {
            params: {
                Id: id.id,
            },
        }).then(
            (response) => {
                setkitchen(response.data[0]);
                setcurrentStatus(response.data[0].status);
            }
        );

        Axios.get<any>("http://localhost:3001/kitchen/getKitchenDocuments", 
        {
            params: {
                id: id.id,
            },
        }).then(
            (response) => {
                if(response.data.length > 0){
                    setfoodHandler(response.data[0].URL)
                    setfoodInspection(response.data[1].URL)
                }
            }
        );


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderStatusButton = (status) => {
        if (status === "APPROVED") {
            return (
            <strong>
                <Button variant="contained" color="success" size="small">
                {status}
                </Button>
            </strong>
            );
        } else if (status === "DENIED") {
            return (
            <strong>
                <Button variant="contained" color="error" size="small">
                {status}
                </Button>
            </strong>
            );
        } else if (status === "PENDING") {
            return (
            <strong>
                <Button variant="contained" color="warning" size="small">
                {status}
                </Button>
            </strong>
            );
        }
        return;
    };

    const changeStatus = (e) =>{    
        Axios.post("http://localhost:3001/kitchen/updateKitchenStatus", {
            id: id.id,
            status: e.target.innerText,
        }).then(() => {
            setcurrentStatus(e.target.innerText);
        })
    }


    return (
        <Box sx={{ margin: '20px'}}>

            {/* KITCHEN INFO CARD */}
            <Card sx={{width: '43%', height: 250, display: 'flex', justifyContent: 'center',float: 'left', marginBottom: "20px", boxShadow: '5px 5px 10px 3px rgba(0,0,0,0.62)'}}>
                <Stack direction="row" spacing={5} >
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto'}}>
                        <Avatar alt="Remy Sharp"  sx={{ width: 200, height: 200 }} src={kitchen.imageURL} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto', paddingTop: '50px'}}>
                        <CardContent>
                            <Typography variant="h4">{kitchen.name}</Typography>
                            <Typography variant="h5">{kitchen.location}</Typography>
                            <Stack direction="row" spacing={2}>
                                <Typography variant="h5">Status: </Typography>
                                {renderStatusButton(currentStatus)}
                            </Stack>
                        </CardContent>
                    </Box>
                </Stack>
             </Card>
            {/* KITCHEN DOCUMENTS CARD */}
             <Card sx={{ width: '55%', float: 'right', textAlign: 'center', boxShadow: '5px 5px 10px 3px rgba(0,0,0,0.62)'}}>
                <Typography variant="h4" sx={{margin: '10px', }}>KITCHEN DOCUMENTS </Typography>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>FOOD HANDLER CERTIFICATION</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <img width='75%' alt="driverLicenseFront" src={foodHandler}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>FOOD INSPECTION</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <img width='75%' alt="driverLicenseFront" src={foodInspection}/>
                    </AccordionDetails>
                </Accordion>
             </Card>

            {/* CHANGE STATUS CARD */}
             <Card sx={{ width: '43%', height: 'auto', clear: 'left', textAlign: 'center', boxShadow: '5px 5px 10px 3px rgba(0,0,0,0.62)'}}>
                <Box sx={{margin:'20px'}}>
                    <Typography variant="h5" sx={{marginBottom: '10px'}}>CHANGE CURRENT STATUS </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                         <Button variant="contained" color="success" size="small" onClick={(e)=> changeStatus(e)}>APPROVED</Button>
                         <Button variant="contained" color="warning" size="small" onClick={(e)=> changeStatus(e)}>PENDING</Button>
                         <Button variant="contained" color="error" size="small" onClick={(e)=> changeStatus(e)}>DENIED</Button>
                    </Stack>
                </Box>
                
             </Card>

            
        </Box>
    );
}

export default ViewInfo;
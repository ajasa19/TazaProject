import * as React from "react";
import { useState } from 'react';
// Mui Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Axios from 'axios';
import TazaLogo from '../Header/taza.png'
import './Kitchen.css';

let DefaultKitchen = {
    name: "Default Kitchen",
    description: "Default Description",
    imageURL: {TazaLogo}
}

const KitchenHeader = (props) => {
    const { id } = props.kitchenId;
    const [kitchen, setKitchen] = useState<any>({DefaultKitchen});

    React.useEffect(() => {
        Axios.get<typeof DefaultKitchen>("http://localhost:3001/kitchen/getKitchen", {
          params: {
            Id: id
          }
        }).then((response) => {
            // console.log("Axios.get<kitchenObj>('http://localhost:3001/getKitchen'");
            // console.log(JSON.stringify(response.data[0]));
            setKitchen(response.data[0]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <Box className='hero-image' style={{ padding: '20px', marginBottom: '20px',
               backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${(kitchen.imageURL)})` 
            }}
        >
            <Typography gutterBottom variant="h2" component="div" style={{color: 'white'}}>
                { kitchen.name ? kitchen.name : 'Kitchen name not loaded'}
            </Typography>
            <Typography gutterBottom variant="h5" component="div" style={{color: 'white'}}>
                {kitchen.description ? kitchen.description : 'Kitchen description not loaded'}
            </Typography>
        </Box>
    );
}

export default KitchenHeader;
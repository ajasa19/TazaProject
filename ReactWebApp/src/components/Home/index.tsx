import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";
const Home = (props) => {
    const {history} = props;

    const [kitchens, setKitchens] = React.useState<any[]>([]);

    const handleLinkClick = (pageURL) => {
        history.push(pageURL);
    }

    React.useEffect(() => {
        Axios.get("http://localhost:3001/kitchen/getKitchens").then((response) => {
            setKitchens(response.data);
        });
    }, []);

    const renderCards = kitchens.filter(kitchen => kitchen.status === "APPROVED").map(
        (kitchen) => 
        
        <Grid item key={kitchen.id}>
            <Card 
                onClick={() => handleLinkClick(`/kitchen/${kitchen.id}`)}
                sx={{ 
                    maxWidth: 350,
                    maxHeight: 350,
                    boxShadow: '5px 5px 10px 3px rgba(0,0,0,0.62)',
                    cursor: 'pointer'
                }}
                >
                <CardMedia
                    component="img"
                    height="140"
                    image={kitchen.imageURL}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {kitchen.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {kitchen.description}
                    </Typography>
                </CardContent>
            </Card>
            <br/>
        </Grid>
    );

    return(
        <Router>
            <Grid container style={{paddingTop: '20px', paddingBottom: '20px', backgroundColor: 'white'}}>
                {/* <Grid item xs={9} style={{backgroundColor: 'white'} }> Kitchen display */}
                    <Grid container spacing={4}
                        alignItems="center"
                        justifyContent="center"
                    >
                        {renderCards}
                    </Grid>
                {/* </Grid> */}
            </Grid>  
        </Router>    
    );
}

export default withRouter(Home);
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class Driver extends React.Component{
    render(){
        return(
            <Box
                mt={2}
                display="flex"  
                justifyContent="center"
            > 
                <div>
                <Card sx={{ minWidth: 400 }}
                
                >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Sign Up
                        </Typography>

                        <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Full Name"
                        />
                        <br/><br/><br/>

                        <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        />
                        <br/><br/><br/>

                        <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Phone Number"
                        />
                        <br/><br/><br/>
                        <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Street Name"
                        />
                        <br/><br/><br/>
                        <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Address"
                        />
                        
                        <br/><br/>
                        <Button variant="contained">Continue</Button>
                    </CardContent>                  
            </Card>
                </div>
            </Box>
        );
    }
    
}

export default Driver;

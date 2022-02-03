import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
// import CardActions from '@mui/material/CardActions';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Avatar from '@mui/material/Avatar';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';

const Home = () => {

    const renderProfileSettingsCards = (

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 800 }}>
                <Box
                    sx={{
                        width: 800,
                        justifyContent: 'center',
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)',
                    }}
                >
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Edit About You
                            </Typography>
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffocusgreece.com%2Fwp-content%2Fuploads%2F2018%2F10%2FBilly-Zane-1.png&f=1&nofb=1" alt='userpic' style={{ height: 85, width: 85, objectFit: "cover", borderRadius: 50 }} />
                            <Typography variant="h6" component="div">
                                Username
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                <TextField
                                    label="First Name"
                                    id="firstNameTextField"
                                    defaultValue="Bob"
                                    size="small"
                                    variant="standard"
                                />
                            </Typography>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                <TextField
                                    label="Last Name"
                                    id="lastNameTextField"
                                    defaultValue="Jemir"
                                    size="small"
                                    variant="standard"
                                />
                            </Typography>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                <TextField
                                    label="Email address"
                                    id="eMialTextField"
                                    defaultValue="BoJem@gmail.com"
                                    size="small"
                                    variant="standard"
                                />
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                        </CardContent>
                    </Card>
                </Box>

            </div>
        </div>
    );

    return (
        <ul> {renderProfileSettingsCards}  </ul>
    );
}

const ProfileSettingsCards = () => {
    return (
        <Home></Home>
    );
}

export default ProfileSettingsCards;

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Row from 'react-bootstrap/Row';
// import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';

const profileData = [
    {
        id: 1,
        userName: "BobTheGuy",
        firstName: "Bob",
        lastName: "Jemir",
        emailAddress: "BoJem@gmail.com",
        profileImg: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.lebanoninapicture.com%2FPrv%2FImages%2FPages%2FPage_85980%2Fportrait-time-people-faces-man-mustache-leaves--2-14-2017-2-57-57-pm-l.jpg&f=1&nofb=1"
    }
];

const Home = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
     const id = open ? 'simple-popover' : undefined;



    const renderprofileCards = profileData.map(
        (card) =>

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
                            <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                    About You
                                    <Button sx={{ color: 'default' }} size="large" startIcon={<EditIcon />} onClick={handleClick} ></Button>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Typography sx={{ p: 4 }}>
                                            <TextField id="newUserName" label="New username" defaultValue={card.userName} variant="standard" />
                                            <br /><br />
                                            <TextField id="newFirstName" label="New first name" defaultValue={card.firstName} variant="standard" />
                                            <br /><br />
                                            <TextField id="newLastName" label="New last name" defaultValue={card.lastName} variant="standard" />
                                            <br /><br />
                                            <TextField id="newEmailAddress" label="New email address" defaultValue={card.emailAddress} variant="standard" />
                                            <br /><br />
                                            <Button sx={{ color: 'default' }} size="large" startIcon={<SaveIcon/>}>Save</Button>
                                        </Typography>
                                    </Popover>
                                <Divider />
                                </Typography>
                                <img src={card.profileImg} alt='profileImage' style={{ height: 85, width: 85, objectFit: "cover", borderRadius: 50 }} />
                                <br /><br />

                                <b>Username</b>:
                                <br />
                                {card.userName}

                                <Divider />

                                <b>First Name</b>:
                                <br />
                                {card.firstName}

                                <Divider />
                           
                                <b>Last Name</b>:
                                <br />
                                {card.lastName}
                            
                                <Divider />

                                <b>Email Adress</b>:
                                <br />
                                {card.emailAddress}
                                   
                                <Divider />
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
        <ul> {renderprofileCards}  </ul>
    );
}

const ProfileCards = () => {
    return (
            <Home></Home>
    );
}

export default ProfileCards;

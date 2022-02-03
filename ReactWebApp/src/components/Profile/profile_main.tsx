import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const Home = () => {

    let [profileData, setProfileDataDB] = useState<any[]>([]);

    React.useEffect(() => {
        var tempIdString = localStorage.getItem("profileId");
        var profileId;
        if (tempIdString)
            profileId = JSON.parse(tempIdString || '');
        Axios.get<any>("http://localhost:3001/profile/getProfileLimited", {
            params: {
                userId: profileId,
            },
        }).then((response) => {
            setProfileDataDB(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const history = useHistory();

    const routeChangeGoToEditProfile = () => {
        let urlString = '/profile/EditProfile';
        history.push(urlString);
    }

    const renderprofileCards = profileData.map(
        (card) =>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 800 }}>
                <Box
                    sx={{
                        width: 800,
                        justifyContent: 'center',
                        gap: 1,
                    }}
                >
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                    About You
                                    <Button sx={{ color: 'default' }} size="large" startIcon={<EditIcon />} onClick={() => routeChangeGoToEditProfile()}></Button>
                                <Divider />
                                </Typography>

                                <div>
                                <FormControl fullWidth sx={{ m: 1, width: '17ch' }}>
                                        <img src={card.profileImgUrl} alt='profileImage' style={{ height: 125, width: 125, objectFit: "cover", borderRadius: 20 }} />
                                    </FormControl>

                                    <FormControl fullWidth sx={{ m: 1, width: '17ch' }}>
                                        <b>Username:</b>
                                        {card.profileUserName}
                                        <Divider />
                                        <br />
                                        <b>Phone number:</b>
                                        {card.profilePhoneNum}
                                        <Divider />
                                    </FormControl>

                                    <FormControl fullWidth sx={{ m: 1, width: '17ch' }}>
                                        <b>First Name:</b>
                                        {card.profileFirstName}
                                        <Divider />
                                        <br />
                                        <b>Email Adress:</b>
                                        {card.profileEmail}
                                        <Divider sx={{ width: '36ch' }} />
                                    </FormControl>

                                    <FormControl fullWidth sx={{ m: 1, width: '17ch' }}>
                                        <b>Last Name:</b>
                                        {card.profileLastName}
                                        <Divider />
                                    </FormControl>
                                </div>

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

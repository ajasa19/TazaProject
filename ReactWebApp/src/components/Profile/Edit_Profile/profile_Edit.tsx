import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
//import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import Axios from 'axios';

const Home = () => {
    var tempIdString = localStorage.getItem("profileId");
    var profileId;
    if (tempIdString)
        profileId = JSON.parse(tempIdString || '');
    const [profileData, setprofileData] = useState<any[]>([]);

    // inital load of items from DB
    React.useEffect(() => {
        Axios.get<any>("http://localhost:3001/profileEdit/getProfileData", {
            params: {
                userId: profileId
            },
        }).then((response) => {
            setprofileData(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // edit profile data from profile
    const editProfile = (profileId, profileUserName, profileLastName, profileFirstName, profileEmail, profileImgUrl, profilePhoneNum) => {
        Axios.post("http://localhost:3001/profileEdit/editProfile", {
            profileId: profileId,
            profileUserName: profileUserName,
            profileLastName: profileLastName,
            profileFirstName: profileFirstName,
            profileEmail: profileEmail,
            profileImgUrl: profileImgUrl,
            profilePhoneNum: profilePhoneNum
        }).then(() => {
            //console.log("good add");
        })

        window.location.reload();
    };

    let [profileImageUrl, setProfileImageUrl] = React.useState("");
    const handleProfileImageUrlChange = (event) => {
        setProfileImageUrl(event.target.value);
    };
    let [profileUserName, setProfileUserName] = React.useState("");
    const handleProfileUserNameChange = (event) => {
        setProfileUserName(event.target.value);
    };
    let [profileFirstName, setProfileFirstName] = React.useState("");
    const handleProfileFirstNameChange = (event) => {
        setProfileFirstName(event.target.value);
    };
    let [profileLastName, setProfileLastName] = React.useState("");
    const handleProfileLastNameChange = (event) => {
        setProfileLastName(event.target.value);
    };
    let [profileEmail, setProfileEmail] = React.useState("");
    const handleProfileEmailChange = (event) => {
        setProfileEmail(event.target.value);
    };
    let [profilePhoneNum, setProfilePhoneNum] = React.useState("");
    const handleProfilePhoneNumChange = (event) => {
        setProfilePhoneNum(event.target.value);
    };

    const renderProfileEditCard = profileData.map(
        (card) =>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 800 }}>
                    <Box
                        sx={{
                            width: 800,
                            justifyContent: 'center',
                        }}
                    >
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                    Edit Profile
                                    <Divider />
                                </Typography>

                                <FormControl fullWidth sx={{ m: 1, width: '30ch' }}>
                                    <img src={card.profilePicUrl} alt='foodItemImg' style={{ height: 185, width: 185, objectFit: "cover", borderRadius: 3 }} />
                                    <TextField id="newProfileimageUrl" label="Image URL" defaultValue="" onChange={handleProfileImageUrlChange} variant="standard" />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '20ch' }}>
                                    <br />
                                    <TextField id="newFirstName" label="New first name" defaultValue={card.profileFirstName} onChange={handleProfileFirstNameChange} variant="standard" />
                                    <br />
                                    <TextField id="newUserName" label="New user name" defaultValue={card.profileUserName} onChange={handleProfileUserNameChange} variant="standard" multiline />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '20ch' }}>
                                    <br />
                                    <TextField id="newLastNamee" label="New last name" defaultValue={card.profileLastName} onChange={handleProfileLastNameChange} variant="standard" multiline />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '35ch' }}>
                                    <TextField id="newEmail" label="New email address" defaultValue={card.profileEmail} onChange={handleProfileEmailChange} variant="standard" multiline />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '15ch' }}>
                                    <TextField id="newPhoneNum" label="New phone number" defaultValue={card.profilePhoneNum} onChange={handleProfilePhoneNumChange} variant="standard" multiline />
                                </FormControl>
                                <br /><br />
                                <FormControl fullWidth sx={{ m: 1, width: '10ch' }}>
                                    <Button sx={{ color: 'default' }} size="large" startIcon={<SaveIcon />} onClick={() => {
                                        if (profileUserName.length < 2) { profileUserName = card.profileUserName; }
                                        if (profileLastName.length < 2) { profileLastName = card.profileLastName; }
                                        if (profileEmail.length < 2) { profileEmail = card.profileEmail; }
                                        if (profileFirstName.length < 2) { profileFirstName = card.profileFirstName; }
                                        if (profileImageUrl.length < 2 || profileImageUrl.length > 255) { profileImageUrl = card.profilePicUrl; }
                                        if (profilePhoneNum.length < 2) { profilePhoneNum = card.profilePhoneNum;}
                                        editProfile(card.userId, profileUserName, profileLastName, profileFirstName, profileEmail, profileImageUrl, profilePhoneNum)
                                    }}>Save</Button>
                                </FormControl>

                            </CardContent>
                        </Card>

                    </Box>

                </div>
            </div>
    );

    return (
        <ul> {renderProfileEditCard}  </ul>
    );
}

const EditProfileCards = () => {
    return (
        <Home></Home>
    );
}

export default EditProfileCards;

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
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
        Axios.get<any>("http://localhost:3001/profileKitchen/getKitchenData", {
            params: {
                userId: profileId
            },
        }).then((response) => {
            setprofileData(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // edit profile data from profile
    const editKitchen = (profileId, kitchenName, kitchenLocation, kitchenDesc, kitchenImgUrl) => {
        Axios.post("http://localhost:3001/profileKitchen/editKitchen", {
            profileId: profileId,
            kitchenName: kitchenName,
            kitchenLocation: kitchenLocation,
            kitchenDesc: kitchenDesc,
            kitchenImgUrl: kitchenImgUrl
        }).then(() => {
            //console.log("good add");
        })

        window.location.reload();
    };

    let [kitchenImgUrl, setKitchenImgUrl] = React.useState("");
    const handleKitchenImgUrlChange = (event) => {
        setKitchenImgUrl(event.target.value);
    };
    let [kitchenName, setKitchenName] = React.useState("");
    const handleKitchenNameChange = (event) => {
        setKitchenName(event.target.value);
    };
    let [kitchenLocation, setKitchenLocation] = React.useState("");
    const handleKitchenLocationChange = (event) => {
        setKitchenLocation(event.target.value);
    };
    let [kitchenDesc, setKitchenDesc] = React.useState("");
    const handleKitchenDescChange = (event) => {
        setKitchenDesc(event.target.value);
    };

    const renderKitchenEditCard = profileData.map(
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

                                <FormControl fullWidth sx={{ m: 1, width: '37ch' }}>
                                    <img src={card.kithcenImgUrl} alt='foodItemImg' style={{ height: 185, width: 300, objectFit: "cover", borderRadius: 3 }} />
                                    <TextField id="newKitchenimageUrl" label="Image URL" defaultValue="" onChange={handleKitchenImgUrlChange} variant="standard" />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '45ch' }}>
                                    <br />
                                    <TextField id="newName" label="New kitchen name" defaultValue={card.kitchenName} onChange={handleKitchenNameChange} variant="standard" multiline />
                                    <br />
                                    <TextField id="newLocation" label="New kitchen location" defaultValue={card.kitchenLocation} onChange={handleKitchenLocationChange} variant="standard" multiline/>
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '80ch' }}>
                                    <br />
                                    <TextField id="newDesc" label="New kitchen description" defaultValue={card.kitchenDesc} onChange={handleKitchenDescChange} variant="standard" multiline />
                                </FormControl>
                                <br /><br />
                                <FormControl fullWidth sx={{ m: 1, width: '10ch' }}>
                                    <Button sx={{ color: 'default' }} size="large" startIcon={<SaveIcon />} onClick={() => {
                                        if (kitchenName.length < 2) { kitchenName = card.kitchenName; }
                                        if (kitchenLocation.length < 2) { kitchenLocation = card.kitchenLocation; }
                                        if (kitchenDesc.length < 2) { kitchenDesc = card.kitchenDesc; }
                                        if (kitchenImgUrl.length < 2 || kitchenImgUrl.length > 255) { kitchenImgUrl = card.kithcenImgUrl; }
                                        editKitchen(card.userId, kitchenName, kitchenLocation, kitchenDesc, kitchenImgUrl)
                                    }}>Save</Button>
                                </FormControl>

                            </CardContent>
                        </Card>

                    </Box>

                </div>
            </div>
    );

    return (
        <ul> {renderKitchenEditCard}  </ul>
    );
}

const EditKitchenCards = () => {
    return (
        <Home></Home>
    );
}

export default EditKitchenCards;

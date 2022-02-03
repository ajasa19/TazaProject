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
// import EditIcon from '@mui/icons-material/Edit';
// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';

const foodItemData = [
    {
        id: 2,
        foodItemName: "The SJB Special: Grince Taco",
        fooditemDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        foodItemImg: "https://images-gmi-pmc.edge-generalmills.com/e59f255c-7498-4b84-9c9d-e578bf5d88fc.jpg",
        foodItemPrice: 12.23
    }
];


const Home = () => {

    const renderFoodItemEditCard = foodItemData.map(
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
                                    Edit Food Item
                                    <Divider />
                                </Typography>

                                <FormControl fullWidth sx={{ m: 1, width: '30ch' }}>
                                    <img src={card.foodItemImg} alt='foodItemImg' style={{ height: 175, width: 175, objectFit: "cover", borderRadius: 3 }} />
                                    <br /><br />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '30ch' }}>
                                    <TextField id="newFoodItemName" label="New item name" defaultValue={card.foodItemName} variant="standard" multiline/>
                                    <br /><br />
                                    <TextField id="newFoodItemPrice" label="New item price" defaultValue={"$" + card.foodItemPrice} variant="standard" />
                                    <br /><br />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '60ch' }}>
                                    <TextField id="newFoodItemDesc" label="New item description" defaultValue={card.fooditemDescription} variant="standard" multiline />
                                </FormControl>
                                <br /><br />
                                <Button sx={{ color: 'default' }} size="large" startIcon={<SaveIcon />}>Save</Button>
                                                           
                            </CardContent>
                        </Card>

                    </Box>

                </div>
            </div>
    );

    return (
        <ul> {renderFoodItemEditCard}  </ul>
    );
}

const EditFoodItemCards = () => {
    return (
        <Home></Home>
    );
}

export default EditFoodItemCards;

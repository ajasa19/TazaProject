import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import InputLabel from '@mui/material/InputLabel';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useHistory } from "react-router-dom";
// import { useState } from 'react';
import Axios from 'axios';

var tempIdString = localStorage.getItem("profileId");
var profileId;
if (tempIdString)
    profileId = JSON.parse(tempIdString || '');

const Home = () => {

    // const { foodItemId }: { foodItemId: string } = useParams();
    // const [foodItemData, setFoodItem] = useState<any[]>([]);

    // add foodItem to kitchen
    const history = useHistory();
    const addFoodItem = (userId, foodItemName, foodItemDesc, foodItemImgUrl, foodItemPrice, foodItemIngredients,foodItemCategoryId) => {
        Axios.post("http://localhost:3001/foodItemEdit/addFoodItem", {
            userId: userId,
            foodItemName: foodItemName,
            foodItemDesc: foodItemDesc,
            foodItemImgUrl: foodItemImgUrl,
            foodItemPrice: foodItemPrice,
            foodItemIngredients: foodItemIngredients,
            foodItemCategoryId: foodItemCategoryId
        }).then(() => {
            //console.log("good add");
        })

        let path = `/profile:1`;
        history.push(path);
    };

    let [foodItemImageUrl, setFoodItemImageUrl] = React.useState("");
    const handleFoodItemImageUrlChange = (event) => {
        setFoodItemImageUrl(event.target.value);
    };
    let [foodItemName, setFoodItemName] = React.useState("");
    const handleFoodItemNameChange = (event) => {
        setFoodItemName(event.target.value);
    };
    let [foodItemPrice, setFoodItemPrice] = React.useState("00.00");
    const handleFoodItemPriceChange = (event) => {
        setFoodItemPrice(event.target.value);
    };
    let [foodItemDesc, setFoodItemDesc] = React.useState("");
    const handleFoodItemDescChange = (event) => {
        setFoodItemDesc(event.target.value);
    };
    let [foodItemCategory, setFoodItemCategory] = React.useState(8);
    const handleFoodItemCategoryChange = (event) => {
        setFoodItemCategory(event.target.value);
    };
    let [foodItemIngredients, setFoodItemIngredients] = React.useState("");
    const handleFoodItemIngredientsChange = (event) => {
        setFoodItemIngredients(event.target.value);
    };

    const renderFoodItemAddCard = (

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
                                    Add Food Item
                                    <Divider />
                                </Typography>

                                <FormControl fullWidth sx={{ m: 1, width: '30ch' }}>
                                <img src='https://image.shutterstock.com/image-vector/missing-file-icon-on-white-260nw-222423238.jpg' alt='foodItemImg' style={{ height: 175, width: 175, objectFit: "cover", borderRadius: 3 }} />
                                <TextField id="newFoodItemimageUrl" label="Image URL" defaultValue="" onChange={handleFoodItemImageUrlChange} variant="standard"/>
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '30ch' }}>
                                    <TextField id="newFoodItemName" label="Item name" defaultValue="" onChange={handleFoodItemNameChange} variant="standard" multiline />
                                    <br /><br />
                                <TextField id="newFoodItemPrice" label="Item price" defaultValue="" onChange={handleFoodItemPriceChange} variant="standard" />
                                    <br /><br />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '55ch' }}>
                                    <TextField id="newFoodItemDesc" label="Item description" defaultValue="" onChange={handleFoodItemDescChange} variant="standard" multiline />
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ m: 1, width: '10ch' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                                    <Select labelId="category_dropdown" id="category_id" value={foodItemCategory} onChange={handleFoodItemCategoryChange} label="Category">
                                        <MenuItem value="">
                                        </MenuItem>
                                    <MenuItem value={1}>Appetizers</MenuItem>
                                    <MenuItem value={2}>Breakfast</MenuItem>
                                    <MenuItem value={3}>Lunch</MenuItem>
                                    <MenuItem value={4}>Dinner</MenuItem>
                                    <MenuItem value={5}>Sides</MenuItem>
                                    <MenuItem value={6}>Desserts</MenuItem>
                                    <MenuItem value={7}>Drinks</MenuItem>
                                    <MenuItem value={8}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '60ch' }}>
                                <TextField id="newFoodItemIngredients" label="Ingredients list" defaultValue="" onChange={handleFoodItemIngredientsChange} variant="standard" multiline />
                                </FormControl>
                                <br /><br />
                                <FormControl fullWidth sx={{ m: 1, width: '15ch' }}>
                                <Button sx={{ color: 'default' }} size="large" startIcon={<SaveIcon />} onClick={() => {
                                    if (foodItemImageUrl.length < 2 || foodItemImageUrl.length > 255) { foodItemImageUrl = "https://image.shutterstock.com/image-vector/missing-file-icon-on-white-260nw-222423238.jpg"; }
                                    if (foodItemName.length < 2) { foodItemName = "Food item"; }
                                    if (foodItemDesc.length < 2 || foodItemDesc.length > 255) { foodItemDesc = "Desc"; }
                                    if (foodItemIngredients.length < 2 || foodItemIngredients.length > 255) { foodItemIngredients = "N/A"; }
                                    addFoodItem(profileId, foodItemName, foodItemDesc, foodItemImageUrl, foodItemPrice, foodItemIngredients, foodItemCategory)
                                }}>Save</Button>
                            </FormControl>

                            </CardContent>
                        </Card>

                    </Box>

                </div>
            </div>
    );

    return (
        <ul> {renderFoodItemAddCard}  </ul>
    );
}

const AddFoodItemCards = () => {
    return (
        <Home></Home>
    );
}

export default AddFoodItemCards;

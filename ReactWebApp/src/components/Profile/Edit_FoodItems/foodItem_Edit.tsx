import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import Axios from 'axios';

const Home = () => {
    const { foodItemId }: { foodItemId: string } = useParams();
    const [foodItemData, setFoodItem] = useState<any[]>([]);

    // inital load of items from DB
    React.useEffect(() => {
        Axios.get<any>("http://localhost:3001/foodItemEdit/getFoodItemData", {
            params: {
                foodItemId: foodItemId.substr(1, ),
            },
        }).then((response) => {
            setFoodItem(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // edit foodItem from kitchen
    const editFoodItem = (foodItemId, foodItemName, foodItemDesc, foodItemIngredients, foodItemImgUrl, foodItemPrice, foodItemCategoryId) => {
        Axios.post("http://localhost:3001/foodItemEdit/editFoodItem", {
            foodItemId: foodItemId,
            foodItemName : foodItemName,
            foodItemDesc : foodItemDesc,
            foodItemIngredients : foodItemIngredients,
            foodItemImgUrl : foodItemImgUrl,
            foodItemPrice : foodItemPrice,
            foodItemCategoryId : foodItemCategoryId
        }).then(() => {
            //console.log("good delete");
        })

        window.location.reload();
    };

    // delete foodItem from kitchen
    const history = useHistory();
    const deleteFoodItem = (foodItemId) => {
        Axios.post("http://localhost:3001/foodItemEdit/deleteFoodItem", {
            foodItemId: foodItemId
        }).then(() => {
            //console.log("good delete");
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
                                    <TextField id="newFoodItemimageUrl" label="Image URL" defaultValue="" onChange={handleFoodItemImageUrlChange} variant="standard" />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '30ch' }}>
                                    <TextField id="newFoodItemName" label="New item name" defaultValue={card.foodItemName} onChange={handleFoodItemNameChange} variant="standard" multiline/>
                                    <br /><br />
                                    <TextField id="newFoodItemPrice" label="New item price" defaultValue={card.foodItemPrice} onChange={handleFoodItemPriceChange} variant="standard" />
                                    <br /><br />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '60ch' }}>
                                    <TextField id="newFoodItemDesc" label="New item description" defaultValue={card.fooditemDescription} onChange={handleFoodItemDescChange} variant="standard" multiline />
                                </FormControl>
                                <FormControl variant="standard" fullWidth sx={{ m: 1, width: '15ch' }}>
                                    <InputLabel id="demo-simple-select-standard-label">New category</InputLabel>
                                    <Select labelId="category_dropdown" id="category_id" defaultValue={card.categoryId} onChange={handleFoodItemCategoryChange} label="New category">
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
                                    <TextField id="newFoodItemIngredients" label="New ingredients list" defaultValue={card.ingredients} onChange={handleFoodItemIngredientsChange} variant="standard" multiline />
                                </FormControl>
                                <br /><br />
                                <FormControl fullWidth sx={{ m: 1, width: '10ch' }}>
                                    <Button sx={{ color: 'default' }} size="large" startIcon={<SaveIcon />} onClick={() => {
                                        if (foodItemName.length < 2) { foodItemName = card.foodItemName; }
                                        if (foodItemDesc.length < 2) { foodItemDesc = card.fooditemDescription; }
                                        if (foodItemIngredients.length < 2) { foodItemIngredients = card.ingredients; }
                                        if (foodItemPrice === "00.00") { foodItemPrice = card.foodItemPrice; }
                                        if (foodItemImageUrl.length < 2 || foodItemImageUrl.length > 255) { foodItemImageUrl = card.foodItemImg; }
                                        editFoodItem(card.foodItemId, foodItemName, foodItemDesc, foodItemIngredients, foodItemImageUrl, foodItemPrice, foodItemCategory)
                                    }}>Save</Button>
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1, width: '20ch' }}>
                                    <Button sx={{ color: 'red' }} size="large" startIcon={<DeleteForeverIcon />} onClick={() => deleteFoodItem(card.foodItemId)}> Delete</Button>
                                </FormControl>
                                                           
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

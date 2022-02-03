import * as React from "react";
import { useState } from 'react';
// Mui Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

import Axios from 'axios';
import _ from 'lodash';
import './Kitchen.css';

import FoodItemDialog from "./FoodItemDialog";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface FoodItem {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  price: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const KitchenBody = (props) => {
    const { id } = props.kitchenId;
    const [allFoodItems, setallFoodItems] = useState<any[]>([]);
    const [currentFoodItems, setcurrentFoodItems] = useState<any[]>([]);
    const [value, setValue] = React.useState(0);
    const [dialogOpen, setdialogOpen] = React.useState(false);//Drawer opening state
    const [clickedFoodItem, setclickedFoodItem] = React.useState<FoodItem>();

    const handleDialogOpen = (foodItem: FoodItem) => {
      setclickedFoodItem(foodItem)
      setdialogOpen(true);
    };
    
    const handleDialogClose = () => {
      setdialogOpen(false);
    };

    const handleDialogSubmission = (profileId, foodItemId, quantity) => {
      Axios.post("http://localhost:3001/cart/addItemToCart", {
            profileId: profileId,
            foodItemId: foodItemId,
            quantity: quantity
        }).then(() => {
        })
      setdialogOpen(false);
    }

    React.useEffect(() => {
        Axios.get("http://localhost:3001/kitchen/getFoodItems", {
          params: {
            Id: id
          }
        }).then((response) => {
            //console.log(JSON.stringify(response.data));
            setallFoodItems(response.data);
            setcurrentFoodItems(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        //console.log(newValue);
        if(newValue === 0) //ALL CATEGORY
          setcurrentFoodItems(allFoodItems);
        else{ //OTHER DYNAMIC CATEGORIES
          const categoryId = uniqCategories[newValue-1].categoryId;
          const newFoodITems = _.filter(allFoodItems, function(foodItem){return foodItem.categoryId === categoryId;});
          
          //console.log(newFoodITems);
          setcurrentFoodItems(newFoodITems);
        }
    };

    const renderFoodItemCards = currentFoodItems.map(
      (foodItem) => 
        <Grid item >
            <Card >
                <CardMedia
                    component="img"
                    height="70px"
                    image={foodItem.imageURL}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {foodItem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {foodItem.description ? foodItem.description : 'No Description'}
                    </Typography>
                </CardContent>
                <CardActions> 
                  <IconButton aria-label="delete" size='large' onClick={() => handleDialogOpen(foodItem)}>
                    <AddShoppingCartIcon />
                  </IconButton>
                  <Typography gutterBottom variant="h6" sx={{marginLeft: 'auto'}}>
                      ${foodItem.price}
                  </Typography>
                </CardActions> 
            </Card>
            <br/>
        </Grid>
    );


    const uniqCategories = _.uniqBy(allFoodItems.map(({categoryId, categoryName}) => ({categoryId, categoryName})), "categoryId");
    const renderTabs = uniqCategories.map((c) =>
      <Tab label={c.categoryName} />
    );

    const renderTabPanels = uniqCategories.map((category, index)=>
      <TabPanel value={value} index={index+1}>
                <Grid container
                spacing={4}
                alignItems="center"
                justifyContent="center"
                >
                {/* TEST {index} */}
                {renderFoodItemCards
          }
                </Grid>
      </TabPanel>
    );

    return(
       <Box className='foodCardContainer'>
            <Tabs value={value} onChange={handleTabChange}>
                <Tab label="All"/>
                {renderTabs}
            </Tabs>
            <Divider />
            <TabPanel value={value} index={0}>
                <Grid container
                spacing={4}
                alignItems="center"
                justifyContent="center"
                >
                    {renderFoodItemCards
              }
                </Grid>
            </TabPanel>

            {renderTabPanels}
            <FoodItemDialog dialogOpen={dialogOpen} handleDialogClose={handleDialogClose} handleDialogSubmission={handleDialogSubmission} {...clickedFoodItem} />

       </Box>
    );
}

export default KitchenBody;
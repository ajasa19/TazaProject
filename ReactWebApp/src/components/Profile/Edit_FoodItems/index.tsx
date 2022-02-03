import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';

import EditFoodItemCards from './foodItem_Edit';
import AddFoodItemCards from './foodItem_Add';

const Profile = () => {
    return (
        <div>
            <Home></Home>
        </div>
    );
}

const Home = () => {

    const history = useHistory();

    const routeChangeGoToProfile = () => {
        let path = `/profile:1`;
        history.push(path);
    }

    const { foodItemId }: { foodItemId: string } = useParams();
    //let conditionCards = <EditFoodItemCards /> as JSX.Element;

    const setConditionCards = () => {
        if (foodItemId === ":0") {
            return <AddFoodItemCards />;
        }
        else {
            return <EditFoodItemCards />;
        }
    }

    const renderMainCard = (

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 800 }}>
                <br />
                <Card sx={{ maxWidth: 800 }}>
                    <CardMedia component="img" height="140" image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.simplytothrive.com%2Fwp-content%2Fuploads%2F2016%2F09%2Forange-header.jpg&f=1&nofb=1" />
                    <CardContent>
                        <Button variant="outlined" color="primary" onClick={routeChangeGoToProfile}>
                                Back to Kitchen
                            </Button>
                    </CardContent>
                </Card>

                <br />

                <Box sx={{ width: 769 }}>

                    { setConditionCards() }
    
                </Box>

            </div>
        </div>
    );

    return (
        <ul> {renderMainCard}  </ul>
    );
}

export default Profile;

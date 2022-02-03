import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import ProfileCards from './kitchenOrderDetailCard';
import { useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';

const Profile = () => {
    return (
        <div>
            <Home></Home>
        </div>
    );
}

const Home = () => {
    const { orderId }: { orderId: string } = useParams();

    const history = useHistory();

    const routeChangeGoToProfile = () => {
        let path = `/KitchenOrders`;
        history.push(path);
    }

    const changeOrderStatus = (newStatus) => {
        // edit foodItem from kitchen
        Axios.post("http://localhost:3001/kitchenOrders/changeOrderStatus", {
                orderId: orderId.substr(1,),
                newStatus: newStatus,
            }).then(() => {
                //console.log("good delete");
            })

        window.location.reload();
    }

    const renderTotalCostCard = (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width:1200 }}>
                <br />
                <Card sx={{ maxWidth: 1200 }}>
                    <CardMedia component="img" height="140" image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.simplytothrive.com%2Fwp-content%2Fuploads%2F2016%2F09%2Forange-header.jpg&f=1&nofb=1" />
                    <CardContent>
                        <FormControl fullWidth sx={{ m: 1, width: '40ch' }}>
                            <Button variant="outlined" color="primary" onClick={routeChangeGoToProfile}>
                                Back to Process orders
                            </Button>
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1, width: '17ch' }}>

                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1, width: '20ch' }}>
                            <Button variant="contained" color="warning" onClick={() => changeOrderStatus(1)}>
                                Cooking
                            </Button>
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1, width: '20ch' }}>
                            <Button variant="contained" color="success" onClick={() => changeOrderStatus(2)}>
                                Pickup
                            </Button>
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1, width: '20ch' }}>
                            <Button variant="contained" color="error" onClick={() => changeOrderStatus(9)}>
                                Refuse
                            </Button>
                        </FormControl>
                                                                   
                    </CardContent>
                </Card>

                <br />


                <Box sx={{ width: 1169 }}>
                    <ProfileCards></ProfileCards>
                </Box>

            </div>
        </div>
    );

    return (
        <ul> {renderTotalCostCard}  </ul>
    );
}


export default Profile;

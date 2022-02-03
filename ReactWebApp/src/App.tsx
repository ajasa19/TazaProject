import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useToken from './components/Login/useToken';

import Profile from './components/Profile/';
import EditProfile from "./components/Profile/Edit_Profile";
import EditKitchen from "./components/Profile/Edit_Kitchen";
import EditFoodItem from "./components/Profile/Edit_FoodItems";
import KitchenOrders from './components/KitchenOrders/';
import KitchenOrdersDetails from './components/KitchenOrders/KitchenOrderDetails';
import Header from "./components/Header/";
import Home from "./components/Home/";
import Login from "./components/Login/";
import Admin from "./components/Admin/";
import BecomeApartner from "./components/BecomeApartner/";
import Driver from "./components/BecomeApartner/Driver/";
import Cart from "./components/Cart/";
import KitchenCertification from "./components/BecomeApartner/Kitchen/KitchenCertification";
import KitchenStart from "./components/BecomeApartner/Kitchen/kitchen";
import Receipt from "./components/Receipt/Receipt";
import DriverView from "./components/DriverView/index";
import KitchenBecomePartner from "./components/BecomeApartner/Kitchen";
import Kitchen from "./components/Kitchen";
import AdminViewDriverInfo from "./components/Admin/ViewDriverInfo";
import AdminViewKitchenInfo from "./components/Admin/ViewKitchenInfo";
import DriverCertification from "./components/BecomeApartner/Driver/DriverCertification"
import ParterConfirmation from "./components/BecomeApartner/confirmation"
import SignUp from "./components/Signup/SignupForm.js"

import About from "./components/About&Help/About";
import Help from "./components/About&Help/GetHelp";
 
const mainTheme = createTheme({
    palette: {
        primary: {
            main: '#ffab24',
        },
        secondary: {
            main: '#7a7a7a',
        },
    },
})



const App = () => {
  const { token, setToken } = useToken();
  
  if(!token) {
    return (
    <ThemeProvider theme={mainTheme}>
        <Router>
            <Switch>
                <Route exact path="/"> <SignUp setToken={setToken}/> </Route>
                <Route exact path="/Login"> <Login setToken={setToken}/> </Route>
            
            </Switch>
        </Router>
    </ThemeProvider>);
  }

  return (
    <ThemeProvider theme={mainTheme}>
        <Router>
            <div>
                <Header/>
                    <Switch>
                    <Route exact path="/receipt"> <Receipt /> </Route>
                    <Route exact path="/About" render={props => <About {...props}/>}></Route>
                    <Route exact path="/Help" render={props => <Help {...props}/>}></Route>
                    <Route exact path="/becomeapartner/driver" render={props => <Driver {...props}/>}></Route>
                    <Route exact path="/becomeapartner/kitchen" render={props => <KitchenBecomePartner {...props}/>}></Route>
                    <Route exact path="/becomeapartner/KitchenCertification" render={props => <KitchenCertification {...props}/>}></Route>
                    <Route exact path="/becomeapartner/DriverCertification" render={props => <DriverCertification/>}></Route>
                    <Route exact path="/becomeapartner/kitchenStart" render={props => <KitchenStart {...props}/>}></Route>
                    <Route exact path="/becomeapartner" render={props => <BecomeApartner {...props}/>}></Route>
                    <Route exact path="/becomeapartner/confirmation" render={props => <ParterConfirmation {...props}/>}></Route>
                    <Route exact path="/DriverView" render={props => <DriverView />}></Route>
                    <Route exact path="/Login" component={Login}></Route>
                    <Route exact path="/profile:cardId" render={Profile}></Route>
                    <Route exact path={"/cart"} render={props => <Cart />} />
                    <Route exact path="/kitchen/:id" render={props => <Kitchen />} />
                    <Route exact path="/admin/viewDriverInfo/:id" render={props => <AdminViewDriverInfo />} />
                    <Route exact path="/admin/viewKitchenInfo/:id" render={props => <AdminViewKitchenInfo />} />
                    <Route exact path={"/profile/EditFoodItem"} render={EditFoodItem} />
                    <Route exact path={"/admin"} render={props => <Admin />} />
                    <Route exact path={"/profile/EditFoodItem:foodItemId"} render={EditFoodItem} />
                    <Route exact path={"/profile/AddFoodItem:foodItemId"} render={EditFoodItem} />
                    <Route exact path={"/profile/EditProfile"} render={EditProfile} />
                    <Route exact path={"/profile/EditKitchen"} render={EditKitchen} />
                    <Route exact path={"/KitchenOrders"} render={props => <KitchenOrders />} />
                    <Route exact path={"/profile/KitchenOrders/KitchenOrdersDetails:orderId"} render={KitchenOrdersDetails} />
                    <Route exact path="/" render={props => <Home />}></Route>
                </Switch>
            </div>
        </Router>
    </ThemeProvider>
  );
}


export default App;


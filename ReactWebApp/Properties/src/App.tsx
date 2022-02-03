import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useToken from './components/Login/useToken';

import Profile from './components/Profile/';
import EditFoodItem from "./components/Profile/Edit_FoodItems";
import Header from "./components/Header/";
import Home from "./components/Home/";
import Form from "./components/Signup/Form";
import Login from "./components/Login/";
//import ResetPassword from "./components/Login";
import BecomeApartner from "./components/BecomeApartner/";
import Driver from "./components/BecomeApartner/driver";
import Cart from "./components/Cart/";
import Kitchen from "./components/Kitchen/"

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
    return <ThemeProvider theme={mainTheme}><Login setToken={setToken}/></ThemeProvider>
  }

  return (
    <ThemeProvider theme={mainTheme}>
        <Router>
        <div>
            <Header/>
            <Switch>
              <Route exact path="/" render={props => <Home />}></Route>
              <Route exact path="/signup"> <Form /> </Route>
              <Route exact path="/becomeapartner/login" render={props => <Driver {...props}/>}></Route>
              <Route exact path="/becomeapartner" render={props => <BecomeApartner {...props}/>}></Route>
              <Route exact path="/kitchen/:id" render={props => <Kitchen />} />
              <Route exact path={"/profile"} render={Profile} />
              <Route exact path={"/profile/EditFoodItem"} render={EditFoodItem} />
              <Route exact path={"/cart"} render={Cart} />
            </Switch>
        </div>
        </Router>
    </ThemeProvider>
  );
}


export default App;

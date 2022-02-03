import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DriverIconImg from './driver.jpg'
import Axios from "axios";


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const Driver = (props) =>{

    const {history} = props;
    const handleLinkClick = (pageURL) => {
      history.push(pageURL)
    }  

    const [firstName, setfirstName] = React.useState("");
    const [lastName, setlastName] = React.useState("");
    const [phoneNumber, setphoneNumber] = React.useState("");
    const [firstNameError, setfirstNameError] = React.useState("");
    const [lastNameError, setlastNameError] = React.useState("");
    const [phoneNumberError, setphoneNumberError] = React.useState("");


    const handleSubmit = () => {
        const isValid = validate();
        if (isValid) {

            var tempIdString = localStorage.getItem("profileId");
            var profileId;
            if(tempIdString)
                profileId = JSON.parse(tempIdString || '');

            Axios.post("http://localhost:3001/profile/updateToDriver", {
                id : profileId,
                firstName : firstName,
                lastName : lastName,
                phoneNumber : phoneNumber
            }).then(() => {

            });
            handleLinkClick("/becomeapartner/DriverCertification");
        }
    };


    const validate = () => {
        setfirstNameError("");
        setlastNameError("");
        setphoneNumberError("");
        var isValid = true;
        if (firstName === ""){
            setfirstNameError("First name cant be blank");
            isValid = false;
        }

        if (lastName === "") {
            setlastNameError("Last name cant be blank");
            isValid = false;
        }

        if (phoneNumber === "") {
            setphoneNumberError("Phone Number cant be blank");
            isValid = false;
        }

        if(!isValid){
            return false;
        }
        return true;
    };

        return (

            <div>
                
                <br />

                <Container>

                    <Row>
                        <Col md={6} sm={12}>
                            <br />
                            <br />
                            <br />
                            <div className="image">
                                <img src={DriverIconImg} width="100%" alt="driver" />
                            </div>
                            <br />
                            <br />

                        </Col>
                        <Col md={6} sm={12}>
                            <br />
                            <br />
                            <h1 className="text-center">Become a Driver</h1>
                            <hr />
                            <p className="text-center">Please enter in your profile detials</p>
                            <div className="padding-all-sides">
                                    <div className="form-group text-center">
                                        <TextField
                                            sx={{minWidth: '500px'}}
                                            required
                                            variant="filled"
                                            id="firstName"
                                            label="First Name"
                                            type="text"
                                            onChange={(e)=>{setfirstName(e.target.value)}}
                                        />
                                        <div className="paddingTop"></div>
                                        <div className="error-message">
                                            {firstNameError}
                                        </div>
                                    </div>

                                    <br />
                                    <div className="form-group text-center">
                                        <TextField
                                            sx={{minWidth: '500px'}}
                                            required
                                            variant="filled"
                                            id="lastName"
                                            label="Last Name"
                                            type="text"
                                            onChange={(e)=>{setlastName(e.target.value)}}
                                        />
                                        <div className="error-message">
                                            {lastNameError}
                                        </div>
                                    </div>
                                    <br />
                                    <div className="form-group text-center">
                                        <TextField
                                            sx={{minWidth: '500px'}}
                                            required
                                            variant="filled"
                                            id="phoneNumber"
                                            label="Phone Number"
                                            type="text"
                                            onChange={(e)=>{setphoneNumber(e.target.value);}}
                                        />
                                        <div className="error-message">
                                            {phoneNumberError}
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="button-size" style={{paddingLeft: "18px"}}>
                                        <Button name="signup" variant="contained" sx={{color: 'white'}} onClick={handleSubmit}>Sign Up</Button>
                                    </div>

                                <br />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
}

export default Driver;

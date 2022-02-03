import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import KitchenIcon from './kitchenIcon.png'
import Axios from "axios";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const Kitchen = (props) =>{

    const {history} = props;
    const handleLinkClick = (pageURL) => {
      history.push(pageURL)
    }  

    const [kitchenName, setkitchenName] = React.useState("");
    const [kitchenDescription, setkitchenDescription] = React.useState("");
    const [kitchenLocation, setkitchenLocation] = React.useState("");
    const [kitchenNameError, setkitchenNameError] = React.useState("");
    const [kitchenLocationError, setkitchenLocationError] = React.useState("");
    
    const [fileKitchen, setfileKitchen] = React.useState<any>();
    const [fileKitchenError, setfileKitchenError] = React.useState("");


    const onChangeFile = event => {
        setfileKitchen(event.target.files[0]);
    };

    const handleSubmit = () => {
        const isValid = validate();
        if (isValid) {
            
                setfileKitchenError("");
                var tempIdString = localStorage.getItem("profileId");
                var profileId;
                if(tempIdString)
                    profileId = JSON.parse(tempIdString || '');


                var fileKitchenName = profileId + "_" + kitchenName.replace(/ /g,"_")+ "." + fileKitchen.name.split('.').pop();

                var formData = new FormData();
                formData.append('id', profileId);
                formData.append('name', kitchenName);
                formData.append('description', kitchenDescription);
                formData.append('location', kitchenLocation);
                formData.append('file', fileKitchen, fileKitchenName);

                Axios.post("http://localhost:3001/kitchen/createKitchen", 
                    formData, 
                    { headers: 
                        {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((response) => {
                    if(response.statusText === "OK"){
                        handleLinkClick("/becomeapartner/KitchenCertification");
                    }
                });
            
        }
    };


    const validate = () => {
        setkitchenNameError("");
        setkitchenLocationError("");
        setfileKitchenError("");
        var isValid = true;
        if (kitchenName === ""){
            setkitchenNameError("Kitchen name cant be blank");
            isValid = false;
        }

        if (kitchenLocation === "") {
            setkitchenLocationError("Kitchen Location cant be blank");
            isValid = false;
        }
        if(fileKitchen === undefined){
            setfileKitchenError("Please add a photo of your kitchen");
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
                            <div className="text-center">
                                <img src={KitchenIcon} width="65%" alt="kitchen" />
                            </div>
                            <br />
                            <br />

                        </Col>
                        <Col md={6} sm={12}>
                            <br />
                            <br />
                            <h1 className="text-center">Become a Kitchen</h1>
                            <hr />
                            <p className="text-center">Please enter in the kitchens detials</p>
                            <div className="padding-all-sides">
                                    <div className="form-group text-center">
                                        <TextField
                                            sx={{minWidth: '500px'}}
                                            required
                                            variant="filled"
                                            id="kitchenName"
                                            label="Kitchen Name"
                                            type="text"
                                            onChange={(e)=>{setkitchenName(e.target.value)}}
                                        />
                                        <div className="paddingTop"></div>
                                        <div className="error-message">
                                            {kitchenNameError}
                                        </div>
                                    </div>

                                    <br />
                                    <div className="form-group text-center">
                                        <TextField
                                            sx={{minWidth: '500px'}}
                                            variant="filled"
                                            id="kitchenDescription"
                                            label="Kitchen Description"
                                            type="text"
                                            multiline
                                            inputProps={{ maxLength: 255 }}
                                            onChange={(e)=>{setkitchenDescription(e.target.value)}}
                                        />
                                    </div>
                                    <br />
                                    <div className="form-group text-center">
                                        <TextField
                                            sx={{minWidth: '500px'}}
                                            required
                                            variant="filled"
                                            id="kitchenLocation"
                                            label="Kitchen Location"
                                            type="text"
                                            onChange={(e)=>{setkitchenLocation(e.target.value);}}
                                        />
                                        <div className="error-message">
                                            {kitchenLocationError}
                                        </div>
                                    </div>
                                    <br />
                                    <div className="form-group" style={{paddingLeft: "18px"}}>
                                        <h5>Photo of Kitchen</h5>
                                        <input type="file" id="fileKitchen" name="file" onChange={onChangeFile} accept=".png, .jpeg,.jpg"/>
                                    </div>
                                    <p className="error-message">{fileKitchenError}</p> 
                                    <br />
                                    <div className="button-size" style={{paddingLeft: "18px"}}>
                                        <Button name="signup" variant="contained" sx={{color: 'white'}} onClick={handleSubmit}>next</Button>
                                    </div>

                                <br />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
}

export default Kitchen;

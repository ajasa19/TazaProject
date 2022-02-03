import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CertificationIconImg from './certification.jpg'
import Axios from "axios";
import Button from '@mui/material/Button';

import {
    BrowserRouter as Router,
    withRouter
  } from "react-router-dom";

const DriverCertification = (props) => {

    const {history} = props;
    const handleLinkClick = (pageURL) => {
      history.push(pageURL)
    }

    const [fileFront, setfileFront] = React.useState<any>();
    const [fileBack, setfileBack] = React.useState<any>();
    const [uploadError, setUploadError] = React.useState("");
    const [uploadSuccess, setuploadSuccess] = React.useState(false);

    const onFileChangeFront = event => {
        setfileFront(event.target.files[0]);
    };

    const onFileChangeBack = event => {
        setfileBack(event.target.files[0]);
    };
    
    const onFileUpload = () => {
        if(fileFront !== undefined && fileBack !== undefined){
            var tempIdString = localStorage.getItem("profileId");
            var profileId;
            if (tempIdString) 
                profileId = JSON.parse(tempIdString || "");

            Axios.get<any>("http://localhost:3001/profile/getProfile", {
                params: {
                    profileId: profileId,
                },
                }).then(response => {
                //Rename user files to formatted file name... 'drivername_Front.jpg' and 'drivername_Back.jpg'
                var userName = response.data[0].userName;

                var fileFrontName = profileId + "_" + userName.replace(/ /g,"_") + "_Front." + fileFront.name.split('.').pop();
                var fileBackName = profileId + "_" + userName.replace(/ /g,"_") + "_Back." + fileBack.name.split('.').pop();
                
                //create formdata obj, required to send to node.js
                var formData = new FormData();
                formData.append('id', profileId);
                formData.append('file', fileFront, fileFrontName);
                formData.append('file', fileBack, fileBackName);

                //Send formdata to node.js server, required to include header with content type
                Axios.post("http://localhost:3001/profile/updateDriversLicense", 
                            formData, 
                        { headers: 
                            {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                .then((response) => {
                    if(response.statusText === "OK"){
                         setUploadError("");
                         setuploadSuccess(true);
                        //On successful upload allow user to move to next page
                    }
                });
            });
        }else{
            setUploadError("Please enter 2 valid drivers license photos");
        }
    };

    return (
        <Router>
        <div>
              <Container>

                <Row>
                    <Col md={5} sm={6}>
                        <br />
                        <br />
                        <br />
                        <div className="image">
                        <img src={CertificationIconImg} width="100%" alt="driver" />
                        </div>
                        <br />
                        <br />

                    </Col>
                    <Col md={6} sm={12}>
                        <br />
                        <br />
                        <h1 className="text-center">Upload Drivers License</h1>
                        <hr />
                        <p className="text-center">Please submit a clear photo of both the back and front of your drivers license.</p>
                        <div className="padding-all-sides">
                        <h5>Drivers License Front</h5>
                        <input type="file" id="fileFront" name="file" onChange={onFileChangeFront} accept=".png,.jpg,.jpeg"/>
                        <br />
                        <br />
                        <br />
                        <h5>Drivers License Back</h5>
                        <input type="file" id="fileBack" name="file" onChange={onFileChangeBack} accept=".png,.jpg,.jpeg"/>
                        <br />
                        <br />
                        <Button name="signup" variant="contained" color='info' onClick={onFileUpload}>Upload</Button>
                        <br />

                        <p className="error-message">{uploadError}</p>
                        {uploadSuccess &&
                            <div>
                                <p style={{ color: 'green' }}>Upload Success!</p>
                                <Button name="signup" variant="contained" sx={{color: 'white'}} onClick={() => handleLinkClick("/becomeapartner/confirmation")}>Confirm License</Button>
                            </div>
                        }
                        </div>
                    </Col>
                </Row>
              </Container>
              
          </div>
          </Router>
    );
}

export default withRouter(DriverCertification);
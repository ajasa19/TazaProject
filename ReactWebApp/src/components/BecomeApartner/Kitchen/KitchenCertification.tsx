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

    const [fileHandler, setfileHandler] = React.useState<any>();
    const [fileInspection, setfileInspection] = React.useState<any>();
    const [uploadError, setUploadError] = React.useState("");
    const [uploadSuccess, setuploadSuccess] = React.useState(false);

    const onChangeFileHandler = event => {
        setfileHandler(event.target.files[0]);
    };

    const onChangeFileInspection = event => {
        setfileInspection(event.target.files[0]);
    };
    
    const onFileUpload = () => {
        if(fileHandler !== undefined && fileInspection !== undefined){
            var tempIdString = localStorage.getItem("profileId");
            var profileId;
            if (tempIdString) 
                profileId = JSON.parse(tempIdString || "");

            Axios.get<any>("http://localhost:3001/kitchen/getKitchenByUser", {
                params: {
                    id: profileId,
                },
                }).then(response => {
                  //console.log(response.data);
                  //Rename users files to formatted file name... 'kitchenname_Handler.pdf' and 'kitchenname_Inspection.jpg'
                  var kitchenId = response.data[0].id;
                  var kitchenName = response.data[0].name;

                  var fileHandlerName = kitchenId + "_" + kitchenName.replace(/ /g,"_") + "_Handler." + fileHandler.name.split('.').pop();
                  var fileInspectionName = kitchenId + "_" + kitchenName.replace(/ /g,"_") + "_Inspection." + fileInspection.name.split('.').pop();
                  
                  //create formdata obj, required to send to node.js
                  var formData = new FormData();
                  formData.append('id', kitchenId);
                  formData.append('file', fileHandler, fileHandlerName);
                  formData.append('file', fileInspection, fileInspectionName);

                  //Send formdata to node.js server, required to include header with content type
                  Axios.post("http://localhost:3001/kitchen/updateKitchenCertification", 
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
            setUploadError("Please enter 2 valid kitchen certification PDF files");
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
                        <img src={CertificationIconImg} width="100%" alt="kitchen" />
                        </div>
                        <br />
                        <br />

                    </Col>
                    <Col md={6} sm={12}>
                        <br />
                        <br />
                        <h1 className="text-center">Upload Kitchen Certifications</h1>
                        <hr />
                        <p className="text-center">Please submit 2 PDF files that contians your kitchens Food Handler Certification and Food Safety Inspection.</p>
                        <div className="padding-all-sides">
                        <h5>Food Handler Certification</h5>
                        <input type="file" id="fileHandler" name="file" onChange={onChangeFileHandler} accept=".png, .jpeg,.jpg"/>
                        <br />
                        <br />
                        <br />
                        <h5>Food Safety Inspection</h5>
                        <input type="file" id="fileInspection" name="file" onChange={onChangeFileInspection} accept=".png, .jpeg,.jpg"/>
                        <br />
                        <br />
                        <Button name="signup" variant="contained" color='info' onClick={onFileUpload}>Upload</Button>
                        <br />

                        <p className="error-message">{uploadError}</p>
                        {uploadSuccess &&
                            <div>
                                <p style={{ color: 'green' }}>Upload Success!</p>
                                <Button name="signup" variant="contained" sx={{color: 'white'}} onClick={() => handleLinkClick("/becomeapartner/confirmation")}>Confirm Kitchen</Button>
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
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import emailjs from "emailjs-com";
import {
    BrowserRouter as Router,
    withRouter
  } from "react-router-dom";
  
  function sendEmail(e) {
    e.preventDefault();

emailjs.sendForm('gmail', 'template_9pccjk7', e.target, 'user_FZEsnPm1mNEgEYr0vFzay')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    e.target.reset()
}
  const Header = props => {

        return(
            <div>
            <br />
            <br />
            <br />
                <div style={{ textAlign: "center", overflowY:"hidden" }}>
                    <h1 >Need Help?</h1> 
                    <h3>Contact us here today</h3>
                </div>
            <br />
            <br />
            <br />
            <br />
            <hr />
            <br />
            <br />
            <Router>
                <Box
                    mt={2}
                    display="flex"  
                    justifyContent="center"
                > 
                    <Card 
                        sx={{ 
                            maxWidth: 600,
                            minHeight: 150,
                            boxShadow: '5px 5px 10px 3px rgba(0,0,0,0.62)',
                            cursor: 'pointer'
                        }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Contact us by email
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Do you have any question or comments please reach out by email to contact us!
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <form onSubmit={sendEmail}>
                            <div className="row pt-5 mx-auto">
                                <div className="col-8 form-group mx-auto">
                                    <input type="text" className="form-control" placeholder="Name" name="name"/>
                                </div>
                                <div className="col-8 form-group pt-2 mx-auto">
                                    <input type="email" className="form-control" placeholder="Email Address" name="email"/>
                                </div>
                                <div className="col-8 form-group pt-2 mx-auto">
                                    <input type="text" className="form-control" placeholder="Subject" name="subject"/>
                                </div>
                                <div className="col-8 form-group pt-2 mx-auto">
                                    <textarea className="form-control" id=""  placeholder="Your message" name="message"></textarea>
                                </div>
                                <div className="col-8 pt-3 mx-auto">
                                    <Button type="submit" variant="contained" color="primary">Send Message</Button>
                                </div>
                            </div>
                        </form>
                        </CardActions>                    
                    </Card>
                    <br/>
                    
                </Box>
                <Box
                    mt={2}
                    display="flex"  
                    justifyContent="center"
                > 
                <Card
                    sx={{ 
                            minWidth: 600,
                            minHeight: 150,
                            boxShadow: '5px 5px 10px 3px rgba(0,0,0,0.62)',
                            cursor: 'pointer'
                        }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                FAQ
                            </Typography>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Who created this application?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    A Team of 5 Algonquin Computer Engineering Technology - Computing Science created this project. Known as the 5-bit system.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>How to become a driver?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    In the app drawer on the left side of the screen there will be an option to open a kitchen or become a driver.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>How to open a kitchen?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    In the app drawer on the left side of the screen there will be an option to open a kitchen or become a driver.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>As an owner of a kitchen how do I upload food?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Very good question!
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Where do I put in my address?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Top header bar beside the search bar.
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Box>
            </Router>
        </div>
    );
    
}

export default withRouter(Header);
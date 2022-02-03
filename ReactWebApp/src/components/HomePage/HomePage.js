import { Grid, Button } from "@mui/material";
import food_1 from "./food-1.png";
import "./HomePage.css";
import { Container } from '@mui/material';
import Aos from "aos";
import "aos/dist/aos.css"
import { React, useEffect } from 'react';
import Ripples from "react-ripples";


const HomePage = () => {

    useEffect(() => {

        return () => {
            
            Aos.init();
            Aos.refresh();
        }
    }, []);

    return (
        <div>
            <Grid container fixed>
                <Grid item xs={12}>

                    <div className="welcome-area">
                        <div className="heading">Welcome to Taza!</div>
                        <div className="subheading">Fresh Food Only For You!</div>
                        <div>
                            <div className="container">
                                <div className = "item">
                            <div className="left-button-pos">
                            <Button variant="contained">Signup
                                </Button>
                                    </div>
                                    </div>
                                <div className="item">

                            <div className="right-button-pos">
                                <Button variant="contained">Login
                                </Button>
                                </div>
                                </div>
                                </div>
                            {/*<Ripples color="rgba(211, 207, 207,0.5)">*/}
                            {/*    <button className="btn">Signup</button>*/}
                            {/*</Ripples>*/}
                        </div>
                    </div>

                </Grid>
            </Grid>

            <br />

            <br />
            <br />
            <div style={{ textAlign: "center", overflowY:"hidden" }}>
                <h1 >What is Taza?</h1> 
                <h4>Taza is ...</h4>
            </div>
            <br />
            <br />
            <br />
            <br />
            <hr />
            <br />
            <br />
            <Container fixed>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <div>
                            <img src={food_1} width="100%" /></div>
                    </Grid>
                    <Grid item md={6}>
                        <div className="circle">
                            <div style={{ textAlign: "center" }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </div>
                        </div>
                    </Grid>

                </Grid>
                <br />
                <br />
                <br />
                <br />
                <hr />
                <br />
                <br />
                <Grid container spacing={3}>

                    <Grid item md={6}>
                        <div className="circle">
                            <div style={{ textAlign: "center" }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </div>
                        </div>
                    </Grid>

                    <Grid item md={6}>
                        <div>
                            <img src={food_1} width="100%" style={{ float: "right" }} />
                        </div>
                    </Grid>

                </Grid>

                <br />
                <br />
                <br />
                <br />
            </Container>

        </div>
    );
};

export default HomePage;

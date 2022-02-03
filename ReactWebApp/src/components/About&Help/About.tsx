import chefIconImg from './food-1.png'
import {
    withRouter
  } from "react-router-dom";
import { Container, Grid } from '@mui/material';
  
  const Header = props => {

        return(
            <div>

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
                            <img src={chefIconImg} width="100%" alt="Chef" /></div>
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
                            <img src={chefIconImg} width="100%" alt="Chef" style={{ float: "right" }} />
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
    
}

export default withRouter(Header);
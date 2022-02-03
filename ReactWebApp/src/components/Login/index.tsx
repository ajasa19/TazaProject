import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";
import Axios from 'axios';
import _ from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';
import PoutineIconImg from './Poutine.jpg';

async function loginUser(credentials) {
     return Axios.get("http://localhost:3001/login/getToken", {
         params: {
            username: credentials.username,
            password: credentials.password
         }
        }).then((response) => {
            //console.log(JSON.stringify(response.data));
            return response.data;
        });
}

// function postToken(token){
//     Axios.post<any>("http://localhost:3001/login/postToken", {
//     }).then((response) => {
//         console.log(JSON.stringify(response.data));
//     });
// }

const Login = ({ setToken }) => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getToken = await loginUser({
      username,
      password,
    });

    let token = _.pick(getToken, 'token');
    let id = _.pick(getToken, 'id');

    if(!_.isEmpty(token)){
        window.location.replace("/");
        setToken(token);
        localStorage.setItem("profileId", id.id);
    } else{
        seterrorMsg('Incorrect Login');
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={6} sm={12}>
                <br /><br /> <br />
                <div className="image">
                    <img src={PoutineIconImg} width="100%" alt="Poutine" />
                </div>
                <br /><br />

          </Col>
          <Col md={6} sm={12}>
                <br /><br />
                <h1 className="text-center">Welcome back</h1>
                <hr />
                <div className="padding-all-sides"></div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" required value={username} onChange={(e) => setusername(e.target.value)}
                             className="form-control"/>
                  </div>
                  <br />
                        <div className="form-group">
                            <label htmlFor="email">Password</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                             className="form-control"/>
                        </div>
                        <a href="/Login/ResetPassword">Forgot password?</a>
               
                        <br /><br />

      <div>
        <Typography gutterBottom variant="body1" sx={{color: 'red'}}>
            {errorMsg}
        </Typography>
        <p className="text-center">New to Taza? <a href="/">Create an Account</a></p>

      </div>

      <div>
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </div>
    </form>
    </Col>
        </Row>
      
      </Container>
    </div>
    
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";
import Axios from 'axios';
import _ from 'lodash';

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
        window.location.reload();
        setToken(token);
        localStorage.setItem("profileId", id.id);
    } else{
        seterrorMsg('Incorrect Login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        variant="filled"
        type="text"
        required
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>
        <Typography gutterBottom variant="body1" sx={{color: 'red'}}>
            {errorMsg}
        </Typography>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>

      <div>
        {/* <Button type="submit" variant="contained" color="primary">
          Forgot password
        </Button> */}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;

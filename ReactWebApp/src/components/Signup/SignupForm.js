import React from "react";
import Axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';
import im from './Shawarmah_new.png'
import './SignupForm.css';
import * as Yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import _ from 'lodash';
//import { useHistory } from "react-router-dom";
//import { useState } from "react";

const SignupForm = ({ setToken }) => {


    const signupSchema = Yup.object().shape({
        username: Yup.string().required("Required").min(6, "Username must contain at least 6 characters"),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required("Password cannot be blank").min(8, 'Password is too short - should be 8 chars minimum.')
    })

     const [duplicateError, setduplicateError] = React.useState('');
    // const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('');

    // const history = useHistory();
    // let are_all_fields_valid = false;

    async function loginUser(credentials) {
       return Axios.get("http://localhost:3001/register/getToken", {
           params: {
               username: credentials.username,
               password: credentials.password
           }
       }).then((response) => {
           //console.log(JSON.stringify(response.data));
           return response.data;
       });
    }
    const register = (usr, pas, em) => {
        //('Inside register function!')
        Axios.post('http://localhost:3001/register', {
            username: String(usr),
            password: String(pas),
            email: String(em)
        }).then((response) => {
            //console.log(response.data)
            if(response.data === "OK"){
                setduplicateError('');
                login(usr, pas);
            }

            if(response.data === "DUPLICATE"){
                setduplicateError('User already exists.');
            }
        });
    }

    const login = async (username, password) =>  {
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
        }
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        validationSchema: signupSchema,
        onSubmit: (values) => {
            
            if (values.username && values.password && values.email) {
                register(values.username, values.password, values.email);
            }
        }
    });
    
    return (
        <>
            <br />
            <br />


            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4} justifyContent='center' textAlign='center' alignItems='center'>

                    <Grid item md={6}>
                        <img src={im} width='75%' alt="Shwarma"/>
                    </Grid>

                    <Grid item md={4}>
                        <div><h1>Register</h1></div>
                        <div>

                            <TextField style={{ width: '100%' }} id="username" label="Username" autoComplete="off" variant="standard" size="medium" name="username" value={formik.values.username} onChange={formik.handleChange} error={formik.touched.username && Boolean(formik.errors.username)}

                                helperText={formik.touched.username && formik.errors.username}
                            />

                        </div>
                        <div style={{ paddingTop: 20 }}></div>
                        <div>
                            <TextField type="password" style={{ width: '100%' }} id="password" label="Password" autoComplete="off" variant="standard" name="password" value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} />
                        </div>
                        <div style={{ paddingTop: 20 }}></div>
                        <div>
                            <TextField style={{ width: '100%' }} id="email" label="Email" autoComplete="off" variant="standard" name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
                        </div>
                        <div style={{ paddingTop: 50 }}></div>
                        <div>
                            <Button style={{ color: 'white' }} variant="contained" autoComplete="off" type="submit">Register</Button>
                            <p style={{color: 'red'}}>{duplicateError}</p>
                        </div>
                        <p>Already have an account? <a href="/Login">Log in</a></p>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

SignupForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default SignupForm;

// TO DO: Make sure user cannot add spaces in the fields
// TO DO: Check all fields are correct then able to submit
// TO DO: Redirect the user to the dashboard
// TO DO: Check if the user is unique

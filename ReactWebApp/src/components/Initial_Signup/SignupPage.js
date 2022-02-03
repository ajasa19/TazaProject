import { Grid, TextField, Button, Switch, FormControlLabel, Box } from '@mui/material';
import { Container } from 'react-bootstrap';
import './SignupPage.css';
import chicken from './Chicken.jpg';
import GoogleButton from 'react-google-button';
//import Form from './Form';
import firebase from './Firebase/firebase';
import { Redirect } from 'react-router-dom';
import { React } from 'react';
import { FacebookLoginButton } from 'react-social-login-buttons';
//import MyFacebookLoginButton from './Components/Buttons/facebook_button';
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';
//import { FormControl, Input, FormHelperText } from '@mui/material';

const Signup = () => {
	const sign_up_facebook = () => {
		var google_provider = new firebase.auth.FacebookAuthProvider();
		firebase
			.auth()
			.signInWithPopup(google_provider)
			.then((result) => {
				var token = result.credential.accessToken;
				var user = result.user;
				// <Redirect to='/' />
				//console.log('Successful');
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				var email = error.email;
				var credential = error.credential;
				//console.log(errorCode, errorMessage, email, credential);
			});
	};

	const sign_up_google = () => {
		var google_provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(google_provider)
			.then((result) => {
				var token = result.credential.accessToken;
				var user = result.user;
				// <Redirect to='/' />
				//console.log('Successful');
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				var email = error.email;
				var credential = error.credential;
				//console.log(errorCode, errorMessage, email, credential);
			});
	};
	return (
		<div className="signup-page">
		
			<div className="padding-top"></div>
			<div className="padding-top"></div>
			<Container fixed>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<img src={chicken} alt="signup" className="signup-img" width="100%" />
					</Grid>
					<Grid item xs={12} md={6}>
						<div className="card-box">
							<h4 className="card-title">
								Register
								<br />
							</h4>
						</div>
						<Box mt={4} />
						<form>
							<div className="form-group">
								<div className="center">
									<TextField
										style={{ width: '75%', paddingtop: 20 }}
										id="outlined-basic"
										size="small"
										label="Email Address"
										variant="standard"
										className="form-control"
									/>
								</div>

								<Box mt={4} />
								<div className="center">
									<FormControlLabel control={<Switch defaultChecked />} label="Remember me" />
								</div>
								<Box mt={4} />
								<div className="center">
									<Button
										style={{ backgroundColor: '#F32B00 ', color: '#ffff', width: '55%' }}
										variant="contained"
									>
										Register
									</Button>
								</div>

								<Box mt={4} />
								<div className="center"></div>
								<hr style={{ width: '75%' }} />
								<Box mt={2} />

								<div className="center">OR</div>
								<Box mt={4} />
								<div className="center">
									<GoogleButton style={{ width: '55%' }} onClick={sign_up_google} />
								</div>
								<Box mt={1} />
								<div className="center">
									<FacebookLoginButton onClick={sign_up_facebook} style={{ width: '55%' }} />
								</div>
							</div>
						</form>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};
export default Signup;

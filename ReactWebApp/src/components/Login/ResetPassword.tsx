import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ResetPassword = ({ handleClose }) => {
    // const classes = useStyles();
    // create state variables for each input
    const [email, setEmail] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        //console.log(email);
        handleClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <div>
                <Button type="submit" variant="contained" color="primary">
                    Send email
                </Button>
            </div>
        </form>
    );
};

export default ResetPassword;
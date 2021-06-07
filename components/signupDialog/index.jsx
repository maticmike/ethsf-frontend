import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, TextField, Button } from '@material-ui/core';
import { useStyles } from './styles';
const SignupDialog = ({ isSignupOpen, handleSignupClose }) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const account = useSelector(state => state.account);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
    handleSignupClose();
  };
  return (
    <>
      <Dialog open={isSignupOpen} close={handleSignupClose}>
        <h1 className={classes.root}>Signup</h1>
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            variant="filled"
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="filled"
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <TextField
            label="Username"
            variant="filled"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField label="Eth Address" variant="filled" required disabled value={account.address} />
          <div>
            <Button variant="contained" onClick={handleSignupClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default SignupDialog;

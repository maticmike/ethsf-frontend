import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, TextField, Button, InputLabel, Select, FormControl } from '@material-ui/core';
import { useStyles } from './styles';
const SignupDialog = ({ isSignupOpen, handleSignupClose }) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('');

  const account = useSelector(state => state.account);

  const handleSubmit = async e => {
    e.preventDefault();

    //sign with metamask
    const signature = await account.signer.signMessage('Register');

    //1.Register User
    // registerNewUserDb(account.address, username, firstName, lastName, signature, email, accountType);

    //2. Get the newly registered profile

    //3. Store it in redux

    //4. Close Modal
    handleSignupClose();
  };
  return (
    <Dialog open={isSignupOpen}>
      <h1 className={classes.root}>Signup</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <TextField
          label="Username"
          variant="outlined"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField label="Eth Address" variant="outlined" required disabled value={account.address} />
        <FormControl className={classes.accountTypeDimensions}>
          <InputLabel htmlFor="select-account-type">Select Account Type</InputLabel>
          <Select
            native
            variant="outlined"
            value={accountType}
            onChange={e => setAccountType(e.target.value)}
            id="select-account-type"
          >
            <option value={'business'}>Business</option>
            <option value={'influencer'}>Influencer</option>
          </Select>
        </FormControl>
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
  );
};

export default SignupDialog;

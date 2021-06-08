import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { connectAccountThunk, disconnectWallet } from '../../../redux/actions/account';
import { shortenedEthAddress } from '../../../web3/helpers';

const ConnectButton = ({ handleSignupOpen }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  const account = useSelector(state => state.account);
  const dispatch = useDispatch();

  const handleConnectivity = () => dispatch(connectAccountThunk());
  const handleRegister = () => handleSignupOpen();
  const handleLogout = () => dispatch(disconnectWallet());

  const renderCorrectButton = () => {
    if (!isRegistered && account?.address === null) {
      return (
        <Button variant="contained" onClick={handleConnectivity}>
          Connect
        </Button>
      );
    }
    if (!isRegistered)
      return (
        <Button variant="contained" onClick={handleRegister}>
          Signup
        </Button>
      );
    return (
      <Button variant="contained" onClick={handleLogout}>
        {shortenedEthAddress(account?.address)}
      </Button>
    );
  };

  return <>{renderCorrectButton()}</>;
};

export default ConnectButton;

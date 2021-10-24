import React, { useState, useEffect } from 'react';
import consola from 'consola';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { connectAccountThunk, disconnectWallet } from '../../../redux/actions/account';
import { clearJwtRedux } from '../../../redux/actions/jwt';
import { signInWalletWeb3 } from '../../../web3';
import { shortenedEthAddress } from '../../../web3/helpers';
import { generateNewSignedJWT } from '../../../web3/auth';
import { getUserFromEthAddressDb } from '../../../services/api/userService';

const ConnectButton = ({ handleSignupOpen }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [profileInDb, setProfileInDb] = useState(null);
  const account = useSelector(state => state.account);
  const jwt = useSelector(state => state.jwt);
  const dispatch = useDispatch();

  //Connect to DB
  useEffect(async () => {
    async function getUserDb() {
      try {
        const profileInDb = await getUserFromEthAddressDb(account?.address);
        profileInDb === undefined ? null : setIsRegistered(true);
        setProfileInDb(profileInDb);
      } catch (error) {
        consola.error(error, 'ConnectButton.getUserDb: Error');
      }
    }
    getUserDb();
    return () => {
      consola.info('ConnectButton: cleanup getUserDb() state');
    };
  }, [account]);

  useEffect(async () => {
    consola.info(jwt, 'the jwt in useEffect');
    return () => {
      consola.info('ConnectButton: cleanup jwt state');
    };
  }, [jwt]);

  //Connect to Web3
  const handleConnectivityWeb3 = async () => dispatch(connectAccountThunk());

  //Sign In With JWT
  const handleSignIn = async () => {
    //clear auth token
    clearJwtRedux();
    //if account web3 connect
    if (account.address === null) {
      consola.error('No web3 account detected');
      return;
    }
    //get profile from db
    if (profileInDb === undefined) {
      consola.error('No profile found in db');
      return;
    }
    //generate jwt
    await generateNewSignedJWT(account?.address, account?.signer);
    if (jwt) {
      //run onboard logic
      // dispatch(connectAccountThunk());
    }
  };
  const handleRegister = () => handleSignupOpen();
  const handleLogout = () => dispatch(disconnectWallet());

  const renderCorrectButton = () => {
    if (!isRegistered && account?.address === null) {
      return (
        <Button variant="contained" onClick={handleConnectivityWeb3}>
          Connect
        </Button>
      );
    }
    if (account?.address && isRegistered) {
      return (
        <Button variant="contained" onClick={handleSignIn}>
          Sign In
        </Button>
      );
    }
    if (account?.address && !isRegistered)
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

import React, { useState, useEffect } from 'react';
import consola from 'consola';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { connectAccountThunk, logoutAccountAndWallet } from '../../../redux/actions/account';
import { clearJwtLocalStorage } from '../../../services/api/jwtTokenService';
import { clearJwtRedux } from '../../../redux/actions/jwt';
import { shortenedEthAddress } from '../../../web3/helpers';
import { getUserFromEthAddressDb } from '../../../services/api/userService';

const ConnectButton = ({ handleSignupOpen }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [profileInDb, setProfileInDb] = useState(null);
  const account = useSelector(state => state.account);
  // const jwt = useSelector(state => state.jwt);
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

  //Connect to Web3
  const handleConnectivityWeb3 = async () => dispatch(connectAccountThunk());

  const handleRegister = () => handleSignupOpen();
  // const handleLogout = () => dispatch(loginAccount());

  const renderCorrectButton = () => {
    if (!isRegistered && account?.address === null) {
      return (
        <Button variant="contained" onClick={handleConnectivityWeb3}>
          Connect
        </Button>
      );
    }
    if (account?.address && !isRegistered)
      return (
        <Button variant="contained" onClick={handleRegister}>
          Signup
        </Button>
      );

    if (account?.address && account?.isLoggedIn) {
      return (
        <Button variant="contained" onClick={() => console.log('i am logging out')}>
          Logout
        </Button>
      );
    }

    return (
      <Button variant="contained" onClick={() => console.log('logout')}>
        {shortenedEthAddress(account?.address)}
      </Button>
    );
  };

  return <>{renderCorrectButton()}</>;
};

export default ConnectButton;

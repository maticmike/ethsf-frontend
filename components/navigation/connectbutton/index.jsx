import React, { useState, useEffect } from 'react';
import consola from 'consola';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { connectAccountThunk } from '../../../redux/actions/account';
import { storeFamepayFactoryThunk } from '../../../redux/actions/famepayFactory';
import { shortenedEthAddress } from '../../../web3/helpers';
import { clearUserAuthAll } from '../../../web3/auth';

const ConnectButton = ({ handleSignupOpen }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [profileInDb, setProfileInDb] = useState(null);
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();

  //Connect to DB
  useEffect(async () => {
    async function getUserDb() {
      try {
        if (account?.address === null) {
          return;
        } else {
          // const profileInDb = await getUserFromEthAddressDb(account?.address);
          // profileInDb === undefined ? null : setIsRegistered(true);
          // setProfileInDb(profileInDb);
          dispatch(storeFamepayFactoryThunk());
        }
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
  const handleConnectivityWeb3 = () => dispatch(connectAccountThunk());

  const handleRegister = () => handleSignupOpen();

  const handleLogout = () => clearUserAuthAll();

  const renderCorrectButton = () => {
    if (account?.address === null) {
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
        <Button variant="contained" onClick={handleLogout}>
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

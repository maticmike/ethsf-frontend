import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
import { connectAccountThunk, disconnectWallet } from '../../../redux/actions/account';
import { shortenedEthAddress } from '../../../web3/helpers';
import { useStyles } from './styles';

const ConnectButton = () => {
  const router = useRouter();
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();
  const handleConnectivity = () => {
    if (account.address === null) {
      dispatch(connectAccountThunk());
    } else {
      //   // Redirect to homepage if on mynft or admin page
      //   const isOnConnectedOnlyPage = router.pathname === '/mynft' || router.pathname === '/admin';
      //   if (isOnConnectedOnlyPage) router.push('/marketplace');
      dispatch(disconnectWallet());
    }
  };

  return (
    <Button variant="contained" onClick={handleConnectivity}>
      {shortenedEthAddress(account?.address) || 'connect'}
    </Button>
  );
};
export default ConnectButton;

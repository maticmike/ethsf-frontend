import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
// import { connectWalletThunk, disconnectWallet } from '../../redux/actions/account';
import { shortenedEthAddress } from '../../web3/helpers';
import { useStyles } from './styles';

const ConnectButton = () => {
  const classes = useStyles();
  const router = useRouter();
  // const account = useSelector(state => state.account);
  // const dispatch = useDispatch();
  const handleConnectivity = () => {
    console.log('test connect');
    // if (account.address === null) {
    //   dispatch(connectWalletThunk());
    // } else {
    //   // Redirect to marketplace if on mynft or admin page
    //   const isOnConnectedOnlyPage = router.pathname === '/mynft' || router.pathname === '/admin';
    //   if (isOnConnectedOnlyPage) router.push('/marketplace');
    //   dispatch(disconnectWallet());
    // }
  };

  return (
    <Button className={classes.connectButton} variant="contained" onClick={handleConnectivity}>
      {/* {shortenedEthAddress(account?.address) || 'connect'} */}
      Connect
    </Button>
  );
};
export default ConnectButton;

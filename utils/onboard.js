import BlocknativeSDK from 'bnc-sdk';
import Onboard from 'bnc-onboard';
import { bootstrapFactory, signInWalletWeb3 } from '../web3';
import { validateJwtFromDb, getJwtLocalStorage } from '../services/api/jwtTokenService';
import { getUserFromEthAddressDb } from '../services/api/userService';
import store from '../redux/store';
import { loginAccountThunk } from '../redux/actions/account';

const rinkeby = 4;
const rpcUrl = 'https://rinkeby.infura.io/v3/8bbc1bc12f9348b3ad49a4ee99e370b2';

let currentLoggedInAccountFromStore;

export const getCurrentLoggedInAccountStore = accountFromThunk => {
  console.log(accountFromThunk, 'the account from thunk');
  currentLoggedInAccountFromStore = accountFromThunk.account;
  return currentLoggedInAccountFromStore;
};

export const onBoardInitialize = () => {
  return Onboard({
    dappId: process.env.ONBOARD_KEY,
    networkId: rinkeby,
    subscriptions: {
      wallet: wallet => {
        // if (wallet.name) {
        // bootstrapFactory();
        window.localStorage.setItem('selectedWallet', wallet.name);
        // }
      },
      //Necessary for switching a meta mask account
      address: async ethAddress => {
        //if not equal were switching accounts or not logged in
        if (ethAddress != currentLoggedInAccountFromStore) {
          //get profile from db
          const profile = await getUserFromEthAddressDb(ethAddress);
          //if jwt exists in local storage
          if (getJwtLocalStorage()) {
            //validate token
            const isTokenValid = await validateJwtFromDb(ethAddress);
            if (isTokenValid) {
              if (profile) {
                store.dispatch(loginAccountThunk());
              }
            }
            //   //if profile not even found in db
          } else if (!profile) {
            alert('please signup');
          }
        } else {
          console.log('user has no eth address');
        }
      },
    },
    walletSelect: {
      wallets: [
        { walletName: 'metamask', preferred: true },
        {
          walletName: 'ledger',
          rpcUrl,
          preferred: true,
        },
        {
          walletName: 'walletConnect',
          infuraKey: 'cea9deb6467748b0b81b920b005c10c1',
          preferred: true,
        },
        {
          walletName: 'fortmatic',
          apiKey: process.env.FORMATIC_DEV,
          preferred: true,
        },
        { walletName: 'coinbase' },
      ],
    },
  });
};

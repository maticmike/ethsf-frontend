import BlocknativeSDK from 'bnc-sdk';
import Onboard from 'bnc-onboard';
import { bootstrapFactory, signInWalletWeb3 } from '../web3';

const rinkeby = 4;
const rpcUrl = 'https://rinkeby.infura.io/v3/8bbc1bc12f9348b3ad49a4ee99e370b2';

let currentLoggedInAccountFromStore;

export const getCurrentLoggedInAccountStore = accountFromThunk => {
  currentLoggedInAccountFromStore = accountFromThunk.account;
};

export const onBoardInitialize = () => {
  return Onboard({
    dappId: process.env.ONBOARD_KEY,
    networkId: rinkeby,
    subscriptions: {
      wallet: wallet => {
        // if (wallet.name) {
        //run bootstrap (i think for switch account)
        // bootstrapFactory();
        window.localStorage.setItem('selectedWallet', wallet.name);
        // }
      },
      //Necessary for switching a meta mask account
      address: async address => {
        //if web3ethers.account is null
        if (address != currentLoggedInAccountFromStore || currentLoggedInAccountFromStore) {
          console.log('run connect account thunk');
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

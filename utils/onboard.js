import Onboard from 'bnc-onboard';
import { bootstrapFactory, getWalletProvider } from '../web3';

import { loginAccountOnSwitchThunk, logout } from '../redux/actions/account';
import { clearUserAuthAll } from '../web3/auth';
import store from '../redux/store';

const ropsten = 3;
const rpcUrl = `https://ropsten.infura.io/v3/${process.env.ROPSTEN_KEY}`;

export const onBoardInitialize = () => {
  return Onboard({
    dappId: process.env.ONBOARD_KEY,
    networkId: ropsten,
    subscriptions: {
      wallet: wallet => {
        // if (wallet.name) {
        // bootstrapFactory();
        window.localStorage.setItem('selectedWallet', wallet.name);
        // }
      },
      //Necessary for switching a meta mask account
      address: async ethAddress => {
        const ethAddressInRedux = store.getState();

        //get profile from db
        // const profile = await getUserFromEthAddressDb(ethAddress);

        // const ethAddressInDb = profile?.data?.payload?.userEthAddress;

        //user is valid profile
        //switching a user
        if (ethAddressInRedux?.account?.address != null) {
          // if (ethAddressInRedux?.account?.address != null) {

          //get provider
          const provider = await getWalletProvider();

          //get balance
          const balanceRaw = await provider.getBalance(ethAddress);
          const balance = balanceRaw.toString();

          // get signer
          const signer = provider.getSigner();

          //login account
          store.dispatch(loginAccountOnSwitchThunk(ethAddress, balance, signer));
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

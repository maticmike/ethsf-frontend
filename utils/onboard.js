import Onboard from 'bnc-onboard';
import { bootstrapFactory, getWalletProvider } from '../web3';
import { getUserFromEthAddressDb } from '../services/api/userService';
import { loginAccountOnSwitchThunk, logout } from '../redux/actions/account';
import { clearUserAuthAll } from '../web3/auth';
import store from '../redux/store';

const rinkeby = 4;
const rpcUrl = 'https://rinkeby.infura.io/v3/8bbc1bc12f9348b3ad49a4ee99e370b2';

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
        const ethAddressInRedux = store.getState();

        //get profile from db
        const profile = await getUserFromEthAddressDb(ethAddress);

        const ethAddressInDb = profile?.data?.payload?.userEthAddress;

        //user is valid profile
        if (profile != undefined) {
          //switching a user
          if (ethAddressInDb != ethAddressInRedux?.account?.address && ethAddressInRedux?.account?.address != null) {
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
          //profile not even found in db
        } else if (!profile) {
          clearUserAuthAll();
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

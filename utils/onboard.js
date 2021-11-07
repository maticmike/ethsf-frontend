import BlocknativeSDK from 'bnc-sdk';
import Onboard from 'bnc-onboard';
import { bootstrapFactory, signInWalletWeb3, getWalletProvider } from '../web3';
import { validateJwtFromDb, getJwtLocalStorage } from '../services/api/jwtTokenService';
import { getUserFromEthAddressDb } from '../services/api/userService';
import { clearUserAuthAll, generateNewSignedJwt } from '../web3/auth';
import { connectAccountThunk, loginAccount, loginAccountOnSwitchThunk, logout } from '../redux/actions/account';
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
        console.log(ethAddress, 'incoming eth addr');

        const ethAddressInRedux = store.getState();
        console.log(ethAddressInRedux, 'eth addr redux');

        //get profile from db
        const profile = await getUserFromEthAddressDb(ethAddress);
        console.log(profile, 'the profile');

        const ethAddressInDb = profile?.data?.payload?.userEthAddress;
        console.log(ethAddressInDb, 'the ethAddressInDb');

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

            console.log(ethAddress, 'a new address was switched to!!!');
            console.log(balance, 'the balance of the new address');
            console.log(signer, 'the isgner of the new eth addresss');

            //generate new jwt
            // await generateNewSignedJwt(ethAddress, signer);

            // const isTokenValid = await validateJwtFromDb(ethAddress);
            //validate token
            // if (isTokenValid) {
            store.dispatch(loginAccountOnSwitchThunk(ethAddress, balance, signer));
            // }
          }
          //profile not even found in db
        } else if (!profile) {
          console.log('profile not found in onboardjs');
        } else {
          console.log('user has no eth address');
        }
        // }
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

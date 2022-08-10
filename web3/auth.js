import consola from 'consola';
import { logoutAccount } from '../redux/actions/account';
import { clearWalletOnboard } from '../web3';
// redux store
import store from '../redux/store';

/**
 * create new token with account, challenge, and signature
 * @function generateNewSignedJwt
 */
export const generateNewSignedJwt = async (ethAddress, signer) => {
  try {
    //Triggers meta mask popup
    await signer.signMessage('loging in');
  } catch (error) {
    consola.error('web3/generateNewSignedJWT():', error);
    clearUserAuthAll();
  }
  return Promise.resolve();
};

/** LOGOUT USER INFO */
export const clearUserAuthAll = async () => {
  //reducer clear account
  store.dispatch(logoutAccount());
  //onboard reset
  await clearWalletOnboard();
};

import consola from 'consola';
import { generateChallengeDb } from '../services/api/userService';
import { generateJwtDb } from '../services/api/jwtTokenService';
import { logoutAccountThunk } from '../redux/actions/account';
import { clearWalletOnboard } from '../web3';
import { setJwtLocalStorage, clearJwtLocalStorage } from '../services/api/jwtTokenService';
// redux store
import store from '../redux/store';

/**
 * create new token with account, challenge, and signature
 * @function generateNewSignedJwt
 */
export const generateNewSignedJwt = async (ethAddress, signer) => {
  try {
    //Get Challenge
    const challenge = await generateChallengeDb(ethAddress);

    //Triggers meta mask popup
    const signature = await signer.signMessage(challenge);

    //generateJWT on dob
    const jwt = await generateJwtDb(ethAddress, challenge, signature);

    //Set jwt in local storage
    jwt ? setJwtLocalStorage(jwt?.data?.token) : clearUserAuthAll();
  } catch (error) {
    consola.error('web3/generateNewSignedJWT():', error);
    clearUserAuthAll();
  }
  return Promise.resolve();
};

/** LOGOUT USER INFO */
export const clearUserAuthAll = async () => {
  //reducer clear account
  logoutAccountThunk();
  //clear local storage
  clearJwtLocalStorage();
  //onboard reset
  await clearWalletOnboard();
};

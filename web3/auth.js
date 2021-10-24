import consola from 'consola';
import { generateChallengeDb } from '../services/api/userService';
import { generateJwtDb } from '../services/api/jwtTokenService';
import { setJwtThunk, clearJwtRedux } from '../redux/actions/jwt';
import { disconnectWallet } from '../redux/actions/account';
import { clearWalletOnboard } from '../web3';
import { clearJwt } from '../services/api/jwtTokenService';
// redux store
import store from '../redux/store';

/**
 * create new token with account, challenge, and signature
 * @function generateNewSignedJWT
 */
export const generateNewSignedJWT = async (ethAddress, signer) => {
  try {
    //Get Challenge
    const challenge = await generateChallengeDb(ethAddress);

    //Sign message
    const signature = await signer.signMessage(challenge);

    //generateJWT
    const jwt = await generateJwtDb(ethAddress, challenge, signature);

    //Set jwt in reducer
    // jwt ? setJwtThunk(jwt) : clearUserAuthAll();
    jwt ? store.dispatch(setJwtThunk(jwt)) : clearUserAuthAll();
  } catch (error) {
    consola.error('web3/generateNewSignedJWT():', error);
    // clearUserAuthAll();
  }
  return Promise.resolve();
};

/** LOGOUT USER INFO */
export const clearUserAuthAll = async () => {
  //reducer clear jwt
  clearJwtRedux();
  //reducer clear account
  disconnectWallet();
  //clear local storage
  clearJwt();
  //onboard reset
  await clearWalletOnboard();
};

import { ethers } from 'eth';
import web3 from 'web3';
import consola from 'consola';
import { generateChallengeDb } from '../services/api/userService';
import { generateJwtDb } from '../services/api/jwtTokenService';
import { setJwtThunk } from '../redux/actions/jwt';
import { clearJwtToken } from '../services/api/jwtTokenService';

/**
 * create new token with account, challenge, and signature
 * @function generateNewSignedJWT
 */
export const generateNewSignedJWT = (ethAddress, signer) => {
  try {
    //Get Challenge
    const { challenge } = await generateChallengeDb(ethAddress);

    //Sign message
    const signature = signer.signMessage(challenge);

    //generateJWT
    const jwt = await generateJwtDb(ethAddress, challenge, signature);

    //Set jwt in reducer
    jwt ? setJwtThunk(ethAddress) : clearUserAuthAll();
  } catch (error) {
    consola.error('web3/generateNewSignedJWT():', error);
    clearUserAuthAll();
  }
  return Promise.resolve();
};

/** LOGOUT USER INFO */
export const clearUserAuthAll = async () => {
  console.log('log out and clear!');
  //logoutWeb() -> isLoggedIn: false, authToken: null, account: null, signer: null
  //reducer clear all
  //clear local storage
  //onboard reset
  //db clear
};

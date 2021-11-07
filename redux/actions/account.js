import consola from 'consola';
import { signInWalletWeb3 } from '../../web3';
import { generateNewSignedJwt } from '../../web3/auth';
import { validateJwtFromDb } from '../../services/api/jwtTokenService';

/* Action Types */
export const REGISTER_USER = 'REGISTER_USER';
export const CONNECT_ACCOUNT = 'CONNECT_ACCOUNT'; //web3 login
export const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT'; //bool switched when valid jwt received
export const DISCONNECT_ACCOUNT = 'DISCONNECT_ACCOUNT';

export const registerAccount = wallet => ({
  type: REGISTER_USER,
  payload: wallet,
});

export const connectAccount = wallet => ({
  type: CONNECT_ACCOUNT,
  payload: wallet,
});

export const loginAccount = () => ({
  type: LOGIN_ACCOUNT,
  payload: true,
});

export const logoutAccount = () => ({
  type: DISCONNECT_ACCOUNT,
  payload: {},
});

export const connectAccountThunk = () => {
  return async (dispatch, getState) => {
    if (typeof window.ethereum !== 'undefined') {
      signInWalletWeb3()
        .then(res => {
          generateNewSignedJwt(res?.account, res?.signer)
            .then(() => dispatch(connectAccount(res)))
            .then(() => dispatch(loginAccount()));
        })
        .catch(error => consola.error('connectAccountThunk: error message:', error));
    }
  };
};

export const loginAccountOnSwitchThunk = (account, balance, signer) => {
  return async (dispatch, getState) => {
    if (typeof window.ethereum !== 'undefined') {
      const res = { account, balance, signer };
      await generateNewSignedJwt(res?.account, res?.signer);
      const isTokenValid = await validateJwtFromDb(res?.account);
      console.log(isTokenValid, 'is token valid??');
      await dispatch(connectAccount(res));
      if (isTokenValid) {
        await dispatch(loginAccount());
      }
      await dispatch(logoutAccount());
    }
  };
};

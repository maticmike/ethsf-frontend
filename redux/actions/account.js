import { signInWalletWeb3 } from '../../web3';
import consola from 'consola';
import { generateNewSignedJwt } from '../../web3/auth';

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
      console.log(res, 'this is the res2');
      await dispatch(connectAccount(res));
      await dispatch(loginAccount());
    }
  };
};

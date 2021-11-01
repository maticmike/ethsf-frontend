import { signInWalletWeb3 } from '../../web3';
import consola from 'consola';
import { getCurrentLoggedInAccountStore } from '../../utils/onboard';
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

export const loginAccount = isLogin => ({
  type: LOGIN_ACCOUNT,
  payload: isLogin,
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
          dispatch(connectAccount(res));
          // generateNewSignedJwt(res?.account, res?.signer);
        })
        .catch(error => consola.error('connectAccountThunk action error message:', error));
    }
  };
};

// export const connectAccountThunk = () => {
//   return async (dispatch, getState) => {
//     if (typeof window.ethereum !== 'undefined') {
//       try {
//         const signInWalletRes = await signInWalletWeb3();
//         dispatch(connectAccount(signInWalletRes));
//         // await generateNewSignedJwt(signInWalletRes?.account, signInWalletRes?.signer);
//       } catch (error) {
//         consola.error('connectAccountThunk error:', error);
//       }
//     }
//   };
// };

export const loginAccountThunk = () => async (dispatch, getState) => await dispatch(loginAccount(true));

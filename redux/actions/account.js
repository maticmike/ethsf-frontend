import { signInWalletWeb3 } from '../../web3';
import consola from 'consola';
import { getCurrentLoggedInAccountStore } from '../../utils/onboard';
/* Action Types */
export const REGISTER_USER = 'REGISTER_USER';
export const CONNECT_WALLET = 'CONNECT_WALLET';
export const DISCONNECT_WALLET = 'DISCONNECT_WALLET';

export const registerAccount = wallet => ({
  type: REGISTER_USER,
  payload: wallet,
});

export const connectAccount = wallet => ({
  type: CONNECT_WALLET,
  payload: wallet,
});

export const connectAccountThunk = () => {
  return async (dispatch, getState) => {
    if (typeof window.ethereum !== 'undefined') {
      signInWalletWeb3()
        .then(res => {
          dispatch(connectAccount(res));
          getCurrentLoggedInAccountStore(res);
        })
        .catch(error => consola.error('connectAccountThunk action error message:', error));
    }
  };
};

export const disconnectWallet = () => ({
  type: DISCONNECT_WALLET,
  payload: {},
});

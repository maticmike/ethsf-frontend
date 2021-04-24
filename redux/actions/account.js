import { getWalletInfo } from '../../web3';
import consola from 'consola';
/* Action Types */
export const CONNECT_WALLET = 'CONNECT_WALLET';

export const connectAccount = wallet => ({
  type: CONNECT_WALLET,
  payload: wallet,
});

export const connectAccountThunk = () => {
  return async (dispatch, getState) => {
    consola.info('here');
    if (typeof window.ethereum !== 'undefined') {
      getWalletInfo()
        .then(res => {
          consola.info(res, 'the res');
          dispatch(connectAccount(res));
        })
        .catch(error => consola.error('connectAccountThunk action', error));
    }
  };
};

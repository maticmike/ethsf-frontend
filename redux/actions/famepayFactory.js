import consola from 'consola';
import { bootstrapFactory } from '../../web3';

/* Action Types */
export const CONNECT_FAMEPAY_FACTORY = 'CONNECT_FAMEPAY_FACTORY';

export const storeFamepayFactory = famepayFactory => ({
  type: CONNECT_FAMEPAY_FACTORY,
  payload: famepayFactory,
});

export const storeFamepayFactoryThunk = () => {
  return async dispatch => {
    console.log('hit em');
    if (window.ethereum) {
      //   window.ethereum.enable();
      bootstrapFactory()
        .then(res => dispatch(storeFamepayFactory(res.famepayFactory)))
        .catch(error => consola.error('error in storeMarketplaceThunk action', error));
    }
  };
};

import consola from 'consola';
import { bootstrapWeb3 } from '../../web3';

/* Action Types */
export const CONNECT_FAMEPAY_FACTORY = 'CONNECT_FAMEPAY_FACTORY';

// export const storeFamepayFactory = famepayFactory => ({
//   type: CONNECT_FAMEPAY_FACTORY,
//   payload: famepayFactory,
// });

export const storeFamepayFactoryThunk = () => {
  return async dispatch => {
    if (window.ethereum) {
      //   window.ethereum.enable();
      bootstrapWeb3()
        .then(res => {
          consola.info(res.famepayFactory, 'sup');
          //   dispatch(storeMarketplace(res));
        })
        .catch(error => consola.error('error in storeMarketplaceThunk action', error));
    }
  };
};

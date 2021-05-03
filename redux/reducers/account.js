import consola from 'consola';
import { CONNECT_WALLET, DISCONNECT_WALLET } from '../actions/account';
import { NATIVE_CURRENCY } from '../../constants/Blockchain';

const initialState = {
  address: null,
  balances: {},
  //   isAdmin: false,
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_WALLET: {
      const { account, balance } = action.payload;
      let balances = state.balances;
      balances[NATIVE_CURRENCY.symbol] = balance;
      consola.info(`Connect wallet reducer ${account} ${balance}`);
      return {
        address: account,
        balances: balance,
      };
    }
    case DISCONNECT_WALLET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
export default account;
